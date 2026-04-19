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
      return `<tr>
        <td data-column="company">${escapeHtml(c.name || '')}</td>
        <td data-column="role">${escapeHtml(c.role || '')}</td>
        <td data-column="salary">${escapeHtml(c.salary || '')}</td>
        <td data-column="stack">${escapeHtml(c.stack || '')}</td>
        <td data-column="fit">${escapeHtml(c.fit || '')}</td>
        <td data-column="cv">${escapeHtml(c.recommendedCv || c.cv || '')}</td>
        <td data-column="salaryAsk">${escapeHtml(c.salaryAsk || '')}</td>
        <td data-column="outreach">${escapeHtml(c.outreach || '')}</td>
        <td data-column="status">${escapeHtml(c.status || '')}</td>
        <td data-column="stage">${escapeHtml(c.stage || '')}</td>
        <td data-column="link">${applyCell}</td>
        <td data-column="updatedAt">${escapeHtml(c.updatedAt || '')}</td>
      </tr>`;
    }).join('\n')
  : '<tr><td colspan="12">No companies yet.</td></tr>';

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
    .controls { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin: 0 0 20px; }
    .controls label { display: flex; flex-direction: column; gap: 6px; font-size: 14px; color: #444; }
    .controls input, .controls select { padding: 8px 10px; border: 1px solid #ccc; border-radius: 8px; font: inherit; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; vertical-align: top; }
    th { background: #f5f5f5; cursor: pointer; user-select: none; }
    th[data-sort-dir="asc"]::after { content: " ▲"; }
    th[data-sort-dir="desc"]::after { content: " ▼"; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
    a { color: #0b57d0; }
    .summary { margin: 10px 0 16px; color: #555; font-size: 14px; }
  </style>
</head>
<body>
  <h1>Interview Companies</h1>
  <p class="muted">Generated from <code>companies.json</code>${data.generatedAt ? ' at ' + escapeHtml(data.generatedAt) : ''}.</p>
  <div class="controls">
    <label>Search
      <input id="searchInput" type="search" placeholder="Search any column">
    </label>
    <label>Status
      <select id="statusFilter"><option value="">All</option></select>
    </label>
    <label>Stage
      <select id="stageFilter"><option value="">All</option></select>
    </label>
    <label>Outreach
      <select id="outreachFilter"><option value="">All</option></select>
    </label>
    <label>CV
      <select id="cvFilter"><option value="">All</option></select>
    </label>
    <label>Salary Ask
      <select id="salaryAskFilter"><option value="">All</option></select>
    </label>
  </div>
  <div class="summary" id="summary"></div>
  <table id="companiesTable">
    <thead>
      <tr>
        <th data-column="company">Company</th>
        <th data-column="role">Role</th>
        <th data-column="salary">Salary</th>
        <th data-column="stack">Stack</th>
        <th data-column="fit">Fit</th>
        <th data-column="cv">CV</th>
        <th data-column="salaryAsk">Salary Ask</th>
        <th data-column="outreach">Outreach</th>
        <th data-column="status">Status</th>
        <th data-column="stage">Stage</th>
        <th data-column="link">Apply Link</th>
        <th data-column="updatedAt">Last update</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <script>
    const table = document.getElementById('companiesTable');
    const tbody = table.querySelector('tbody');
    const allRows = Array.from(tbody.querySelectorAll('tr'));
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const stageFilter = document.getElementById('stageFilter');
    const outreachFilter = document.getElementById('outreachFilter');
    const cvFilter = document.getElementById('cvFilter');
    const salaryAskFilter = document.getElementById('salaryAskFilter');
    const summary = document.getElementById('summary');
    const headers = Array.from(table.querySelectorAll('th[data-column]'));

    let sortColumn = 'updatedAt';
    let sortDir = 'desc';

    initSelect(statusFilter, 'status');
    initSelect(stageFilter, 'stage');
    initSelect(outreachFilter, 'outreach');
    initSelect(cvFilter, 'cv');
    initSelect(salaryAskFilter, 'salaryAsk');
    restoreStateFromUrl();

    searchInput.addEventListener('input', render);
    statusFilter.addEventListener('change', render);
    stageFilter.addEventListener('change', render);
    outreachFilter.addEventListener('change', render);
    cvFilter.addEventListener('change', render);
    salaryAskFilter.addEventListener('change', render);

    headers.forEach(header => {
      header.addEventListener('click', () => {
        const column = header.dataset.column;
        if (sortColumn === column) {
          sortDir = sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          sortColumn = column;
          sortDir = 'asc';
        }
        render();
      });
    });

    render();

    function initSelect(select, column) {
      const values = [...new Set(allRows.map(row => getCellText(row, column)).filter(Boolean))].sort((a, b) => a.localeCompare(b));
      values.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      });
    }

    function getCellText(row, column) {
      return (row.querySelector('[data-column="' + column + '"]')?.textContent || '').trim();
    }

    function render() {
      const query = searchInput.value.trim().toLowerCase();
      const filters = {
        status: statusFilter.value,
        stage: stageFilter.value,
        outreach: outreachFilter.value,
        cv: cvFilter.value,
        salaryAsk: salaryAskFilter.value
      };

      updateUrlState(query, filters);

      const filtered = allRows.filter(row => {
        const rowText = row.textContent.toLowerCase();
        if (query && !rowText.includes(query)) return false;
        for (const [column, value] of Object.entries(filters)) {
          if (value && getCellText(row, column) !== value) return false;
        }
        return true;
      });

      filtered.sort((a, b) => compareRows(a, b, sortColumn, sortDir));
      tbody.replaceChildren(...filtered);
      headers.forEach(header => {
        header.dataset.sortDir = header.dataset.column === sortColumn ? sortDir : '';
      });
      summary.textContent = 'Showing ' + filtered.length + ' of ' + allRows.length + ' companies';
    }

    function compareRows(a, b, column, dir) {
      const av = getCellText(a, column);
      const bv = getCellText(b, column);
      const result = av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' });
      return dir === 'asc' ? result : -result;
    }

    function restoreStateFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const search = params.get('q') || '';
      const status = params.get('status') || '';
      const stage = params.get('stage') || '';
      const outreach = params.get('outreach') || '';
      const cv = params.get('cv') || '';
      const salaryAsk = params.get('salaryAsk') || '';
      const sort = params.get('sort') || 'updatedAt';
      const dir = params.get('dir') || 'desc';

      searchInput.value = search;
      if ([...statusFilter.options].some(o => o.value === status)) statusFilter.value = status;
      if ([...stageFilter.options].some(o => o.value === stage)) stageFilter.value = stage;
      if ([...outreachFilter.options].some(o => o.value === outreach)) outreachFilter.value = outreach;
      if ([...cvFilter.options].some(o => o.value === cv)) cvFilter.value = cv;
      if ([...salaryAskFilter.options].some(o => o.value === salaryAsk)) salaryAskFilter.value = salaryAsk;
      if (headers.some(h => h.dataset.column === sort)) sortColumn = sort;
      if (dir === 'asc' || dir === 'desc') sortDir = dir;
    }

    function updateUrlState(query, filters) {
      const params = new URLSearchParams(window.location.search);
      if (query) params.set('q', query); else params.delete('q');
      if (filters.status) params.set('status', filters.status); else params.delete('status');
      if (filters.stage) params.set('stage', filters.stage); else params.delete('stage');
      if (filters.outreach) params.set('outreach', filters.outreach); else params.delete('outreach');
      if (filters.cv) params.set('cv', filters.cv); else params.delete('cv');
      if (filters.salaryAsk) params.set('salaryAsk', filters.salaryAsk); else params.delete('salaryAsk');
      if (sortColumn && sortColumn !== 'updatedAt') params.set('sort', sortColumn); else params.delete('sort');
      if (sortDir && sortDir !== 'desc') params.set('dir', sortDir); else params.delete('dir');
      const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState({}, '', newUrl);
    }
  </script>
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
