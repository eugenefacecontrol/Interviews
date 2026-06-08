#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const interviews = path.resolve(__dirname, '..');
const cvRoot = '/Users/yauhenisheima/.openclaw/workspace/cv-master-profile';
const tailoredDir = path.join(cvRoot, 'tailored-cv');

const jobs = [
  ['forte-group-sdet-playwright', 'Forte Group', 'Senior SDET (TypeScript/Playwright)', 'TypeScript, Playwright, SDET, UI/API automation, CI/CD', 'https://www.linkedin.com/jobs/view/4423368379', '86/100', 'TypeScript and Playwright SDET work, framework maintainability, CI/CD feedback, API/UI quality.', 'This role matches my current Playwright/TypeScript direction and broader SDET profile: UI/API automation, framework improvement, CI/CD feedback, and defect evidence.'],
  ['rydoo-playwright', 'Rydoo', 'Senior Automation QA Engineer (Playwright)', 'Playwright, TypeScript/JavaScript, UI/API automation, CI/CD', 'https://www.linkedin.com/jobs/view/4415217562', '84/100', 'Senior Playwright automation, product QA, maintainable UI/API coverage, release feedback.', 'I see a strong direct fit around Playwright automation, product-quality ownership, CI/CD-integrated checks, and pragmatic framework maintenance.'],
  ['td-synnex-poland-playwright', 'TD SYNNEX Poland', 'Senior Software Engineer in Test - Playwright', 'Playwright, TypeScript/JavaScript, SDET, CI/CD, test architecture', 'https://www.linkedin.com/jobs/view/4417261316', '84/100', 'Software Engineer in Test role with Playwright, automation design, CI/CD feedback, diagnostics.', 'This role fits my SDET positioning: coding-based automation, Playwright/TypeScript, CI/CD feedback, and practical diagnostics across product workflows.'],
  ['eleks-python-automation', 'ELEKS', 'Senior Test Automation Engineer (Python)', 'Python, Selenium, Jenkins, JavaScript, SQL, automated testing', 'https://nofluffjobs.com/pl/job/senior-test-automation-engineer-python-eleks-remote', '78/100', 'Senior test automation with Python/Selenium/Jenkins, remote Krakow context, SQL nice-to-have.', 'I see a good fit through senior automation, Selenium/Jenkins, scripting, SQL/backend validation, and CI/CD quality feedback. I would frame Python honestly as practical automation/scripting rather than my deepest long-term language.'],
  ['td-synnex-poland-dotnet', 'TD SYNNEX Poland', 'Senior Test Automation Engineer (.NET)', '.NET, C#, test automation, CI/CD, SDET', 'https://www.linkedin.com/jobs/view/4412912600', '80/100', '.NET/C# automation foundation, senior QA automation, CI/CD feedback, enterprise product quality.', 'This is a good match for my C# automation foundation, enterprise QA background, CI/CD context, and framework-improvement experience.'],
  ['first-advantage-test-automation', 'First Advantage', 'Senior QA Test Automation Engineer', 'QA automation, Selenium/Playwright foundation, API testing, CI/CD', 'https://www.linkedin.com/jobs/view/4414498166', '78/100', 'Senior QA automation, framework maintainability, UI/API checks, defect triage.', 'This is a relevant senior QA automation role where I can emphasize automation framework improvement, API/UI checks, CI/CD feedback, and product-quality ownership.'],
  ['diabolocom-sdet-remote', 'Diabolocom', 'Middle/Senior SDET - Full Remote', 'SDET, Java/Kotlin or Python, CI/CD, quality gates, distributed architecture', 'https://relocate.me/remote/remote/diabolocom/middle-senior-sdet-full-remote-9555', '76/100', 'Full remote SDET role, quality strategy, distributed systems, CI/CD quality gates, Python/Java/Kotlin automation.', 'I see a good engineering-quality fit through my SDET mindset, CI/CD quality gates, diagnostics, and distributed-system testing. I would position Java/Kotlin as foundation/ramp-up, with practical Python scripting.'],
  ['indg-grip-csharp-ts', 'INDG | Grip', 'QA Automation Engineer (C#/TS)', 'C#, TypeScript, QA automation, visual product platform, web automation', 'https://relocate.me/the-netherlands/amsterdam/indg-grip/qa-automation-engineer-c-ts-8867', '82/100', 'C#/TypeScript QA automation for a product platform, web automation, framework maintainability.', 'This is a strong match to my C# automation foundation plus TypeScript/Playwright direction, with product-focused automation and practical framework work.'],
  ['catawiki-qa-automation', 'Catawiki', 'QA Automation Engineer', 'Playwright, API testing, web/mobile automation, E2E testing', 'https://relocate.me/portugal/lisbon/catawiki/qa-automation-engineer-10215', '80/100', 'Web/mobile/API E2E automation with Playwright and cross-platform quality.', 'I see a good Playwright/API automation fit. Mobile-specific tools are a gap, but I can position broad UI/API automation, framework improvement, and cross-platform quality thinking.']
].map(([slug, name, role, stack, url, fit, focus, why]) => ({ slug, name, role, stack, url, fit, focus, why }));

function cvMarkdown(job) {
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
    'For **' + job.name + ' - ' + job.role + '**, the relevant focus is ' + job.focus + ' I bring a pragmatic automation mindset: build checks that give useful release signal, keep diagnostics readable, and connect test automation with developer feedback, CI/CD, logs, API/data validation, and product risk.',
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
    '**Role-relevant stack:** ' + job.stack + '  ',
    '**Automation:** Playwright, Selenium WebDriver, API automation, Postman/Newman, TestRail  ',
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

function coverLetter(job) {
  return [
    'Dear ' + job.name + ' Hiring Team,',
    '',
    'I am applying for the ' + job.role + ' role. I am a Senior QA Automation Engineer / SDET with 7+ years of experience across UI/API automation, CI/CD-integrated testing, framework improvement, and environment-aware quality work.',
    '',
    'What makes this role interesting to me is its focus on ' + job.focus + ' My strongest value is practical automation: I improve test frameworks, reduce noisy feedback, build useful diagnostics, and connect automated checks with release confidence rather than treating tests as isolated scripts.',
    '',
    'In my current role at Definely, I refactored and extended an API automation framework, increased coverage from around 117 to 199 tests without increasing runtime, and reduced automation log output from around 1.5 GB to 11 MB per run. I also supported the Playwright and TypeScript automation direction for maintainable UI checks and used API/backend context to make scenarios faster and easier to analyze.',
    '',
    'Earlier, at Leapwork, I worked for several years at the intersection of QA automation, DevOps, CI/CD, environment automation, and internal tooling. That background helps me investigate failures beyond the UI layer: logs, data setup, pipelines, environments, and reproducibility.',
    '',
    job.why,
    '',
    'I would be glad to discuss how my UI/API automation, Playwright/Selenium background, CI/CD experience, and pragmatic engineering approach could support your team.',
    '',
    'Best regards,',
    'Yauheni Sheima',
    ''
  ].join('\n');
}

fs.mkdirSync(tailoredDir, { recursive: true });

for (const job of jobs) {
  fs.writeFileSync(path.join(tailoredDir, job.slug + '.md'), cvMarkdown(job), 'utf8');

  const companyDir = path.join(interviews, 'companies', job.slug);
  fs.mkdirSync(companyDir, { recursive: true });
  const letter = coverLetter(job);
  fs.writeFileSync(path.join(companyDir, 'cover-letter.md'), letter, 'utf8');
  fs.writeFileSync(path.join(companyDir, 'cover-letter.txt'), letter, 'utf8');

  const cvPath = path.join(cvRoot, 'pdf', job.slug, job.slug + '.cv.Yauheni.Sheima.pdf');
  const addArgs = [
    path.join(interviews, 'scripts', 'add-company.js'),
    '--name', job.name,
    '--slug', job.slug,
    '--role', job.role,
    '--stack', job.stack,
    '--status', 'target',
    '--stage', 'cv_ready_cover_letter_ready',
    '--process', 'Fresh vacancy from 2026-06-08 latest job search. Materials prepared; application not sent yet.',
    '--requirements', job.focus,
    '--notes', job.why,
    '--links', job.url,
    '--fit', job.fit,
    '--recommended-cv', cvPath,
    '--cover-letter', path.join(companyDir, 'cover-letter.md'),
    '--no-git'
  ];
  const result = spawnSync('node', addArgs, { cwd: interviews, encoding: 'utf8' });
  if (result.status !== 0) {
    process.stdout.write(result.stdout || '');
    process.stderr.write(result.stderr || '');
    process.exit(result.status || 1);
  }
  process.stdout.write(result.stdout || '');
}

console.log('Generated materials for ' + jobs.length + ' jobs');
