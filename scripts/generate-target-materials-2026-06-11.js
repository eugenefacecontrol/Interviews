#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const interviews = path.resolve(__dirname, '..');
const cvRoot = '/Users/yauhenisheima/.openclaw/workspace/cv-master-profile';
const tailoredDir = path.join(cvRoot, 'tailored-cv');
const registryPath = path.join(interviews, 'companies.json');

const targets = [
  {
    slug: 'a-players-fullstack-qa-engineer',
    stage: 'cv_ready_cover_letter_ready_outreach_to_send',
    focus: 'TypeScript/Playwright automation across frontend, API and integration testing, QA automation ownership, test strategy, and AI-powered B2C products.',
    why: 'This role matches my current Playwright/TypeScript direction, UI/API automation background, interest in AI-assisted QA, and preference for code-based automation ownership.'
  },
  {
    slug: 'binance-senior-automation-qa-sdet-python',
    stage: 'cv_ready_cover_letter_ready_python_positioning_needed',
    focus: 'Senior SDET/Python automation, test strategy, CI/CD integration, API/backend quality, and complex platform testing.',
    why: 'The SDET scope is a strong match through automation design, API validation, CI/CD feedback and diagnostics. I would position Python honestly as practical automation/scripting and a ramp-up area rather than my deepest long-term language.'
  },
  {
    slug: 'braver-it-senior-automation-qa-dotnet',
    stage: 'cv_ready_cover_letter_ready',
    focus: 'C#/.NET automation, Playwright UI testing, API validation, Azure DevOps pipelines, SQL, and maintainable senior QA automation.',
    why: 'This is one of the strongest fits because it connects my C# automation foundation, current Playwright direction, API testing, Azure DevOps context, SQL and framework improvement experience.'
  },
  {
    slug: 'co-brick-playwright-typescript-qa',
    stage: 'cv_ready_cover_letter_ready_to_verify',
    focus: 'Playwright and TypeScript automation, UI/API coverage, CI/CD feedback, maintainable web-product testing and senior QA ownership.',
    why: 'The role fits my current Playwright/TypeScript direction and broader SDET profile. I would verify the full JD before applying, but the visible stack is directly relevant.'
  },
  {
    slug: 'fireblocks-senior-qa-automation',
    stage: 'cv_ready_cover_letter_ready',
    focus: 'Senior QA automation for fintech/security products, API and frontend automation, CI/CD feedback, logs/observability, and quality ownership.',
    why: 'This role is relevant through API/frontend automation, senior ownership, diagnostic depth and product-quality focus. The fintech/security domain also fits my strength in careful evidence and risk-based testing.'
  },
  {
    slug: 'infakt-playwright-qa-engineer',
    stage: 'cv_ready_cover_letter_ready',
    focus: 'Playwright automation, TypeScript/JavaScript, API testing, CI/CD/GitHub Actions, AI-assisted QA tools, and product-quality ownership.',
    why: 'This is a very strong match to my Playwright/TypeScript direction, API automation, CI/CD experience, AI-assisted tooling habits and preference for code-based QA automation.'
  },
  {
    slug: 'kbc-technologies-sdet-automation-test-engineer',
    stage: 'cv_ready_cover_letter_ready_to_verify',
    focus: 'SDET/Automation Test Engineer work, UI/API automation, CI/CD-integrated checks, defect diagnostics, and pragmatic test framework maintenance.',
    why: 'The visible SDET scope is relevant to my automation, API/UI, CI/CD and diagnostics background. I would verify the exact client stack before applying.'
  },
  {
    slug: 'pirxey-playwright-typescript-qa',
    stage: 'cv_ready_cover_letter_ready_verify_degree_requirement',
    focus: 'Playwright, TypeScript, Node.js context, API/UI automation, GitHub Actions, AI CLI tools, and compact product-team QA ownership.',
    why: 'This is a strong practical match through Playwright/TypeScript, API/UI automation, GitHub Actions and AI-assisted engineering. The degree requirement should be checked before final submission.'
  },
  {
    slug: 'toro-performance-senior-qa-automation',
    stage: 'cv_ready_cover_letter_ready',
    focus: 'Senior QA automation, Playwright, API testing, mocking/stubbing, microservice-style validation, and automation framework ownership.',
    why: 'The role maps well to my API/UI automation, framework improvement, CI/CD feedback and diagnostics background, with a strong senior QA ownership angle.'
  },
  {
    slug: 'travelplanet-invia-qa-automation-playwright',
    stage: 'cv_ready_cover_letter_ready_lower_priority',
    focus: 'Playwright automation, REST API testing, CI/CD, BrowserStack-style cross-browser validation, and web/backend quality for travel products.',
    why: 'This is a good fit through Playwright, REST/API checks, CI/CD and web-product quality. I would keep it lower priority only because the match appears slightly less senior/strategic than the top targets.'
  },
  {
    slug: 'scalo-qa-automation-java-katowice',
    stage: 'cv_ready_cover_letter_ready_live_status_to_verify',
    focus: 'Java-oriented QA automation, REST Assured/API testing, Selenium or Playwright UI checks, SQL, Azure DevOps, BDD, and banking workflow quality.',
    why: 'This is a decent fit through banking/workflow context, API/UI automation, SQL, logs and Azure DevOps. I would frame Java as an automation foundation and verify the vacancy is still live before applying.'
  },
  {
    slug: 'twelvedevs',
    stage: 'cv_ready_cover_letter_ready_outreach_to_send',
    focus: 'Playwright, TypeScript/JavaScript, UI/API/integration testing, AI tools in QA, CI/CD understanding, and product automation ownership.',
    why: 'This role is a strong fit through Playwright/TypeScript, API automation, CI/CD context and daily use of AI-assisted engineering tools.'
  }
];

function readRegistry() {
  return JSON.parse(fs.readFileSync(registryPath, 'utf8'));
}

function arg(value) {
  return value == null ? '' : String(value);
}

function linksArg(entry) {
  return Array.isArray(entry.links) ? entry.links.join(',') : arg(entry.links);
}

function addCompany(entry) {
  const args = [
    path.join(interviews, 'scripts', 'add-company.js'),
    '--name', entry.name,
    '--slug', entry.slug,
    '--role', entry.role || '',
    '--stack', entry.stack || '',
    '--status', entry.status || 'target',
    '--stage', entry.stage || '',
    '--process', entry.process || '',
    '--requirements', entry.requirements || '',
    '--notes', entry.notes || '',
    '--links', linksArg(entry),
    '--fit', entry.fit || '',
    '--recommended-cv', entry.recommendedCv || '',
    '--cover-letter', entry.coverLetter || '',
  ];
  if (typeof entry.salaryAsk === 'string' && entry.salaryAsk.trim()) args.push('--salary-ask', entry.salaryAsk);
  if (typeof entry.outreach === 'string' && entry.outreach.trim()) args.push('--outreach', entry.outreach);
  if (typeof entry.outreachUrl === 'string' && entry.outreachUrl.trim()) args.push('--outreach-url', entry.outreachUrl);
  args.push('--no-git');
  const result = spawnSync('node', args, { cwd: interviews, encoding: 'utf8' });
  if (result.status !== 0) {
    process.stdout.write(result.stdout || '');
    process.stderr.write(result.stderr || '');
    process.exit(result.status || 1);
  }
  process.stdout.write(result.stdout || '');
}

function cvMarkdown(entry, target) {
  return [
    '# Yauheni Sheima',
    '## Senior QA Automation Engineer / SDET',
    '',
    '**Krakow, Poland**  ',
    '**Phone:** +48 572 230 851  ',
    '**Email:** yauhenisheima@gmail.com  ',
    '**LinkedIn:** https://www.linkedin.com/in/yauhei-sheima/  ',
    '**EU Blue Card valid until 12/2027**',
    '',
    '---',
    '',
    '## Professional Summary',
    '',
    'Senior QA Automation Engineer / SDET with 7+ years of experience across UI/API automation, CI/CD-integrated quality, framework improvement, defect triage, environment-aware testing, and practical automation tooling.',
    '',
    `For **${entry.name} - ${entry.role}**, the relevant focus is ${target.focus} I bring a pragmatic automation mindset: build checks that give useful release signal, keep diagnostics readable, and connect test automation with developer feedback, CI/CD, logs, API/data validation, and product risk.`,
    '',
    '## Core Strengths',
    '',
    '- UI/API automation and regression coverage',
    '- Test design from requirements and risk areas',
    '- Playwright/Selenium automation direction',
    '- REST API testing, Postman/Newman, backend validation',
    '- CI/CD-integrated quality feedback',
    '- Defect triage, log analysis, and reproducible evidence',
    '- SQL/data checks and environment-aware debugging',
    '- Automation framework improvement and maintainability',
    '- Cross-functional collaboration with developers and product teams',
    '- AI-assisted engineering workflows with Claude Code, ChatGPT and Copilot',
    '',
    '## Technical Skills',
    '',
    `**Role-relevant stack:** ${entry.stack || target.focus}  `,
    '**Automation:** Playwright, Selenium WebDriver, API automation, Postman/Newman, REST Assured context, TestRail  ',
    '**Languages:** TypeScript/JavaScript, C#, PowerShell, Java, SQL, practical Python scripting  ',
    '**CI/CD:** Azure DevOps, Jenkins, TeamCity, GitHub Actions/GitLab CI context, YAML pipelines, Git  ',
    '**Debugging:** Browser DevTools, logs, SQL, defect triage, environment investigation  ',
    '**Infrastructure context:** Azure, Docker/Kubernetes support scenarios, Windows/Linux, monitoring/logging tools',
    '',
    '## Professional Experience',
    '',
    '### Definely - QA Automation Engineer',
    '**Krakow, Poland**  ',
    '**06/2025 - Present**',
    '',
    '- Refactored and extended an API automation framework, raising coverage from around 117 to 199 tests without adding runtime.',
    '- Cut automation log output from around 1.5 GB to 11 MB per run, making failures easier to analyze and route.',
    '- Used API-driven setup and backend validation to shorten scenario validation from 5+ minutes to about 1 minute.',
    '- Started in a C# and FlaUI automation framework, then moved with the product direction toward TypeScript and Playwright.',
    '- Supported the Playwright and TypeScript automation direction for maintainable UI checks.',
    '- Worked with QA and developers on acceptance criteria, defect evidence, and release readiness.',
    '- Used AI-assisted tools including Claude Code, ChatGPT and Copilot to accelerate test design, debugging and repetitive engineering work.',
    '- Python positioned honestly as practical automation/scripting and framework-support capability; strongest long-term scripting depth remains PowerShell, TypeScript/JavaScript and C#/Java automation foundations.',
    '',
    '### Leapwork - QA Automation Engineer (DevOps & Automation Focus)',
    '**Krakow, Poland / Minsk, Belarus**  ',
    '**11/2018 - 03/2025**',
    '',
    '- Automated reproducible test and release-support environments with PowerShell, Azure DevOps YAML, Bicep and VM tooling.',
    '- Built scripts, browser helpers and internal utilities to remove repetitive manual work and improve QA/support workflows.',
    '- Supported CI/CD pipelines, release diagnostics, environment setup, logs, monitoring and infrastructure-aware quality work.',
    '- Worked with Docker/Kubernetes support scenarios, Grafana/K9s/Helm, services, logs and deployment troubleshooting.',
    '- Helped teammates with onboarding, setup, documentation and technical troubleshooting.',
    '- Worked around enterprise application workflows including Dynamics 365 and banking-style green-screen scenarios.',
    '',
    '### EPAM Systems - Automation QA Engineer / Tester (.NET)',
    '**Minsk, Belarus**  ',
    '**09/2017 - 11/2018**',
    '',
    '- Built enterprise automation foundations with Java, C#, Selenium WebDriver and NUnit.',
    '- Maintained and extended UI regression automation for enterprise web applications.',
    '- Executed and monitored automated test runs in Jenkins and analyzed regression failures.',
    '- Contributed to framework and documentation practices for maintainable automated testing.',
    '',
    '## Role-Relevant Positioning',
    '',
    '- Best fit: QA Automation Engineer, SDET, DevOps-aware QA, test infrastructure and API/UI automation roles.',
    '- Strongest practical areas: automation design, API/UI testing, CI/CD feedback, framework maintainability, logs/diagnostics, environment-aware QA.',
    '- Honest scope: Python is a practical automation/scripting and ramp-up area, not the primary multi-year production language; strongest long-term coding/scripting depth is PowerShell, C#/Java foundations, and JavaScript/TypeScript automation.',
    '',
    '## Education',
    '',
    '**Belarusian State University of Informatics and Radioelectronics (BSUIR)**  ',
    'Bachelor of Science in Digital Economy  ',
    'Minsk, Belarus  ',
    '2013 - 2017',
    '',
    '---',
    '',
    '*I agree to the processing of personal data provided in this document for recruitment purposes pursuant to applicable data protection laws, including GDPR (EU) 2016/679).*',
    ''
  ].join('\n');
}

function coverLetter(entry, target) {
  return [
    `# ${entry.name} - ${entry.role} Cover Letter`,
    '',
    `Dear ${entry.name} team,`,
    '',
    `I am interested in the ${entry.role} role. I bring 7+ years of QA automation and SDET-style experience across UI/API automation, CI/CD-integrated testing, framework improvement, defect triage, environment-aware debugging and practical automation tooling.`,
    '',
    `The strongest overlap with this role is around ${target.focus} My recent work includes improving an API automation framework, increasing automated coverage without increasing runtime, reducing noisy test logs from around 1.5 GB to 11 MB per run, and supporting Playwright/TypeScript automation direction for maintainable UI checks.`,
    '',
    'I can contribute with pragmatic test automation, clear defect evidence, API/backend validation, CI/CD feedback, log and data analysis, and close collaboration with developers and product stakeholders. I also use modern AI-assisted engineering tools such as Claude Code, ChatGPT and Copilot to speed up test design, debugging and repetitive workflow automation while keeping claims and test results grounded.',
    '',
    target.why,
    '',
    'I would be glad to discuss how my QA automation background can support your team.',
    '',
    'Best regards,',
    'Yauheni Sheima',
    ''
  ].join('\n');
}

function main() {
  fs.mkdirSync(tailoredDir, { recursive: true });
  const registry = readRegistry();

  for (const target of targets) {
    const existing = registry.companies.find(company => company.slug === target.slug);
    if (!existing) {
      throw new Error(`Target not found in companies.json: ${target.slug}`);
    }

    const companyDir = path.join(interviews, 'companies', target.slug);
    fs.mkdirSync(companyDir, { recursive: true });

    const cvPath = path.join(cvRoot, 'pdf', target.slug, `${target.slug}.cv.Yauheni.Sheima.pdf`);
    const coverLetterPath = path.join(companyDir, 'cover-letter.md');
    const merged = {
      ...existing,
      status: 'target',
      stage: target.stage,
      recommendedCv: cvPath,
      coverLetter: coverLetterPath
    };

    fs.writeFileSync(path.join(tailoredDir, `${target.slug}.md`), cvMarkdown(merged, target), 'utf8');
    const letter = coverLetter(merged, target);
    fs.writeFileSync(coverLetterPath, letter, 'utf8');
    fs.writeFileSync(path.join(companyDir, 'cover-letter.txt'), letter, 'utf8');

    addCompany(merged);
  }

  console.log(`Generated target materials for ${targets.length} companies`);
}

main();
