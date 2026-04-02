#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const registryPath = path.join(root, 'companies.json');
const outputPath = path.join(root, 'site', 'index.html');

const data = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const rows = data.companies.length
  ? data.companies.map(c => {
      const primaryLink = Array.isArray(c.links) && c.links.length ? c.links[0] : '';
      const applyCell = primaryLink
        ? `<a href="${escapeAttribute(primaryLink)}" target="_blank" rel="noopener noreferrer">Apply</a>`
        : '';
      return `<tr><td>${escapeHtml(c.name || '')}</td><td>${escapeHtml(c.role || '')}</td><td>${escapeHtml(c.salary || '')}</td><td>${escapeHtml(c.stack || '')}</td><td>${escapeHtml(c.fit || '')}</td><td>${escapeHtml(c.status || '')}</td><td>${escapeHtml(c.stage || '')}</td><td>${applyCell}</td><td>${escapeHtml(c.updatedAt || '')}</td></tr>`;
    }).join('\n')
  : '<tr><td colspan="9">No companies yet.</td></tr>';

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Interview Companies</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1400px; margin: 40px auto; padding: 0 16px; line-height: 1.5; }
    h1 { margin-bottom: 8px; }
    .muted { color: #666; margin-bottom: 24px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; vertical-align: top; }
    th { background: #f5f5f5; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
    a { color: #0b57d0; }
  </style>
</head>
<body>
  <h1>Interview Companies</h1>
  <p class="muted">Generated from <code>interviews/companies.json</code>${data.generatedAt ? ' at ' + escapeHtml(data.generatedAt) : ''}.</p>
  <table>
    <thead>
      <tr>
        <th>Company</th>
        <th>Role</th>
        <th>Salary</th>
        <th>Stack</th>
        <th>Fit</th>
        <th>Status</th>
        <th>Stage</th>
        <th>Apply Link</th>
        <th>Last update</th>
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
