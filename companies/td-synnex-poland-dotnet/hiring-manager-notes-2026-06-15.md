# TD SYNNEX Poland - Hiring Manager / Technical Interview Notes

Date: 2026-06-15
Interviewer: Tugay Taskin
Role: Senior Test Automation Engineer (.NET)
Duration: 45 minutes
Transcript: `hiring-manager-transcript-2026-06-15.txt`

## Outcome

Technical / hiring-manager interview completed.

The conversation was mixed-to-negative from a fit perspective. Tugay was engaged and explained the team's stack and expectations in detail, but he also gave direct closing feedback: he expected more depth and clearer ownership in one strong area. His concern was that the profile sounded spread across many tools and languages without enough visible expert-level command in the specific stack/approach his team uses.

Status recommendation: keep as `interviewing / hiring_manager_completed_feedback_pending` until official recruiter feedback arrives, but treat the call as high risk.

## Interviewer's Expectations

Tugay's team appears to expect a strong quality automation engineer who can drive end-to-end automation delivery, not only write isolated tests.

Important expectations:

- Strong ownership of quality for a user story from acceptance criteria through sign-off.
- Azure DevOps test management / test case / test run integration.
- C#/.NET and MSTest exposure.
- Large-scale automation framework thinking.
- AI-assisted test creation and automation, but with human review and ownership.
- Ability to work with Microsoft ecosystem deeply instead of jumping between unrelated tools.
- Ability to choose/open-source tools and shape quality strategy, not only use tools selected by project managers.
- Full delivery flow: test cases, automation, PR, review, pipeline, test execution association, dashboard/reporting, and team sign-off.

## Questions / Topics Asked

### Intro and experience

Yauheni introduced himself as 8 years in QA, initial Java experience, then C# at EPAM, DevOps/process automation at Leapwork, return to QA automation, C#/FlaUI, TypeScript/Playwright, PowerShell, JavaScript, and practical Python usage.

### Real depth in listed technologies

Tugay challenged whether tools listed on the CV were actively used or only observed.

Examples:

- K9s: whether it was used directly from local environment.
- Docker / Docker Compose: whether Yauheni extended scenarios/files himself.
- Grafana and other tools: whether he actually worked with them or only viewed dashboards prepared by others.

### Framework creation

Tugay asked whether Yauheni created frameworks from scratch, who built them, team size, and what the exact contribution was.

Yauheni explained:

- Definely had two automation QAs.
- TypeScript/Playwright framework was created together with a colleague.
- AI/Claude was used to generate the base and page objects.
- Manual work was needed to validate selectors and combine duplicated flows.
- API setup/preconditions were a favorite and strong part.

### AI usage

Both sides discussed AI heavily.

Strong points:

- Yauheni framed AI as an assistant, not a magic replacement.
- Tugay agreed that AI output must be reviewed and understood.
- Tugay's team uses MD/skill files, MCPs, Azure storage/blob knowledge, agents, mini models, token/credit cost management, and PR review agents.

Risk:

- Tugay's team is very advanced in AI-assisted automation. Generic AI enthusiasm is not enough; they expect structured, production-scale AI workflow ownership.

### MSTest / NUnit / Azure DevOps

Tugay asked about MSTest / unit test frameworks and Azure DevOps experience.

Yauheni answered:

- Mostly NUnit.
- MSTest at EPAM, with different attributes and scoping.
- Azure DevOps experience: service connections, user permissions, firewall/networking, and pipelines.

### Main scenario question: user story quality flow in Azure DevOps

Tugay asked a scenario:

> A team starts a user story. Product/business expects it to be delivered next sprint. Your responsibility is to ensure quality, regression, automation, and pipeline execution in Azure DevOps. What is your first action and flow?

Yauheni's answer was weak/unclear:

- Mentioned checking results, pipeline, artifacts, TestRail/test plan/test run.
- Mentioned creating a task and logging results.
- Did not start from acceptance criteria, test case design, failed test cases, team communication, automation implementation, PR, execution association, and sign-off.

Tugay's model answer:

1. Read and understand acceptance criteria.
2. Create test cases from scratch or with AI.
3. Cover positive, negative, and edge scenarios.
4. Initially mark/expect tests as failed if functionality is not done yet.
5. Track readiness through daily communication with the team.
6. Manually validate once where needed.
7. Record Playwright flow while exploring.
8. Use existing Gherkin/functions instead of duplicating code.
9. Use MCP/AI agents to validate and generate scenarios where appropriate.
10. Run locally and confirm green.
11. Inform the team quickly.
12. Create PR.
13. Review own code, peer review, AI PR review.
14. Check pipeline.
15. Associate automated execution/test run with test cases in Azure DevOps.
16. Publish/share dashboard/reporting.
17. Sign off the user story as quality owner.

Key lesson:

> For this team, quality ownership means driving the whole story lifecycle, not only writing/running automated tests.

### IDE / development tools

Tugay asked which development tools Yauheni uses locally and why. Yauheni mentioned Rider, IntelliJ IDEA, Visual Studio + ReSharper, VS Code.

Tugay said their team uses VS Code, not Rider.

### Test case volume and scale

Tugay asked about volume of test cases managed and whether they were scalable across environments.

Yauheni described:

- Two automators for four teams.
- One PDF project with around 30 smoke cases.
- Another project started around 119/130 and grew to almost 200 automated flows across API/UI.
- Pipeline supported smoke/regression separation.
- Parallel execution was not implemented.
- Power Automate was later used to help manual testers create automation based on prebuilt collections/steps.

Tugay's team scale:

- Minimum around 15,800 test cases.
- Four environments plus UAT and production.
- Heavy parallel execution.
- Team of about 10 automation/full-stack quality engineers plus manual QA context.
- Python + Playwright, TypeScript lightweight checks, C# / MSTest in parts.
- Frameworks compiled to Docker and scaled through Kubernetes pods/browser agents.
- Teams integration: slash commands such as health checks to trigger automation.
- Strong Azure DevOps and AI integration.

### Test management / reporting

Tugay asked why not use Azure DevOps test results/reporting if working in Microsoft ecosystem.

Yauheni explained project constraints:

- Current project used AWS, GitHub, S3.
- Earlier project used Azure DevOps.
- TestRail held test cases and manual/partially automated result synchronization.
- TeamCity was used before GitHub.
- A script pushed result changes to TestRail based on case numbers.

Risk:

- Answer showed experience adapting to project decisions, but not strong ownership of test management/reporting architecture.

### Open source tooling

Tugay asked what Yauheni would do if paid tools like TestRail were not allowed and he had to choose open-source alternatives for test management/results.

Yauheni answered honestly that he had not directly worked much with open-source test management tools; companies usually covered tooling decisions through project managers and higher-level approvals.

Risk:

- Tugay expected more proactive tool research/selection strategy.

### Playwright + TypeScript framework details

Tugay asked:

- Framework created from scratch?
- Which model was used?
- Page Object or another pattern?
- How long baseline creation took?

Yauheni answered:

- TypeScript + Playwright framework built from scratch with a colleague.
- Claude generated base methods/page objects.
- Page Object approach.
- Application was a desktop app based on Office.js; DevTools could connect and interact.
- Selectors were generated/checked manually.
- Some IDs/classes were requested from developers.
- Baseline was fast, but most time went into combining flows, removing duplicate functions, checking possibilities, API preconditions, token/session exploration via Fiddler, and debugging.

Strong point:

- API preconditions and avoiding slow UI setup were clearly useful.

## Interviewer Team / Stack Information

Tugay described the role/team in detail:

- Commerce platform similar to Amazon, but B2B/private commerce for companies.
- Responsibility: make sure products can be bought, ordered, tracked, and followed through the process.
- Strong Microsoft/Azure ecosystem.
- Python + Playwright framework and other libraries.
- TypeScript lightweight checks for production deployment/smoke.
- C# and MSTest still used in some areas.
- Heavy AI usage: agents, knowledge files, MCP, Azure Blob/search, Teams integration, PR review agents, model cost optimization.
- Test execution at scale: Dockerized frameworks, Kubernetes pods/browser agents, parallel execution.
- Mongo and SQL/data management.
- Open-source strategy matters; they want to avoid dependency on expensive private testing tools where possible.
- Team acts like full-stack quality engineers: dashboards, tool integrations, webhooks, microservices, automation frameworks, market research, vendor onboarding.

## Final Feedback From Tugay

Tugay's closing feedback:

- He expected more.
- Yauheni may be a good coder, but Tugay could not clearly identify the strongest expert area.
- The profile sounded like "I know something here, something there" rather than deep strength in one area.
- Tugay prefers candidates who are very strong in one ecosystem/area.
- For their team, Microsoft/Azure DevOps depth and focused expertise matter.
- Jumping across many technologies can become a weakness if there is no clear primary strength.

## Assessment

Overall: high-risk interview.

What went well:

- Friendly communication.
- AI discussion was aligned with Tugay's thinking.
- API preconditions / Fiddler / reducing UI setup showed useful engineering thinking.
- Definely framework growth and log reduction remain good evidence.
- Honest answers; no obvious overclaiming.

What went poorly:

- The Azure DevOps user-story quality-flow question was not answered at the ownership level expected.
- Too many broad technologies were mentioned without a sharp expert narrative.
- Open-source tooling answer was weak.
- Azure DevOps test management / test result association / quality sign-off depth was not clear.
- Parallel/scalable execution experience was weaker than their environment requires.
- The answer to framework creation leaned too much on AI/page object generation and less on architecture/design decisions.

## Lessons For Future Interviews

### 1. Use a stronger primary identity

Better framing:

> My strongest area is automation framework reliability and CI feedback in the Microsoft/C# ecosystem: stable tests, API-driven setup, diagnostics, logs, and maintainable test architecture.

Avoid listing too many languages/tools at the start.

### 2. For any user story quality-flow question, start from acceptance criteria

Recommended answer:

> First I review acceptance criteria and clarify gaps with PO/devs. Then I design test cases: positive, negative, edge, and regression impact. I decide what should be manual first, what should be API-level, and what should be UI-level. I link tests to the story/test plan, validate locally, automate stable scenarios, create PR, run CI, publish artifacts/results, notify the team, and sign off the story when evidence is green.

### 3. Prepare Azure DevOps Test Plans language

Know:

- Test Plans
- Test Suites
- Test Cases
- Test Runs
- Test Results
- linking tests to requirements/user stories
- automated test association
- TRX result publishing
- dashboard/reporting

### 4. Prepare open-source alternatives

For future answers:

- Test management: TestLink, Kiwi TCMS, Qase alternatives if paid allowed, Xray is paid, Allure TestOps paid, plain Git + Markdown for lightweight.
- Reporting: Allure Report, ReportPortal, ExtentReports.
- Browser/cloud alternatives: Playwright native, Selenium Grid, Selenoid, Moon if allowed, browser-use for AI exploration.
- API: Bruno, Hoppscotch, Postman alternatives, REST Assured for Java, HttpClient/RestSharp for C#.

### 5. Scale story needs strengthening

Prepare a clean answer around:

- parallel execution;
- environment matrix;
- Dockerized test runners;
- Kubernetes/browser agents;
- test sharding;
- tagging;
- CI resource constraints;
- data isolation.

## Current Next Step

Wait for official recruiter feedback. Do not send follow-up unless recruiter asks or no response after a reasonable delay.
