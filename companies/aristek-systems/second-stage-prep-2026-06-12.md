# Aristek Systems - Second Stage SDET Interview Prep

Date: 2026-06-12
Role: AQA Engineer (C#+Python)
Interview: 1.5-hour technical SDET interview, Google Meet, expected 11:30-13:00 GMT+2
Expected interviewers: Aristek automation engineer + .NET developer
Expected language: Russian

## Fast Context

Aristek is hiring for a remote Middle AQA role for a UK automotive inspection / real-time quality-control product. The client builds scanner systems that inspect car production / paint quality after manufacturing. The software side includes scanner/computer-vision integration, microservices, and a web application for users who validate defects, check specifications, approve/reject findings, and generate inspection reports.

Known project/team facts from recruiter call:

- UK client, project already in production.
- New team is being formed for a large new scope.
- Planned team: 3 .NET developers, 2 frontend developers, 1 AQA, 1 DevOps, PO on client side.
- Stack mentioned: .NET, Python, Node.js, Angular, GCP, AWS, computer vision domain.
- Meetings with client/PO in English; internal Aristek communication likely Russian.
- Fully remote, EU working hours, B2B via Lithuanian office/incubator.
- They want someone ASAP.

Vacancy focus:

- Build automated frameworks from scratch.
- Web UI + REST/GraphQL API automation.
- CI/CD integration: Jenkins / GitLab / GitHub Actions.
- Test investigation, flaky test analysis, metrics/reporting, Allure-like reporting.
- Requirements review, test planning, automation scope definition.
- C#/.NET, Python and/or Golang, Selenium or similar, XUnit or similar.
- TDD/BDD, integration/programmatic testing, testing theory, AI usage for testing.

## Source Notes

- Existing local notes: `README.md`, `call-prep-2026-06-08.md`, `call-notes-2026-06-08.md`.
- Aristek vacancy page was checked earlier and is already reflected in local requirements.
- Glassdoor search result for Aristek shows only 1 interview question/review indexed. Direct Glassdoor fetch returned a security/403 page, so there is not enough reliable Aristek-specific interview data to treat as a strong source.
- I therefore prepared likely questions from the role description, the recruiter call, and common SDET interview patterns: framework design, C#/.NET basics, Selenium, API/GraphQL, CI/CD, flaky tests, microservices, cloud, and AI-assisted QA.

## Main Positioning

Your strongest message:

> I am QA automation first: 7+ years in QA/AQA, strong around UI/API checks, regression risk, failure analysis, CI feedback, and practical automation. I can work close to developers, read/debug code when needed, and build useful test architecture. My profile is not pure backend .NET feature development, so I would clarify that expectation, but automation around a .NET/microservice product is a good fit.

If they challenge C#/.NET depth:

> I do not want to overstate backend ownership. My strongest experience is QA automation and engineering-quality feedback. I can write and maintain automation code, work with typed languages, understand OOP, debug failures, and work with APIs/logs/CI. If the role needs full backend feature delivery, that is a different profile. If the need is framework, API/UI automation, and tests around .NET services, that is close to my background.

If they ask why this project:

> The project is interesting because it is not just simple CRUD testing. It has inspection workflows, defect validation, real-world quality-control risk, reports, integrations, probably images/scanner data, and production reliability. That is a good place for pragmatic automation: API checks, UI flows, data validation, regression protection, and clear failure evidence for developers.

## 90-Second Self Introduction

> I am a QA Automation Engineer / SDET with 7+ years of experience in QA, test automation, UI/API testing, regression validation, defect investigation, and CI/CD quality workflows. My strongest area is making automation useful for the engineering team: stable checks, understandable framework structure, clear failure analysis, and actionable feedback instead of noisy test results.
>
> I have worked with Selenium/Playwright-oriented UI automation, API testing, SQL/log diagnostics, release support, and collaboration with developers. I also have experience helping teams move from manual-heavy testing to better automation practices.
>
> For this Aristek role, the overlap I see is framework ownership, UI/API coverage, CI integration, and quality work around a production inspection product. The point I would like to clarify is the depth of C#/.NET backend expectations: my profile is QA automation first, not backend feature ownership, but I am comfortable working close to code and ramping deeper where automation architecture requires it.

## Likely 1.5-Hour Technical Interview Structure

Expect a practical technical conversation, not only textbook questions:

1. 5-10 min: background and strongest relevant projects.
2. 15-20 min: automation framework design from scratch.
3. 15-20 min: UI automation with Selenium / waits / locators / POM / flaky tests.
4. 15-20 min: API testing: REST, GraphQL, integration checks, auth, contracts.
5. 15-20 min: C# / OOP / xUnit / practical coding basics.
6. 10-15 min: CI/CD, reporting, parallelization, test stability.
7. 5-10 min: microservices/cloud/product-specific testing.
8. 5 min: AI in testing and privacy/client rules.
9. 5-10 min: your questions and next steps.

If they go deep technically, prioritize these areas:

- Framework design and trade-offs.
- Failure investigation and flaky tests.
- API/GraphQL and microservice testing.
- C# automation code structure, not backend feature development.
- CI signal quality.

## Questions They May Ask And Strong Answers

### 1. How would you build an automation framework from scratch?

Answer:

> I would start from product risk and pipeline needs, not from tool choice. First I would clarify critical user journeys, API boundaries, environments, test data, CI constraints, and expected reporting. Then I would split the framework into clear layers: test cases/specs, page or component objects for UI, API clients for service checks, test data builders, configuration, assertions, reporting, and utilities.
>
> I would keep UI tests focused on end-to-end confidence and move as much validation as possible to API/integration level because it is faster and more stable. In CI I would separate smoke, regression, and longer checks, with tagging and parallel execution. The framework should produce useful failure evidence: screenshots, logs, request/response data, test data identifiers, and Allure-style reports.

Mention:

- Clear folder structure.
- Reusable helpers, not copy-paste.
- Stable selectors / explicit waits.
- Environment config via variables/secrets.
- API clients and test data management.
- Smoke vs regression tags.
- Reporting and failure artifacts.

### 2. What is your automation pyramid strategy?

Answer:

> I treat the pyramid as a practical risk model. Unit tests should cover low-level logic and be owned mostly by developers. API/integration tests are very valuable for service contracts, business rules, and data flows. UI tests should cover critical user journeys and integration from the user's perspective, but I try not to put every validation into UI because that becomes slow and flaky.
>
> For this project I would expect strong API coverage for scanner/report/defect workflows and a smaller set of UI tests for reviewer actions: login, defect review, approve/reject, report generation, role-based access, and key regression flows.

### 3. How do you decide what to automate?

Answer:

> I prioritize stable, repeated, business-critical flows where automation gives reliable feedback. Good candidates are regression-prone flows, high-risk integrations, smoke checks, API contracts, permissions, data validation, and workflows that are expensive to retest manually.
>
> I avoid automating unclear or frequently changing UI too early. For unclear requirements, I first use exploratory testing and examples to stabilize understanding, then automate the agreed behavior.

### 4. How do you handle flaky tests?

Answer:

> I do not treat rerun as the real fix. First I classify the failure: product bug, test bug, environment issue, test data issue, timing/synchronization issue, external dependency, or infrastructure issue. Then I look at artifacts: logs, screenshots, network/API responses, timestamps, environment health, and recent code changes.
>
> Common fixes are better waits based on real application state, stable selectors, isolated test data, cleanup, avoiding test order dependency, mocking/controlling unstable dependencies where appropriate, and moving fragile UI validation to API level. If a test is known flaky, I would tag/quarantine it transparently and create a fix task, not let it silently poison the pipeline.

### 5. What makes a good Selenium test?

Answer:

> A good Selenium test validates a meaningful user behavior, uses stable locators, waits for real conditions, avoids sleeps, has clear assertions, is independent from other tests, creates or controls its own data where possible, and gives enough evidence when it fails. It should not duplicate implementation details or depend on CSS/layout that users do not care about.

Key terms:

- Explicit waits, no `Thread.Sleep` except very rare debug cases.
- Page Object / Screenplay / component abstraction when useful.
- Stable selectors: data-testid/accessibility ids if available.
- Screenshots, browser logs, console errors, network traces if supported.

### 6. Page Object Model: good or bad?

Answer:

> POM is useful when it reduces duplication and hides UI mechanics, but it becomes harmful if it turns into a huge god object or hides assertions in unclear places. I prefer small page/component objects with clear actions and locators, while test files still express business intent. For complex flows, I also use service/API helpers for setup instead of doing all setup through UI.

### 7. How would you test REST API?

Answer:

> I would cover status codes, response schema/contract, required fields, business rules, authorization/permissions, validation errors, idempotency where relevant, pagination/filtering/sorting, negative cases, and data persistence. For integration checks, I would verify the full effect: request accepted, data stored/updated, events or downstream state if applicable, and UI visibility if that is part of the workflow.

For this project examples:

- Create inspection/report entity via API.
- Validate defect status transitions.
- Check permissions for reviewer/admin/client roles.
- Verify generated report metadata.
- Check invalid image/report payload handling.

### 8. How would you test GraphQL?

Answer:

> For GraphQL I would test queries and mutations separately, validate schema expectations, required/optional fields, nested objects, error handling, authorization, and overfetching/underfetching risks. I would also test that mutations change backend state correctly and that queries return consistent data for different roles.
>
> Unlike REST, GraphQL often returns 200 with errors in the response body, so assertions must check the `errors` field and business payload, not only HTTP status.

### 9. How do you test microservices?

Answer:

> I split this into contract testing, integration testing, and end-to-end testing. Contract tests verify that services agree on request/response format. Integration tests check real interactions between selected services and database/message broker where needed. End-to-end tests cover only the most critical full workflows.
>
> I pay attention to service boundaries, async processing, eventual consistency, retries, timeouts, observability, test data, and environment stability. For failures, correlation IDs and logs are essential.

### 10. How would you test the automotive inspection product?

Answer:

> I would start with the key workflow: scanner/inspection input, defect detection or imported defect data, reviewer validation, status changes, specification checks, report generation, and audit trail. I would define API-level checks for data transitions and UI-level checks for the critical reviewer experience.
>
> Important risks are incorrect defect status, wrong report data, missing audit trail, role/permission problems, slow real-time flows, inconsistent data between services, and regression around production workflows. Since this is a quality-control product, traceability and evidence matter a lot.

### 11. What C# / OOP concepts should an AQA know?

Answer:

> For automation, I need practical OOP: classes, interfaces, inheritance when it is useful, composition, encapsulation, generics, exceptions, async/await, LINQ basics, dependency injection concepts, and clean structure. I care less about abstract theory and more about readable, maintainable test code.

Possible follow-ups:

- Interface vs abstract class:
  > Interface defines a contract; abstract class can provide shared implementation and state. In automation I usually prefer interfaces/composition when I want swappable drivers/clients/services.
- Encapsulation:
  > Hide low-level details and expose clear actions, for example page object methods or API client methods.
- Static:
  > Useful for constants/pure helpers, but overuse makes tests harder to isolate and configure.

### 12. What do you know about xUnit/NUnit?

Answer:

> I understand the role of a test runner/framework: test discovery, setup/teardown, assertions, fixtures, parameterized tests, categories/traits, parallelization, and CI reporting. In xUnit, common ideas are `[Fact]` for a test, `[Theory]` with data for parameterized tests, fixtures for shared setup, and assertions through `Assert`.
>
> For automation I would be careful with shared state and parallel execution. Fixtures should speed up setup, but tests still need isolation.

### 13. How would you integrate tests into CI/CD?

Answer:

> I would define suites by purpose: PR smoke checks, main-branch regression, scheduled deeper runs, and maybe environment-specific checks. The pipeline should install dependencies, prepare config/secrets safely, run tests with tags, publish reports, and keep artifacts like screenshots/logs/API traces.
>
> The important point is that the pipeline result must be trusted. If tests are flaky or too slow, developers stop respecting them. So I would start with a smaller reliable smoke set and expand coverage with clear ownership.

### 13a. How would you parallelize tests safely?

Answer:

> I would parallelize only after test isolation is clear. Each test should avoid shared mutable state, use unique test data, clean up after itself or use disposable data, and not depend on execution order. UI tests may need separate browser contexts/users. API tests can usually parallelize more easily if data is isolated. In CI I would split suites by tags and duration, and track whether parallel execution introduces environment pressure or false failures.

### 13b. How would you manage test data?

Answer:

> I prefer API/database/service-level setup over slow UI setup. Test data should be explicit, traceable, and isolated. For stable regression, I would use builders/factories for entities, unique identifiers per run, cleanup strategy, and clear separation between static reference data and generated test data. For this product, I would clarify how inspection/scanner data can be generated or mocked.

### 14. What metrics would you report?

Answer:

> I would avoid vanity metrics like just counting test cases. Useful metrics are pass/fail trend, flaky test rate, failure categories, execution time, critical workflow coverage, escaped defects, automation coverage for high-risk areas, and mean time to diagnose failures. The goal is to improve decision quality for releases.

### 15. How do you use AI in testing?

Answer:

> I use AI as an assistant, not as an authority. Good uses are requirement analysis, test idea generation, edge-case brainstorming, boilerplate generation, refactoring suggestions, log summarization, and reviewing tests for gaps. But I validate outputs manually, avoid leaking confidential data, and keep final responsibility with the engineer.
>
> For client-sensitive projects I would follow company rules: approved tools, anonymized data, no secrets, and human review.

### 16. What if requirements are unclear?

Answer:

> I would make uncertainty visible. I ask clarifying questions, propose examples, define assumptions, and create test scenarios around business rules. If needed, I use exploratory testing to learn the behavior and then convert stable expectations into automated checks. Automation before agreement can lock in the wrong behavior.

### 17. How do you communicate defects to developers?

Answer:

> A useful defect report should include clear steps or API request, expected/actual result, environment, test data, screenshots/logs, severity/risk, and any investigation already done. I try to make it easy for a developer to reproduce or at least narrow the issue quickly. For automation failures, I include the exact assertion and artifacts.

### 18. How would you test permissions / roles?

Answer:

> I would define a role matrix: who can view, create, update, approve/reject, export reports, manage users, or access specific inspection data. Then I would cover positive and negative checks mostly at API level, with a few UI checks for important role-specific screens. Negative authorization tests are important because UI hiding alone is not security.

### 19. How would you test reports?

Answer:

> I would verify data correctness, format, required fields, timestamps/timezones, user/role details, defect statuses, and traceability back to source inspection data. If it is PDF/Excel, I would validate generated content programmatically for stable fields and use manual/exploratory checks for layout-heavy parts when needed.

### 20. What would you do in the first month?

Answer:

> First I would understand the product workflow, current quality risks, environments, team expectations, and existing CI/test assets. Then I would identify critical smoke flows and API boundaries, agree on automation priorities, and set up or improve the framework skeleton: structure, config, reporting, CI execution, and first reliable tests. I would also build relationships with developers and PO so automation is aligned with real risks.

## C# / .NET Quick Refresh For Automation

Be ready to explain these in plain language.

### Interface vs abstract class

> Interface is a contract: what methods/properties something exposes. Abstract class can include shared implementation and state. In automation I would often use interfaces for drivers/clients/services when I want swappable implementations, and abstract/base classes only when common implementation genuinely helps.

### Composition vs inheritance

> I prefer composition for test frameworks because it is more flexible. For example, a test can use an API client, page object, data builder, and assertion helper. Deep inheritance often makes tests harder to understand and maintain.

### async/await

> `async/await` is used for asynchronous operations without blocking a thread, for example HTTP calls, file/network operations, or waiting for service responses. In tests it is useful for API clients and async workflows, but assertions still need clear awaited results.

### LINQ

> LINQ is useful for filtering, mapping, grouping, and querying collections in readable C# code. In tests I might use it to find a specific item in an API response, validate all objects match a condition, or extract values for assertions.

Examples to mention:

- `items.Where(x => x.Status == "Approved")`
- `items.Any(x => x.Id == expectedId)`
- `items.All(x => x.CreatedAt != null)`
- `items.Select(x => x.Name).ToList()`

### Exceptions

> In framework code, exceptions should make failures clear. I would avoid swallowing exceptions silently. For expected negative API cases, I assert the error response; for unexpected framework failures, I want useful error messages and artifacts.

### Dependency injection

> DI means passing dependencies from outside instead of constructing everything internally. It helps testing and configuration: for example passing an HTTP client, configuration, logger, or API client into a service/helper.

### SOLID, practical version

- Single Responsibility: page object/client/helper should have one clear reason to change.
- Open/Closed: add behavior without rewriting stable code where possible.
- Liskov: derived types should be usable as their base type without surprises.
- Interface Segregation: avoid huge interfaces with methods clients do not need.
- Dependency Inversion: depend on abstractions for swappable components where useful.

Keep it practical:

> I use these principles as guidance for maintainable automation code, not as dogma. The goal is readable tests and low maintenance cost.

## Selenium / UI Deep-Dive Prompts

### Explicit wait vs implicit wait

> Explicit wait waits for a specific condition: element visible, clickable, text present, URL changed, network/application state ready. Implicit wait applies globally to element lookup and can make timing less predictable. I prefer explicit waits because they document the condition the test needs.

### How to handle dynamic elements?

> Use stable attributes when possible, ask developers for test IDs if needed, avoid brittle XPath based on layout, wait for the real state, and locate by semantic relationships only when stable. If the app has reusable components, create component objects.

### How to handle stale element?

> Stale element means the DOM node was replaced. I would avoid storing WebElement longer than necessary, re-locate after page updates, wait for the new state, and make page object methods locate elements at action time.

### How to test file upload/download?

> For upload, use the input element directly if possible and assert backend/UI result. For download, configure download directory/context, trigger export, wait for the file, then validate file existence and key content/metadata. For reports, API-level validation can be more stable than full UI-only validation.

## API / GraphQL Deep-Dive Prompts

### Status code is 200 but test should fail?

> In GraphQL this is common because errors can be returned in the response body. Also in REST some APIs return 200 with business-level error fields. I assert the full contract: status code, error field, payload, business state, and side effects.

### Contract testing

> Contract testing checks that service consumers and providers agree on request/response shape and behavior. It is useful in microservices because it catches breaking changes earlier than full E2E tests.

### Idempotency

> Idempotency means repeating the same operation has the same effect as doing it once, where the operation is designed that way. For APIs, I would test it for operations like retry-safe updates or payment/order/report generation if relevant.

### Auth testing

> Cover unauthenticated, invalid token, expired token, valid token wrong role, valid token correct role, and object-level authorization. Object-level checks matter: user A should not access user B's inspection/report just because they know the ID.

## CI/CD And Reporting Deep-Dive Prompts

### What should happen when smoke tests fail?

> If smoke tests are reliable and cover critical readiness, a failure should block or at least stop promotion until triaged. The key is reliability. If the smoke suite is flaky, the immediate task is to fix trust in the suite; otherwise the team will ignore it.

### What artifacts do you need?

> Screenshots, videos/traces where possible, browser console logs, API request/response snippets with secrets masked, environment/build version, test data IDs, correlation IDs, and Allure/CI reports with clear categories.

### How to reduce pipeline time?

> Move checks down the pyramid, parallelize isolated tests, tag suites, run only relevant tests for PRs where possible, optimize setup, reuse safe fixtures, and keep long E2E tests scheduled rather than blocking every small change.

## Product-Specific Test Ideas For Aristek

Use these if they ask "what would you test here?"

- Defect status workflow: created -> reviewed -> approved/rejected -> report included/excluded.
- Role permissions: reviewer, admin, client/PO-like user.
- Inspection report correctness: defect count, severity, location, timestamps, reviewer, audit trail.
- Scanner/computer-vision input handling: missing image, corrupt image, duplicate scan, delayed processing.
- API/UI consistency: API status matches UI state after refresh and across roles.
- Real-time flow: new inspection appears without unacceptable delay, status updates propagate correctly.
- Auditability: who changed what, when, and why.
- Regression smoke: login, inspection list, open inspection, validate defect, generate report.
- Negative cases: invalid payloads, unauthorized access, stale data, concurrent updates.
- Performance/reliability: large inspection data, many defects, report generation time.

## Mini Practice Answers For Technical Pressure

If you do not know exact syntax:

> I may need to check exact syntax, but the approach is this...

If they ask a backend-heavy question:

> I can reason about this from an automation and API/integration perspective. I have not owned this as a backend feature developer, but I know what I would need to validate and how I would work with developers to debug it.

If they ask about a tool you used less:

> I have stronger hands-on experience with similar tools/patterns. I would map it this way: the core concepts are test structure, setup/teardown, assertions, reporting, and CI execution. The syntax is learnable; the engineering decisions are the important part.

If they push on seniority vs middle role:

> My experience is broader than a typical middle QA profile, but I am practical about title. What matters to me is whether the responsibility, technical scope, team, and compensation make sense.

## Coding / Practical Tasks They Could Give

### C# basics

They may ask to write or discuss:

- Reverse a string / find duplicates.
- Parse JSON and assert fields.
- Use LINQ to filter/map data.
- Basic class/interface design for API client or page object.
- Async API call concept.

Answering strategy:

> I would explain the approach first, keep the code simple, and mention edge cases. If syntax is not perfect from memory, I would say the idea clearly and correct it.

### Selenium task

Possible task:

- Open page, login, click element, wait for result, assert text.
- Explain how to locate dynamic element.
- Handle dropdown, modal, iframe, new tab, file upload.

Key answer:

> I would use explicit waits for a meaningful state, stable locators, avoid sleep, wrap repeated UI behavior in page/component objects, and keep assertion visible in the test.

### API task

Possible task:

- Send POST, validate response, then GET and check persisted state.
- Negative validation for bad payload.
- Auth token handling.

Key answer:

> I would validate both immediate response and actual system state. For negative tests I would assert business error code/message and that no unwanted state was created.

## Your Best Stories To Reuse

### Leapwork / automation adoption

Use for:

- framework thinking
- helping manual testers
- automation value
- readable tests

Short version:

> One useful experience was helping manual testers move toward automation and making automated checks understandable for people who were not deep programmers. That shaped my approach: automation should be maintainable, readable, and useful for the team, not just impressive technically.

### DevOps period

Use for:

- CI/CD
- pipelines
- automation mindset
- debugging environments

Short version:

> My DevOps period is useful for QA automation because it made me more comfortable with pipelines, environments, logs, and automation outside the test code itself. I still prefer QA automation as my main direction because it connects technical work with visible product quality.

### AI tools / OpenClaw / Codex

Use for:

- AI in testing
- productivity
- careful validation

Short version:

> I actively use AI tools for engineering support: generating test ideas, reviewing code, refactoring, drafting test cases, and summarizing logs. I treat AI output as a draft that must be reviewed. For company/client data I would follow approved-tool and privacy rules.

## Gaps To Handle Cleanly

### C#/.NET backend depth

Do not say:

- "I am a .NET backend developer."
- "I have deep production backend ownership."

Say:

> My background is QA automation first. I am comfortable with automation code, OOP, API testing, CI, debugging, and working close to developers. I can ramp deeper into .NET where the framework requires it, but if the role is mostly backend feature development, I would want to clarify that expectation.

### Golang

Say:

> Golang is a ramp-up area for me. I understand the use case from a QA perspective: reading service logic, running tests, understanding API behavior, and debugging logs/errors. Python is more comfortable for automation/tooling.

### "Middle" title

Say:

> Title is less important to me than the scope, team, responsibility, and compensation. I have senior QA experience, but I am open to the role if the technical scope and expectations are aligned.

## Questions To Ask Them

Technical:

- Is the automation framework already started, or should the AQA build it from scratch?
- Which test framework do you use or prefer: xUnit, NUnit, SpecFlow, something else?
- Selenium or Playwright? Is the choice fixed by the client?
- What is the expected split between UI, API, integration, and manual/exploratory testing?
- What are the most painful current quality issues: flaky tests, missing coverage, test data, environment instability, slow regression, unclear requirements?
- Do tests run in CI today? Are they blocking merges/releases or only scheduled?
- What reporting is expected: Allure, CI artifacts, dashboards, custom metrics?

Project:

- What are the critical workflows in the inspection platform?
- How is scanner/computer-vision data represented for testing? Images, metadata, events, API payloads?
- Are there stable test environments and test data?
- Are there role/permission/audit requirements?
- Are reports generated as PDF/Excel/web views/API data?

AI/client rules:

- Are AI tools allowed on this client project?
- Are there restrictions around source code, logs, screenshots, or production-like data?
- Does Aristek provide approved AI tools for engineering tasks?

Process:

- What does success look like for the AQA in the first 1-2 months?
- Who owns test strategy and automation architecture?
- How much direct communication with PO/client is expected?
- What are the next steps after this interview?

## Red Flags

- They expect a backend .NET developer who only additionally writes tests.
- Heavy Golang ownership with no ramp-up.
- No stable test environment/test data, but high automation expectations.
- They want 100% UI automation for everything.
- They tolerate flaky tests as normal.
- AI usage is expected without clear privacy/client rules.
- Salary/contract details remain vague after direct questions.

## Final Closing

If the interview goes well:

> From my side, the role sounds relevant if the main expectation is QA automation ownership around API/UI coverage, framework structure, CI feedback, and investigation of product quality risks. I would be glad to continue, especially if the C#/.NET part is connected to automation and service understanding rather than full backend feature ownership.

## 15-Minute Last Review Checklist

- Say clearly: QA automation first, not pure backend.
- Emphasize: framework, API/UI, CI/CD, failure analysis, stable signal.
- For C#: OOP, interfaces, async/await, LINQ, xUnit basics.
- For Selenium: stable locators, explicit waits, POM/components, artifacts.
- For API/GraphQL: contract, auth, schema, business rules, state verification.
- For microservices: contract/integration/E2E split, logs, correlation IDs, eventual consistency.
- For AI: useful assistant, human review, no confidential data leakage.
- Ask about: framework status, test stack, CI, test data, real quality risks, client AI policy.
