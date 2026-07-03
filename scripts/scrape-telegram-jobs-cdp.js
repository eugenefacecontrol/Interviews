#!/usr/bin/env node
// Scrape recent QA vacancy posts from Telegram Web via Chrome DevTools Protocol.
// Requires a running OpenClaw/Chromium browser with Telegram already logged in.
// Example:
//   node scripts/scrape-telegram-jobs-cdp.js --days 7 --maxScrolls 20
const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const net = require('net');
const path = require('path');

const root = path.resolve(__dirname, '..');
const defaultChannels = [
  'https://web.telegram.org/k/#@qa_vacancy_pl',
  'https://web.telegram.org/k/#@rabota_testirovshchik',
  'https://web.telegram.org/k/#@linked_jobs',
  'https://web.telegram.org/k/#@YotolabQA',
  'https://web.telegram.org/k/#@qa_jobs'
];

function parseArgs(argv) {
  const out = { cdp: 'http://127.0.0.1:18800', days: 7, maxScrolls: 30 };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      console.log([
        'Usage: node scripts/scrape-telegram-jobs-cdp.js [options]',
        '',
        'Options:',
        '  --cdp <url>        Chrome DevTools endpoint (default: http://127.0.0.1:18800)',
        '  --days <number>    Include posts from the last N days (default: 7)',
        '  --maxScrolls <n>   Max scroll/click attempts per channel (default: 30)',
        '  --url <url>        Telegram Web channel URL; repeat to override defaults',
        '  --out <path>       JSON output path; Markdown is written next to it'
      ].join('\n'));
      process.exit(0);
    }
    if (arg === '--url') {
      out.urls = out.urls || [];
      out.urls.push(argv[++i]);
    } else if (arg.startsWith('--')) {
      const key = arg.slice(2);
      out[key] = argv[++i];
    }
  }
  out.days = Number(out.days || 7);
  out.maxScrolls = Number(out.maxScrolls || 30);
  return out;
}

function requestJson(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method }, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(method + ' ' + url + ' failed: ' + res.statusCode + ' ' + body.slice(0, 200)));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(new Error('Invalid JSON from ' + url + ': ' + error.message));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function createTarget(cdpBase, url) {
  const endpoint = cdpBase.replace(/\/$/, '') + '/json/new?' + encodeURIComponent(url);
  try {
    return await requestJson(endpoint, 'PUT');
  } catch (_) {
    return await requestJson(endpoint, 'GET');
  }
}

class CdpSocket {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.buffer = Buffer.alloc(0);
    socket.on('data', data => this.onData(data));
    socket.on('error', error => {
      for (const { reject } of this.pending.values()) reject(error);
      this.pending.clear();
    });
  }

  static connect(wsUrl) {
    return new Promise((resolve, reject) => {
      const parsed = new URL(wsUrl);
      const socket = net.connect(Number(parsed.port || 80), parsed.hostname);
      const key = crypto.randomBytes(16).toString('base64');
      let handshake = Buffer.alloc(0);
      const pathAndQuery = parsed.pathname + parsed.search;

      socket.once('connect', () => {
        socket.write([
          'GET ' + pathAndQuery + ' HTTP/1.1',
          'Host: ' + parsed.host,
          'Upgrade: websocket',
          'Connection: Upgrade',
          'Sec-WebSocket-Key: ' + key,
          'Sec-WebSocket-Version: 13',
          '',
          ''
        ].join('\r\n'));
      });

      const onHandshake = data => {
        handshake = Buffer.concat([handshake, data]);
        const marker = handshake.indexOf('\r\n\r\n');
        if (marker === -1) return;
        const head = handshake.slice(0, marker).toString('utf8');
        if (!head.includes('101')) {
          reject(new Error('WebSocket handshake failed: ' + head));
          socket.destroy();
          return;
        }
        socket.off('data', onHandshake);
        const client = new CdpSocket(socket);
        const rest = handshake.slice(marker + 4);
        if (rest.length) client.onData(rest);
        resolve(client);
      };

      socket.on('data', onHandshake);
      socket.once('error', reject);
    });
  }

  call(method, params = {}) {
    const id = this.nextId++;
    this.socket.write(encodeFrame(JSON.stringify({ id, method, params })));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error('CDP call timed out: ' + method));
        }
      }, 30000);
    });
  }

  close() {
    this.socket.end();
    this.socket.destroy();
  }

  onData(data) {
    this.buffer = Buffer.concat([this.buffer, data]);
    while (true) {
      const frame = decodeFrame(this.buffer);
      if (!frame) return;
      this.buffer = this.buffer.slice(frame.bytes);
      if (frame.opcode === 8) return;
      if (frame.opcode !== 1) continue;
      const message = JSON.parse(frame.payload.toString('utf8'));
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(JSON.stringify(message.error)));
        else resolve(message.result);
      }
    }
  }
}

function encodeFrame(text) {
  const payload = Buffer.from(text);
  const mask = crypto.randomBytes(4);
  let header;
  if (payload.length < 126) {
    header = Buffer.from([0x81, 0x80 | payload.length]);
  } else if (payload.length < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 0x80 | 126;
    header.writeUInt16BE(payload.length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 0x80 | 127;
    header.writeBigUInt64BE(BigInt(payload.length), 2);
  }
  const masked = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i++) masked[i] = payload[i] ^ mask[i % 4];
  return Buffer.concat([header, mask, masked]);
}

function decodeFrame(buffer) {
  if (buffer.length < 2) return null;
  const first = buffer[0];
  const second = buffer[1];
  const opcode = first & 0x0f;
  const masked = Boolean(second & 0x80);
  let length = second & 0x7f;
  let offset = 2;
  if (length === 126) {
    if (buffer.length < offset + 2) return null;
    length = buffer.readUInt16BE(offset);
    offset += 2;
  } else if (length === 127) {
    if (buffer.length < offset + 8) return null;
    length = Number(buffer.readBigUInt64BE(offset));
    offset += 8;
  }
  let mask;
  if (masked) {
    if (buffer.length < offset + 4) return null;
    mask = buffer.slice(offset, offset + 4);
    offset += 4;
  }
  if (buffer.length < offset + length) return null;
  let payload = buffer.slice(offset, offset + length);
  if (masked) {
    const unmasked = Buffer.alloc(payload.length);
    for (let i = 0; i < payload.length; i++) unmasked[i] = payload[i] ^ mask[i % 4];
    payload = unmasked;
  }
  return { opcode, payload, bytes: offset + length };
}

function pageExtractor(days, maxScrolls) {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  function visible(el) {
    if (!el) return false;
    const style = getComputedStyle(el);
    const box = el.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && box.width > 0 && box.height > 0;
  }
  function parseTelegramDate(value) {
    if (!value) return null;
    const clean = value.split('\n')[0].replace(/^Original:\s*/, '').trim();
    const parsed = Date.parse(clean);
    return Number.isNaN(parsed) ? null : new Date(parsed).toISOString();
  }
  function isVacancyText(text) {
    return /вакан|vacanc|sdet|aqa|qa |qa$|automation|автотест|тестиров|playwright|selenium|cypress|pytest|test engineer|quality/i.test(text);
  }
  return (async () => {
    const scrollable = document.querySelector('.bubbles-scrollable');
    const states = [];
    for (let i = 0; i < maxScrolls; i++) {
      const goDown = Array.from(document.querySelectorAll('.bubbles-go-down, [class*="go-down"]')).find(visible);
      if (goDown) {
        goDown.click();
      } else if (scrollable) {
        scrollable.scrollTop = scrollable.scrollHeight;
        scrollable.dispatchEvent(new Event('scroll', { bubbles: true }));
      }
      await sleep(700);
      const nearBottom = scrollable ? scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 8 : true;
      const stillHasGoDown = Array.from(document.querySelectorAll('.bubbles-go-down, [class*="go-down"]')).some(visible);
      states.push({ i, nearBottom, stillHasGoDown, scrollTop: scrollable && scrollable.scrollTop, scrollHeight: scrollable && scrollable.scrollHeight });
      if (nearBottom && !stillHasGoDown && i > 2) break;
    }
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const title = document.querySelector('.chat-info')?.innerText || document.title;
    const bubbles = Array.from(document.querySelectorAll('.bubble.is-in, .bubble.is-out'));
    const messages = bubbles.map((bubble, index) => {
      const time = bubble.querySelector('.time-inner');
      const titleValue = time && time.getAttribute('title');
      const iso = parseTelegramDate(titleValue);
      return { index, timeTitle: titleValue || '', iso, text: (bubble.innerText || '').replace(/\n{3,}/g, '\n\n').trim() };
    }).filter(item => {
      if (!item.text || item.text.length < 20) return false;
      if (!isVacancyText(item.text)) return false;
      if (!item.iso) return true;
      return new Date(item.iso).getTime() >= cutoff;
    });
    return { url: location.href, title, states, messageCount: messages.length, messages, bodyTail: document.body.innerText.slice(-3000) };
  })();
}

function slugWords(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9а-яё]+/gi, ' ').split(/\s+/).filter(w => w.length >= 4);
}

function findRegistryMatches(text, registry) {
  const lower = text.toLowerCase();
  const matches = [];
  for (const company of registry.companies || []) {
    const terms = [company.name, company.slug].flatMap(slugWords);
    if (!terms.length) continue;
    const hitCount = terms.filter(term => lower.includes(term)).length;
    if (hitCount >= Math.min(2, terms.length)) {
      matches.push({ name: company.name, slug: company.slug, status: company.status, stage: company.stage });
    }
  }
  return matches.slice(0, 5);
}

function renderMarkdown(report) {
  const lines = ['# Telegram Jobs CDP Report', '', '- Generated: ' + report.generatedAt, '- Days: ' + report.days, ''];
  for (const channel of report.channels) {
    lines.push('## ' + channel.title.replace(/\n/g, ' - '));
    lines.push('');
    lines.push('URL: ' + channel.url);
    lines.push('');
    if (channel.error) {
      lines.push('Error: ' + channel.error);
      lines.push('');
      continue;
    }
    if (!channel.messages.length) {
      lines.push('No matching visible vacancy messages found.');
      lines.push('');
      continue;
    }
    for (const message of channel.messages) {
      const firstLine = message.text.split('\n').find(Boolean) || '(no title)';
      lines.push('### ' + firstLine.slice(0, 120));
      lines.push('');
      lines.push('- Time: ' + (message.timeTitle || 'unknown'));
      lines.push('- Registry matches: ' + (message.registryMatches.length ? message.registryMatches.map(m => m.name + ' (' + m.status + '/' + m.stage + ')').join('; ') : 'none'));
      lines.push('');
      lines.push('~~~text');
      lines.push(message.text.slice(0, 1800));
      lines.push('~~~');
      lines.push('');
    }
  }
  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv);
  const urls = args.urls && args.urls.length ? args.urls : defaultChannels;
  const registry = JSON.parse(fs.readFileSync(path.join(root, 'companies.json'), 'utf8'));
  const report = { generatedAt: new Date().toISOString(), days: args.days, cdp: args.cdp, channels: [] };
  for (const url of urls) {
    process.stderr.write('Scraping ' + url + '\n');
    let client;
    try {
      const target = await createTarget(args.cdp, url);
      client = await CdpSocket.connect(target.webSocketDebuggerUrl);
      await client.call('Runtime.enable');
      await client.call('Page.enable');
      await client.call('Page.navigate', { url });
      await new Promise(resolve => setTimeout(resolve, 3500));
      const expression = '(' + pageExtractor.toString() + ')(' + JSON.stringify(args.days) + ', ' + JSON.stringify(args.maxScrolls) + ')';
      const result = await client.call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      const value = result.result && result.result.value;
      const messages = (value.messages || []).map(message => ({ ...message, registryMatches: findRegistryMatches(message.text, registry) }));
      report.channels.push({ ...value, messages });
    } catch (error) {
      report.channels.push({ url, title: url, error: error.message, messages: [] });
    } finally {
      if (client) client.close();
    }
  }
  const outDir = path.join(root, 'reports');
  fs.mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const jsonPath = args.out || path.join(outDir, 'telegram-jobs-' + stamp + '.json');
  const mdPath = jsonPath.replace(/\.json$/, '.md');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2) + '\n');
  fs.writeFileSync(mdPath, renderMarkdown(report) + '\n');
  console.log(jsonPath);
  console.log(mdPath);
  process.exit(0);
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exit(1);
});
