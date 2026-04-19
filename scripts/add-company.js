#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(root, '..');
const registryPath = path.join(root, 'companies.json');
const markdownPath = path.join(root, 'companies.md');
const companiesDir = path.join(root, 'companies');
const renderScriptPath = path.join(root, 'scripts', 'render-companies-html.js');
const sshKeyPath = path.join(workspaceRoot, 'keys', 'github_ed25519');

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'company';
}

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const item = argv[i];
    if (!item.startsWith('--')) continue;
    const key = item.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      out[key] = true;
    } else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function loadRegistry() {
  return JSON.parse(fs.readFileSync(registryPath, 'utf8'));
}

function saveRegistry(data) {
  data.generatedAt = new Date().toISOString();
  fs.writeFileSync(registryPath, JSON.stringify(data, null, 2) + '\n');
}

function saveMarkdown(data) {
  const lines = [
    '# Companies',
    '',
    'This is the canonical human-readable list of interview companies.',
    '',
    '| Company | Status | Stage | Fit | Recommended CV | Salary Ask | Outreach | Last update |',
    '|---|---|---|---|---|---|---|---|'
  ];
  for (const c of data.companies) {
    lines.push(`| ${c.name} | ${c.status || ''} | ${c.stage || ''} | ${c.fit || ''} | ${c.recommendedCv || ''} | ${c.salaryAsk || ''} | ${c.outreach || ''} | ${c.updatedAt || ''} |`);
  }
  fs.writeFileSync(markdownPath, lines.join('\n') + '\n');
}

function main() {
  const args = parseArgs(process.argv);
  if (!args.name) {
    console.error('Usage: interviews-add --name "Company" [--status ...] [--stage ...] [--process ...] [--requirements ...] [--notes ...] [--links ...] [--fit ...] [--recommended-cv ...] [--salary-ask ...] [--outreach ...]');
    process.exit(1);
  }

  ensureDir(companiesDir);
  const slug = args.slug || slugify(args.name);
  const companyDir = path.join(companiesDir, slug);
  ensureDir(companyDir);

  const registry = loadRegistry();
  const now = new Date().toISOString();
  const entry = {
    slug,
    name: args.name,
    status: args.status || 'new',
    stage: args.stage || '',
    process: args.process || '',
    requirements: args.requirements || '',
    notes: args.notes || '',
    links: typeof args.links === 'string' ? args.links.split(',').map(s => s.trim()).filter(Boolean) : [],
    fit: args.fit || '',
    recommendedCv: args['recommended-cv'] || '',
    salaryAsk: args['salary-ask'] || '',
    outreach: args.outreach || '',
    updatedAt: now
  };

  const idx = registry.companies.findIndex(c => c.slug === slug || c.name === args.name);
  if (idx >= 0) registry.companies[idx] = { ...registry.companies[idx], ...entry };
  else registry.companies.push(entry);

  registry.companies.sort((a, b) => a.name.localeCompare(b.name));
  saveRegistry(registry);
  saveMarkdown(registry);

  const companyInfoPath = path.join(companyDir, 'company.json');
  fs.writeFileSync(companyInfoPath, JSON.stringify(entry, null, 2) + '\n');

  const readmePath = path.join(companyDir, 'README.md');
  const readme = [
    `# ${entry.name}`,
    '',
    `- Status: ${entry.status}`,
    `- Stage: ${entry.stage}`,
    `- Fit: ${entry.fit || '—'}`,
    `- Recommended CV: ${entry.recommendedCv || '—'}`,
    `- Salary Ask: ${entry.salaryAsk || '—'}`,
    `- Outreach: ${entry.outreach || '—'}`,
    '',
    '## Process',
    entry.process || '',
    '',
    '## Requirements',
    entry.requirements || '',
    '',
    '## Notes',
    entry.notes || '',
    '',
    '## Links',
    ...(entry.links.length ? entry.links.map(link => `- ${link}`) : [''])
  ].join('\n');
  fs.writeFileSync(readmePath, readme + '\n');

  console.log(`Updated ${entry.name} (${slug})`);

  const shouldGit = !args['no-git'];
  const shouldPush = !args['no-push'];

  if (shouldGit) {
    execSync(`node ${JSON.stringify(renderScriptPath)}`, { stdio: 'inherit', cwd: root });
    execSync('git add .', { stdio: 'inherit', cwd: root });
    execSync(`git commit -m ${JSON.stringify(`Add or update ${entry.name} interview record`)}`, { stdio: 'inherit', cwd: root });

    if (shouldPush) {
      const sshCmd = `ssh -i ${JSON.stringify(sshKeyPath)} -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new`;
      execSync('git push', {
        stdio: 'inherit',
        cwd: root,
        env: { ...process.env, GIT_SSH_COMMAND: sshCmd }
      });
    }
  }
}

main();
