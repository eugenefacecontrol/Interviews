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
      const outreachUrl = c.outreachUrl || extractFirstUrl(c.notes || '');
      const outreachLabel = c.outreach || '';
      const outreachCell = outreachUrl && outreachLabel
        ? `<a href="${escapeAttribute(outreachUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(outreachLabel)}</a>`
        : escapeHtml(outreachLabel);
      const materialsCell = renderMaterialsCell(c, primaryLink, outreachUrl);
      return `<tr>
        <td data-column="company">${escapeHtml(c.name || '')}</td>
        <td data-column="role">${escapeHtml(c.role || '')}</td>
        <td data-column="salary">${escapeHtml(c.salary || '')}</td>
        <td data-column="stack">${escapeHtml(c.stack || '')}</td>
        <td data-column="fit">${escapeHtml(c.fit || '')}</td>
        <td data-column="materials">${materialsCell}</td>
        <td data-column="cv">${escapeHtml(c.recommendedCv || c.cv || '')}</td>
        <td data-column="coverLetter">${escapeHtml(c.coverLetter || '')}</td>
        <td data-column="salaryAsk">${escapeHtml(c.salaryAsk || '')}</td>
        <td data-column="outreach">${outreachCell}</td>
        <td data-column="notes">${escapeHtml(c.notes || '')}</td>
        <td data-column="status">${escapeHtml(c.status || '')}</td>
        <td data-column="stage">${escapeHtml(c.stage || '')}</td>
        <td data-column="link">${applyCell}</td>
        <td data-column="updatedAt">${escapeHtml(c.updatedAt || '')}</td>
      </tr>`;
    }).join('\n')
  : '<tr><td colspan="15">No companies yet.</td></tr>';

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
    .table-wrap { border: 1px solid #ddd; overflow-x: auto; }
    table { border-collapse: collapse; min-width: 100%; width: max-content; table-layout: fixed; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; vertical-align: top; }
    th { background: #f5f5f5; cursor: pointer; position: relative; user-select: none; }
    th[data-sort-dir="asc"]::after { content: " ▲"; }
    th[data-sort-dir="desc"]::after { content: " ▼"; }
    .resize-handle { bottom: 0; cursor: col-resize; position: absolute; right: -4px; top: 0; width: 8px; z-index: 2; }
    .resize-handle::after { background: #c9c9c9; content: ""; display: block; height: 100%; margin-left: 3px; opacity: 0; width: 1px; }
    th:hover .resize-handle::after, body.resizing-column .resize-handle::after { opacity: 1; }
    body.resizing-column { cursor: col-resize; user-select: none; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
    a { color: #0b57d0; }
    .summary { margin: 10px 0 16px; color: #555; font-size: 14px; }
    .materials-compact { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
    .material-chip { display: inline-flex; max-width: 220px; padding: 2px 7px; border: 1px solid #ddd; border-radius: 999px; background: #fafafa; color: #333; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .material-chip[href] { color: #0b57d0; text-decoration: none; }
    details.materials-details summary { color: #0b57d0; cursor: pointer; font-size: 13px; }
    .materials-list { margin: 8px 0 0; padding-left: 18px; font-size: 13px; }
    .materials-list li { margin: 3px 0; overflow-wrap: anywhere; }
    .material-label { color: #555; font-weight: 600; }
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
    <label>Notes
      <select id="notesFilter"><option value="">All</option></select>
    </label>
  </div>
  <div class="summary" id="summary"></div>
  <div class="table-wrap">
    <table id="companiesTable">
      <colgroup>
        <col data-column="company" style="width: 180px">
        <col data-column="role" style="width: 240px">
        <col data-column="salary" style="width: 140px">
        <col data-column="stack" style="width: 300px">
        <col data-column="fit" style="width: 90px">
        <col data-column="materials" style="width: 280px">
        <col data-column="cv" style="width: 280px">
        <col data-column="coverLetter" style="width: 220px">
        <col data-column="salaryAsk" style="width: 130px">
        <col data-column="outreach" style="width: 180px">
        <col data-column="notes" style="width: 360px">
        <col data-column="status" style="width: 120px">
        <col data-column="stage" style="width: 180px">
        <col data-column="link" style="width: 110px">
        <col data-column="updatedAt" style="width: 190px">
      </colgroup>
      <thead>
        <tr>
          <th data-column="company">Company</th>
          <th data-column="role">Role</th>
          <th data-column="salary">Salary</th>
          <th data-column="stack">Stack</th>
          <th data-column="fit">Fit</th>
          <th data-column="materials">Vacancy Materials</th>
          <th data-column="cv">CV</th>
          <th data-column="coverLetter">Cover Letter</th>
          <th data-column="salaryAsk">Salary Ask</th>
          <th data-column="outreach">Outreach</th>
          <th data-column="notes">Notes</th>
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
  </div>
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
    const notesFilter = document.getElementById('notesFilter');
    const summary = document.getElementById('summary');
    const headers = Array.from(table.querySelectorAll('th[data-column]'));
    const columnWidthStorageKey = 'interviewsColumnWidths:v1';
    const defaultColumnWidths = Object.fromEntries(
      Array.from(table.querySelectorAll('col[data-column]')).map(col => [col.dataset.column, parseInt(col.style.width, 10)])
    );

    let sortColumn = 'updatedAt';
    let sortDir = 'desc';

    initSelect(statusFilter, 'status');
    initSelect(stageFilter, 'stage');
    initSelect(outreachFilter, 'outreach');
    initSelect(cvFilter, 'cv');
    initSelect(salaryAskFilter, 'salaryAsk');
    initSelect(notesFilter, 'notes');
    initColumnResizing();
    restoreStateFromUrl();

    searchInput.addEventListener('input', render);
    statusFilter.addEventListener('change', render);
    stageFilter.addEventListener('change', render);
    outreachFilter.addEventListener('change', render);
    cvFilter.addEventListener('change', render);
    salaryAskFilter.addEventListener('change', render);
    notesFilter.addEventListener('change', render);

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
        salaryAsk: salaryAskFilter.value,
        notes: notesFilter.value
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
      const notes = params.get('notes') || '';
      const sort = params.get('sort') || 'updatedAt';
      const dir = params.get('dir') || 'desc';

      searchInput.value = search;
      if ([...statusFilter.options].some(o => o.value === status)) statusFilter.value = status;
      if ([...stageFilter.options].some(o => o.value === stage)) stageFilter.value = stage;
      if ([...outreachFilter.options].some(o => o.value === outreach)) outreachFilter.value = outreach;
      if ([...cvFilter.options].some(o => o.value === cv)) cvFilter.value = cv;
      if ([...salaryAskFilter.options].some(o => o.value === salaryAsk)) salaryAskFilter.value = salaryAsk;
      if ([...notesFilter.options].some(o => o.value === notes)) notesFilter.value = notes;
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
      if (filters.notes) params.set('notes', filters.notes); else params.delete('notes');
      if (sortColumn && sortColumn !== 'updatedAt') params.set('sort', sortColumn); else params.delete('sort');
      if (sortDir && sortDir !== 'desc') params.set('dir', sortDir); else params.delete('dir');
      const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState({}, '', newUrl);
    }

    function initColumnResizing() {
      const savedWidths = loadColumnWidths();
      headers.forEach(header => {
        const column = header.dataset.column;
        if (savedWidths[column]) setColumnWidth(column, savedWidths[column]);

        const handle = document.createElement('span');
        handle.className = 'resize-handle';
        handle.title = 'Drag to resize; double-click to reset';
        handle.addEventListener('click', event => event.stopPropagation());
        handle.addEventListener('dblclick', event => {
          event.preventDefault();
          event.stopPropagation();
          delete savedWidths[column];
          saveColumnWidths(savedWidths);
          resetColumnWidth(column);
        });
        handle.addEventListener('mousedown', event => startColumnResize(event, header, column, savedWidths));
        header.appendChild(handle);
      });
    }

    function startColumnResize(event, header, column, savedWidths) {
      event.preventDefault();
      event.stopPropagation();
      const startX = event.clientX;
      const startWidth = header.getBoundingClientRect().width;
      document.body.classList.add('resizing-column');

      const onMove = moveEvent => {
        const nextWidth = Math.max(70, Math.round(startWidth + moveEvent.clientX - startX));
        setColumnWidth(column, nextWidth);
      };
      const onUp = () => {
        const width = Math.round(header.getBoundingClientRect().width);
        savedWidths[column] = width;
        saveColumnWidths(savedWidths);
        document.body.classList.remove('resizing-column');
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    }

    function setColumnWidth(column, width) {
      const col = table.querySelector('col[data-column="' + column + '"]');
      if (col) col.style.width = width + 'px';
    }

    function resetColumnWidth(column) {
      const col = table.querySelector('col[data-column="' + column + '"]');
      if (col && defaultColumnWidths[column]) col.style.width = defaultColumnWidths[column] + 'px';
    }

    function loadColumnWidths() {
      try {
        return JSON.parse(localStorage.getItem(columnWidthStorageKey) || '{}');
      } catch {
        return {};
      }
    }

    function saveColumnWidths(widths) {
      localStorage.setItem(columnWidthStorageKey, JSON.stringify(widths));
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

function extractFirstUrl(text) {
  const match = String(text || '').match(/https?:\/\/[^\s)]+/);
  return match ? match[0] : '';
}

function renderMaterialsCell(company, primaryLink, outreachUrl) {
  const materials = collectVacancyMaterials(company, primaryLink, outreachUrl);
  if (!materials.length) return '';

  const compact = materials
    .filter(item => item.compact)
    .slice(0, 3)
    .map(item => renderMaterialChip(item))
    .join('');
  const list = materials
    .map(item => `<li><span class="material-label">${escapeHtml(item.label)}:</span> ${renderMaterialValue(item)}</li>`)
    .join('');

  return `${compact ? `<div class="materials-compact">${compact}</div>` : ''}
    <details class="materials-details">
      <summary>Read more</summary>
      <ul class="materials-list">${list}</ul>
    </details>`;
}

function collectVacancyMaterials(company, primaryLink, outreachUrl) {
  const materials = [];
  const seen = new Set();

  addMaterial(materials, seen, 'CV', company.recommendedCv || company.cv || '', true);
  addMaterial(materials, seen, 'Cover letter', company.coverLetter || '', true);
  addMaterial(materials, seen, 'Apply link', primaryLink || '', true);
  addMaterial(materials, seen, 'Outreach URL', outreachUrl || '', false);
  if (company.outreach && !outreachUrl) {
    addMaterial(materials, seen, 'Outreach note', company.outreach, false);
  }

  (Array.isArray(company.links) ? company.links : []).forEach((link, index) => {
    addMaterial(materials, seen, index === 0 ? 'Primary link' : 'Related link', link, false);
  });

  const slug = company.slug || '';
  if (slug) {
    const folder = path.join('companies', slug);
    addMaterial(materials, seen, 'Vacancy folder', folder + '/', false);
    listVacancyFiles(folder).forEach(file => {
      addMaterial(materials, seen, 'Vacancy file', file, false);
    });
  }

  extractLocalPaths([company.process, company.requirements, company.notes].join(' ')).forEach(file => {
    addMaterial(materials, seen, 'Referenced file', file, false);
  });

  return materials;
}

function addMaterial(materials, seen, label, value, compact) {
  const cleanValue = String(value || '').trim();
  if (!cleanValue) return;
  const key = cleanValue;
  if (seen.has(key)) return;
  seen.add(key);
  materials.push({ label, value: cleanValue, compact });
}

function listVacancyFiles(folder) {
  const absoluteFolder = path.join(root, folder);
  if (!fs.existsSync(absoluteFolder)) return [];
  return fs.readdirSync(absoluteFolder, { withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => path.join(folder, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

function extractLocalPaths(text) {
  const matches = String(text || '').match(/(?:\/Users\/[^\s),]+|[A-Za-z0-9_.@()+-]+\.(?:md|pdf|json|html|docx?|txt))/g) || [];
  return [...new Set(matches.map(value => value.replace(/[.,;:]+$/, '')))];
}

function renderMaterialChip(item) {
  const label = escapeHtml(item.label);
  const title = escapeAttribute(item.value);
  const href = materialHref(item.value);
  if (href) {
    return `<a class="material-chip" href="${escapeAttribute(href)}" target="_blank" rel="noopener noreferrer" title="${title}">${label}</a>`;
  }
  return `<span class="material-chip" title="${title}">${label}</span>`;
}

function renderMaterialValue(item) {
  const href = materialHref(item.value);
  if (href) {
    return `<a href="${escapeAttribute(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.value)}</a>`;
  }
  return `<code>${escapeHtml(item.value)}</code>`;
}

function materialHref(value) {
  if (/^https?:\/\//.test(value)) return value;
  return '';
}
