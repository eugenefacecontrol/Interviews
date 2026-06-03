# XM HR Screen Postmortem - 2026-06-02

Source: transcript `MX_02.06.2026_en---c10dbf77-86f4-40c5-8fba-1dddf81241f2.txt`.

## Outcome

- HR screen completed on 2026-06-02.
- Recruiter will submit notes to the technical team.
- Expected feedback: by the end of the week or early next week.
- If positive: technical interview around 2 hours, including technical discussion and a live Python coding task.
- If technical interview is successful: final call with Head of QA, official offer, background check.

## Company / Contract Details From The Call

- Group: Trading Point Holding.
- Brands: XM and Trading.com.
- Products: trading platforms for stocks, commodities, energy, and other instruments.
- XM targets Middle East, Asia, and Africa; Trading.com targets Europe and USA.
- Offices: Cyprus HQ with two offices, three offices in Greece, smaller offices in London, Sydney, Dubai, and New York.
- Scale: 2,000+ employees and 20M+ clients globally.
- Poland has no local entity.
- Contract model: exclusive B2B services consulting agreement.
- Business incubator/umbrella company is not accepted.
- Expected workload: 8 hours/day, 40 hours/week.
- Must adapt to Cyprus time zone and Cyprus public-holiday calendar.
- Benefits for B2B contractor: 21 paid leave days/year, one birthday leave day, 5 paid sick leave days, 150 EUR/month food allowance via invoice, annual performance bonus eligibility after one year, usually around one extra monthly gross salary but not fixed.

## Role Details From The Call

- QA department has 100+ people across manual and automation testing.
- Automation is split between Java automation and Python automation teams.
- Role: SDET in Python combining software development and automation testing.
- Expected tools/frameworks mentioned: PyTest, Requests, Selenium, Playwright, CI/CD pipelines.
- Collaboration: QA engineers, DevOps team, project managers, business analysts, product, and other cross-functional scrum team members.
- Team geography: Cyprus, Greece, Poland, Romania, Bulgaria, Serbia, Croatia, Spain, Georgia, Moldova, and other European countries.
- Project assignment is decided after technical interview based on background and fit.

## What Went Badly

### 1. Leapwork Story Was Framed Too Defensively

The recruiter heard: no-code automation, low coding exposure, then mostly DevOps. That made Leapwork sound less relevant to a Python SDET role.

Problematic direction from transcript:

> Leapwork was about automation without code, so I moved to DevOps because there was not enough code.

Better frame:

> Leapwork was a no-code automation product, but my role was broader than creating no-code flows. I worked around the product ecosystem: automation support, internal tooling, PowerShell scripts, JavaScript browser utilities, CI/CD workflows, environments, logs, troubleshooting, and release support. It was not classic backend development, but it was practical automation engineering around a complex product.

### 2. Technology List Collapsed Under Stress

When asked about Leapwork technologies, the answer narrowed to PowerShell, Azure, Jira. That missed important adjacent experience: JavaScript/Tampermonkey-style scripts, YAML pipelines, Git, VMs, logs/monitoring, Docker/Kubernetes support context, release workflows.

Better answer:

> At Leapwork, my strongest scripting language was PowerShell. I also used JavaScript for browser-side helpers and Tampermonkey-style workflow automation, Azure DevOps and YAML pipelines for CI/CD, Azure infrastructure-related tools, Git, Jira, Windows and VM environments, logs and monitoring, and practical Docker/Kubernetes support contexts.

### 3. Python Answer Was Too Unstructured

The Python explanation improved only after the recruiter guided the answer. The good concrete example was image/PDF/UI comparison with DPI/resolution differences and expected vs actual visual matching.

Better Python story:

> At Definely, Python was not my main language, but I used it as a supporting automation language where TypeScript/Playwright was not practical enough. One example was visual/result comparison for Word add-in scenarios and document output, where different virtual machines had different DPI and resolution. Python scripts helped compare expected and actual results by percentage/tolerance, including whether UI elements or highlights were present and visually correct.

Safer ratio answer:

> Python was around 20% of my coding work there. TypeScript/Playwright and C# were larger parts, while Python was used for supporting scripts and checks where it was the best fit.

### 4. PyTest / Requests Answers Need Precision

You answered yes to PyTest and Requests. For future calls, be careful to avoid sounding like deep recent Python framework ownership if they ask follow-up questions.

Better precision:

> I have practical exposure to PyTest and Requests in automation/support contexts. I would not position Python as my deepest language, but I can work with existing Python test code and I am actively strengthening it for SDET roles.

### 5. Kafka / Messaging Answer Was Too Broad

Transcript answer: direct no Kafka, but worked with messaging and SQL/Postgres and "everything that is covered in Kafka" in other services. That can sound vague.

Better answer:

> I have not worked directly with Kafka in production. My closest relevant experience is backend/API testing, logs, correlation, asynchronous-style flow thinking, and test-system debugging. For Kafka specifically, I understand the testing concerns: message schema, producer/consumer behavior, retries, duplicates, ordering, idempotency, offsets, and traceability. I would ramp into the team's topics, contracts, and observability flow.

### 6. No Questions At The End

Not asking questions makes the candidate look less prepared. Always ask at least two.

Good questions for XM:

- What does the Python SDET team own today: framework development, CI/CD, performance testing, or feature-level test coverage?
- What is the current Python automation stack: PyTest, Requests, Selenium, Playwright, custom libraries?
- What are the biggest quality pain points now: flaky tests, slow feedback, low API coverage, performance regressions, or environment instability?
- How much of the role is Python framework work versus test-case implementation?
- What should a successful SDET deliver in the first 3 months?

## What Actually Went Well

- Education gap was caught and has now been fixed in generated CVs.
- Contract model was clarified: direct B2B/freelancer, no incubator.
- Salary expectation given: 4,500 EUR/month.
- Availability: immediate.
- Work authorization: Blue Card, no additional work permit needed.
- You were honest about no direct WebSockets, gRPC, Kafka.
- You gave a usable concrete Python example after prompting: visual/result comparison across VM DPI/resolution differences.
- You clearly rejected gambling roles; XM/trading was not treated as gambling by the recruiter.

## Best Follow-Up Positioning For Next Calls

### Leapwork

> Leapwork was a no-code automation product, but my role was broader than recording no-code flows. I worked with PowerShell automation, JavaScript browser utilities, Azure DevOps/YAML pipelines, environments, logs, troubleshooting, and release workflows. It was practical automation engineering around a complex product.

### Definely / Python

> At Definely, my main automation direction was TypeScript/Playwright and C# context, with Python used as a supporting automation language. A concrete example was document/visual result comparison where VM DPI and resolution differences made direct UI checks unreliable. Python helped compare expected and actual output with tolerance/percentage logic.

### Python Depth

> Python is not my deepest historical language. My strongest scripting depth is PowerShell, with TypeScript/JavaScript and C# experience as well. But I can work with Python automation code, PyTest/Requests-style checks, and I am actively strengthening Python for SDET roles.

### Why SDET

> My strongest value is not only one language. It is automation engineering: test design, framework thinking, API/backend validation, CI/CD feedback, logs, debugging, and making automated checks reliable and useful for engineering teams.

## Immediate Action Items

1. Build a memorized 90-second Leapwork story.
2. Build a memorized 90-second Definely/Python story.
3. Prepare a compact technology list by company: EPAM, Leapwork, Definely.
4. Prepare Python live-coding basics: strings/lists/dicts, functions, pytest, requests, JSON, file handling, simple OOP, async basics.
5. Prepare three questions for every HR screen.
6. Avoid saying "I don't know what to say" in interviews. Use: "Let me structure it this way..."

## Fixed After The Call

- Added Education fallback to personalized CV PDF generation.
- Added GDPR consent fallback to personalized CV PDF generation.
- Rebuilt all 135 personalized CV PDFs.

## Related Files

- XM prep: `/Users/yauhenisheima/Sources/Interviews/companies/xm/interview-prep.md`
- Leapwork story: `/Users/yauhenisheima/Sources/Interviews/leapwork-story-for-interviews.md`
- XM CV PDF: `/Users/yauhenisheima/.openclaw/workspace/cv-master-profile/pdf/xm/xm.cv.Yauheni.Sheima.pdf`
