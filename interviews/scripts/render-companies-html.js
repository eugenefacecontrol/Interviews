#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const registryPath = path.join(root, 'companies.json');
const cvPath = path.join(root, 'cv.json');
const outputPath = path.join(root, 'site', 'index.html');

const data = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const cvData = fs.existsSync(cvPath) ? JSON.parse(fs.readFileSync(cvPath, 'utf8')) : { cv: [] };
const rows = data.companies.length
  ? data.companies.map(c => {
      const primaryLink = Array.isArray(c.links) && c.links.length ? c.links[0] : '';
      const companyCell = primaryLink
        ? `<a href="${escapeAttribute(primaryLink)}" target="_blank" rel="noopener noreferrer">${escapeHtml(c.name)}</a>`
        : escapeHtml(c.name);
      const rejectionReason = extractRejectionReason(c);
      const fit = c.fit ? escapeHtml(c.fit) : '—';
      const recommendedCv = c.recommendedCv ? escapeHtml(c.recommendedCv) : '—';
      return `<tr><td>${companyCell}</td><td>${escapeHtml(c.status || '')}</td><td>${escapeHtml(c.stage || '')}</td><td>${escapeHtml(c.updatedAt || '')}</td><td>${escapeHtml(rejectionReason)}</td><td>${fit}</td><td>${recommendedCv}</td></tr>`;
    }).join('\n')
  : '<tr><td colspan="7">No companies yet.</td></tr>';

const cvList = Array.isArray(cvData.cv) && cvData.cv.length
  ? `<ul>${cvData.cv.map(item => `<li><a href="${escapeAttribute(item.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.name)}</a>${item.notes ? ` — ${escapeHtml(item.notes)}` : ''}</li>`).join('')}</ul>`
  : '<p>No CVs configured yet.</p>';

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Interview Companies</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1100px; margin: 40px auto; padding: 0 16px; line-height: 1.5; }
    h1 { margin-bottom: 8px; }
    .muted { color: #666; margin-bottom: 24px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; vertical-align: top; }
    th { background: #f5f5f5; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Interview Companies</h1>
  <p class="muted">Generated from <code>interviews/companies.json</code>${data.generatedAt ? ' at ' + escapeHtml(data.generatedAt) : ''}.</p>
  <h2>Available CVs</h2>
  ${cvList}
  <table>
    <thead>
      <tr>
        <th>Company</th>
        <th>Status</th>
        <th>Stage</th>
        <th>Last update</th>
        <th>Rejection reason</th>
        <th>Fit</th>
        <th>Recommended CV</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</body>
</html>`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html + '\n');
console.log(`Rendered ${outputPath}`);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function extractRejectionReason(company) {
  if (!company) return '';
  if (company.rejectionReason) return company.rejectionReason;
  if (typeof company.notes !== 'string') return '';
  const text = company.notes.trim();
  const prefixes = ['Отказ:', 'Rejection noted', 'Rejected:'];
  for (const prefix of prefixes) {
    if (text.startsWith(prefix)) return text;
  }
  return text;
}
