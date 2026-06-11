#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const registry = JSON.parse(fs.readFileSync(path.join(root, 'companies.json'), 'utf8'));

const updates = [
  {
    slug: 'kbc-technologies-sdet-automation-test-engineer',
    status: 'applied',
    stage: 'application_sent_2026-06-11',
    processAdd: 'Gmail confirmation from LinkedIn on 2026-06-11: application was sent to KBC Technologies Group for SDET (Automation Test Engineer), Cracow hybrid.',
    notesAdd: 'Application confirmed by LinkedIn email.'
  },
  {
    slug: 'toro-performance-senior-qa-automation',
    status: 'applied',
    stage: 'application_sent_2026-06-11',
    processAdd: 'Gmail confirmation from JustJoinIt on 2026-06-11: application sent for Senior QA Automation Engineer Poland (Remote) at Toro Performance Sp. z o.o.',
    notesAdd: 'Application confirmed by JustJoinIt email.'
  },
  {
    slug: 'td-synnex-poland-dotnet',
    status: 'interviewing',
    stage: 'hiring_manager_interview_scheduled_2026-06-15_1400',
    processAdd: 'Gmail invitation from TD SYNNEX confirmed hiring-manager interview: Jun 15, 2026, 14:00-14:45 Europe/Madrid/Warsaw, Microsoft Teams, interviewer Tugay Taskin.',
    notesAdd: 'Next step scheduled with Tugay Taskin; prepare for 45-minute .NET-focused technical/hiring-manager conversation.'
  },
  {
    slug: 'kraken-qa-automation-pro',
    status: 'rejected',
    stage: 'rejected_after_application_review',
    processAdd: 'Gmail rejection from Kraken Hiring Team on 2026-06-11 for QA Automation Engineer - Pro.',
    notesAdd: 'Application was not selected for further consideration.'
  },
  {
    slug: 'people-more',
    status: 'applied',
    stage: 'application_sent_tracker_received',
    processAdd: 'Gmail Smart Tracker email on 2026-06-10 confirms application to Mobile QA Engineer — Manual + AI-augmented at People More PSA.',
    notesAdd: 'Application tracker received; status moved from target to applied.'
  },
  {
    slug: 'aristek-systems',
    status: 'interviewing',
    stage: 'sdet_interview_scheduled_2026-06-12_1130',
    processAdd: 'Gmail calendar invitation from Kseniya Vishnevskaya on 2026-06-10: SDET Interview with Yauheni Sheima | Aristek Systems, Fri Jun 12, 2026 11:30-13:00 GMT+2.',
    notesAdd: 'Next Aristek step scheduled as SDET interview with Google Meet.'
  },
  {
    slug: 'alior-bank',
    status: 'applied',
    stage: 'application_sent_confirmation_received',
    processAdd: 'Gmail/eRecruiter confirmation on 2026-06-10: application for Senior Test Automation Engineer (K/M) at Alior Bank linked to candidate account.',
    notesAdd: 'Application confirmation received via eRecruiter.'
  },
  {
    slug: 'venchr-senior-qa-playwright-uk',
    status: 'applied',
    stage: 'application_sent_confirmation_received',
    processAdd: 'Gmail confirmation from LinkedIn on 2026-06-10: application sent to Senior QA Engineer (Playwright Specialist) — Remote (UK) at Venchr.',
    notesAdd: 'Application confirmation received via LinkedIn email.'
  },
  {
    slug: 'zabka-qa-automation-engineer',
    name: 'Żabka',
    role: 'QA Automation Engineer',
    stack: 'QA Automation, exact stack not captured from email confirmation',
    status: 'applied',
    stage: 'application_sent_confirmation_received',
    process: 'Gmail confirmations on 2026-06-10/2026-06-11 via eRecruiter/TRAFFIT: application for QA Automation Engineer at Żabka was received; employer will contact selected candidates only.',
    requirements: 'Unknown from email confirmation; full vacancy context still needs to be captured if this process continues.',
    notes: 'Added from Gmail confirmation. Need original job link/JD if available.',
    links: [],
    fit: '',
    recommendedCv: '',
    coverLetter: '',
    salaryAsk: '',
    outreach: '',
    outreachUrl: ''
  }
];

function appendField(original, addition) {
  if (!addition) return original || '';
  if (!original) return addition;
  if (original.includes(addition)) return original;
  return original + '\n' + addition;
}

function find(slug) {
  return registry.companies.find(company => company.slug === slug);
}

function cleanOptional(value) {
  if (value === true || value === 'true') return '';
  if (value == null) return '';
  return String(value);
}

function pushOptional(args, flag, value) {
  const cleaned = cleanOptional(value);
  if (cleaned.trim()) args.push(flag, cleaned);
}

function runAdd(entry) {
  const args = [
    path.join(root, 'scripts', 'add-company.js'),
    '--name', entry.name,
    '--slug', entry.slug,
    '--role', entry.role || '',
    '--stack', entry.stack || '',
    '--status', entry.status || '',
    '--stage', entry.stage || '',
    '--process', entry.process || '',
    '--requirements', entry.requirements || '',
    '--notes', entry.notes || '',
    '--links', Array.isArray(entry.links) ? entry.links.join(',') : (entry.links || '')
  ];
  pushOptional(args, '--fit', entry.fit);
  pushOptional(args, '--recommended-cv', entry.recommendedCv);
  pushOptional(args, '--cover-letter', entry.coverLetter);
  pushOptional(args, '--salary-ask', entry.salaryAsk);
  pushOptional(args, '--outreach', entry.outreach);
  pushOptional(args, '--outreach-url', entry.outreachUrl);
  args.push('--no-git');

  const result = spawnSync('node', args, { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) {
    process.stdout.write(result.stdout || '');
    process.stderr.write(result.stderr || '');
    process.exit(result.status || 1);
  }
  process.stdout.write(result.stdout || '');
}

function syncCompanyJson(slugs) {
  const latest = JSON.parse(fs.readFileSync(path.join(root, 'companies.json'), 'utf8'));
  for (const slug of slugs) {
    const entry = latest.companies.find(company => company.slug === slug);
    if (!entry) continue;
    for (const key of ['fit', 'recommendedCv', 'coverLetter', 'salaryAsk', 'outreach', 'outreachUrl']) {
      if (entry[key] === true || entry[key] === 'true') entry[key] = '';
    }
    const companyPath = path.join(root, 'companies', slug, 'company.json');
    fs.writeFileSync(companyPath, JSON.stringify(entry, null, 2) + '\n');
  }
  fs.writeFileSync(path.join(root, 'companies.json'), JSON.stringify(latest, null, 2) + '\n');
}

for (const update of updates) {
  const existing = find(update.slug);
  const merged = existing ? {
    ...existing,
    status: update.status || existing.status,
    stage: update.stage || existing.stage,
    process: appendField(existing.process, update.processAdd),
    notes: appendField(existing.notes, update.notesAdd)
  } : update;

  if (!existing && !merged.name) throw new Error('Missing existing company and name for ' + update.slug);
  runAdd(merged);
}

syncCompanyJson(updates.map(update => update.slug));
