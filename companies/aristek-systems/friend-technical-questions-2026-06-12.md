# Aristek Systems - Friend Notes As Interview Questions

Date: 2026-06-12
Source: notes from Oris96 for technical interview preparation
Use with: `second-stage-prep-2026-06-12.md`

## How To Use This File

This is a fast Q&A drill file. The goal is not to memorize perfect textbook definitions, but to answer clearly and practically in a technical interview.

Recommended style:

- Start with a short definition.
- Add why it matters in real testing.
- Give 1 practical example.
- For Aristek, connect answers to framework design, UI/API automation, CI/CD, flaky tests, C#/.NET, and microservices.

## Testing Theory

### 1. What is software testing?

Software testing is the process of checking and evaluating a software product to find defects and verify that it meets requirements.

Short answer:

> Testing is not only finding bugs. It is also giving information about product quality, risks, and readiness for release.

### 2. What is the main goal of testing?

To verify that the system works correctly, satisfies requirements, and has no known critical defects that block release or business usage.

Practical wording:

> The goal is to reduce product risk and give the team reliable information for decisions.

### 3. What are the 7 testing principles?

1. Testing shows the presence of defects, not their absence.
2. Exhaustive testing is impossible.
3. Early testing saves time and money.
4. Defects cluster in specific modules.
5. Pesticide paradox: tests must be reviewed and updated.
6. Testing is context-dependent.
7. Absence of errors does not mean the product is useful.

### 4. What does "testing shows presence of defects, not absence" mean?

Even if tests pass, it does not prove there are no bugs. It only means the tested scenarios did not reveal defects.

Example:

> A regression suite can be green while an untested edge case is broken.

### 5. Why is exhaustive testing impossible?

Because real systems have too many combinations: inputs, user roles, environments, browsers, data states, integrations, timing, and edge cases.

Answer:

> Instead of testing everything, I prioritize by risk, business value, critical flows, and areas with recent changes.

### 6. What is defect clustering?

Defect clustering means many defects are usually concentrated in a smaller number of modules.

It is related to the Pareto principle: roughly 80% of defects may come from 20% of the system.

Practical use:

> I spend more testing effort on complex, frequently changed, historically unstable, or high-risk areas.

### 7. What is the pesticide paradox?

If the same tests are repeated without review, they stop finding new defects.

Answer:

> Regression tests should be updated as the product changes. I also add new edge cases after defects and remove or refactor obsolete tests.

### 8. What does "testing depends on context" mean?

The right testing approach depends on the product, risks, domain, team, deadlines, architecture, and users.

Example:

> Testing a banking transaction system, a legal document add-in, and an automotive inspection platform requires different priorities.

### 9. What is absence-of-errors fallacy?

A product can have no obvious bugs but still be useless if it does not solve the user's problem or does not match requirements.

Answer:

> Quality is not only technical correctness. It is also business fit, usability, reliability, and value.

## Requirement Analysis And Test Process

### 10. What do you do when you receive a new task?

Answer:

> I read the task and acceptance criteria, identify unclear points, ask PO/BA/developer questions, define test scope, analyze risks, prepare checklist or test cases, prepare data/environment, test positive/negative/boundary scenarios, report defects, and then decide what should be automated or added to regression.

### 11. How do you define test scope?

By understanding:

- changed functionality
- affected modules
- integrations
- user roles
- business-critical paths
- risk level
- regression impact
- time constraints

### 12. What questions do you ask if requirements are unclear?

Examples:

- What is the expected behavior?
- What is out of scope?
- Which user roles are affected?
- What are validation rules?
- What should happen for invalid data?
- Are there existing similar flows?
- What is the business priority?
- Should this be covered by automation?

### 13. What scenarios do you prepare?

- Positive scenarios
- Negative scenarios
- Boundary values
- Role/permission cases
- API validation
- Regression impact
- Integration cases
- Error handling
- Data consistency

## Automation Framework Architecture

### 14. How would you describe a good automation framework architecture?

Answer:

> I split responsibilities into layers: test/spec layer, fixtures/DI, flows, page objects, API clients, test data builders, infrastructure/configuration/logging, and utilities. Tests should orchestrate behavior, not contain business logic or low-level implementation details.

### 15. What belongs in the test/spec layer?

Test scenarios and orchestration.

It should:

- call flows/API clients/page objects
- contain clear assertions
- describe business behavior
- avoid duplicated setup and low-level details

It should not:

- contain complex business logic
- duplicate selectors
- create low-level HTTP logic directly

### 16. What is the fixture / DI layer?

It provides dependencies to tests: browser page, context, flow objects, API clients, configs, test users, data builders.

Playwright example:

> `test.extend()` can inject custom fixtures like `loginFlow`, `apiClient`, or `testDataBuilder`.

C# example:

> `Microsoft.Extensions.DependencyInjection` can register API clients, services, configs, and loggers.

### 17. What is a flow layer?

A flow is a facade/orchestrator that combines page objects and API clients into business-level actions.

Example:

> `inspectionFlow.approveDefect()` can use login page, inspection page, API setup, and report validation without exposing all details to the test.

### 18. What should be inside Page Object?

Page Object should include:

- locators/elements
- basic page actions
- page-specific waits
- small checks related to page state

It should not contain business logic.

### 19. Why should POM not contain business logic?

Because business flows often span multiple pages, APIs, roles, or data states. If business logic is inside page objects, page objects become too large and hard to maintain.

### 20. What is the API layer in a test framework?

API clients/gateways used to interact with backend services.

Used for:

- test data setup
- faster validation
- backend checks
- reducing UI-only setup
- checking system state after UI actions

### 21. What is a test data builder/factory?

A builder/factory creates test objects in a controlled and readable way.

Example:

> Instead of manually creating a complex inspection payload in every test, use `InspectionBuilder.withDefects(3).withStatus("New").build()`.

### 22. What belongs in infrastructure layer?

- configuration
- logging
- environment setup
- DI container
- secrets handling
- reporting
- CI integration

C# examples:

- `appsettings.json`
- Serilog / NLog
- `Microsoft.Extensions.DependencyInjection`

### 23. What belongs in utils/helpers?

Only generic reusable functions:

- retry helpers
- wait helpers
- date/time helpers
- file helpers
- assertion helpers

Avoid dumping business logic into utils.

## Framework Choice

### 24. How would you choose between Playwright, Selenium, and Cypress?

Answer:

> I would choose based on project context: application type, browser support, team stack, existing infrastructure, CI/CD needs, multi-tab/SSO requirements, API+UI needs, and long-term maintainability.

### 25. When would you choose Playwright?

Choose Playwright when:

- modern web app
- enterprise project
- C# / Python / JavaScript / TypeScript stack
- multi-tab, SSO, OAuth, email flows
- API + UI tests together
- strong parallel execution needed
- CI/CD pipeline is important
- browser context isolation matters

Interview wording:

> For a new modern framework, I would usually prefer Playwright unless there is a strong reason to use Selenium.

### 26. When would you choose Selenium?

Choose Selenium when:

- legacy project
- old browser support is required
- existing Selenium infrastructure exists
- team has strong Selenium experience
- Java/C# ecosystem is already built around Selenium
- migration cost is not justified

### 27. When would you choose Cypress?

Choose Cypress when:

- small or medium frontend-heavy project
- SPA only
- JavaScript team
- fast test development is more important than broad browser/process flexibility
- no complex multi-tab/SSO/OAuth scenarios

### 28. What would you choose for Aristek?

Careful answer:

> I would first clarify their current stack and client constraints. If this is a new modern web automation framework, I would consider Playwright because it handles modern UI, API integration, parallelization, tracing, and CI well. But if the client already has Selenium/C# infrastructure or expects Selenium specifically, I can work with that and focus on stable architecture.

## Flaky Tests

### 29. What is a flaky test?

A flaky test sometimes passes and sometimes fails without a relevant product change.

### 30. What do you do first when a test is flaky?

Answer:

> First I confirm it is really flaky: rerun, check reproducibility, compare environments, and inspect artifacts. Then I classify the root cause before fixing anything.

### 31. What artifacts do you check for flaky tests?

- stack trace
- screenshots
- video/trace
- browser console logs
- network logs
- API responses
- CI logs
- environment status
- test data
- recent code changes

### 32. How do you classify flaky test causes?

Categories:

- test issue: unstable locators, poor waits, bad assumptions
- application issue: race condition, async bug
- environment issue: CI, data, infrastructure, external service
- test data issue: shared data, dirty state
- parallelization issue: tests interfering with each other

### 33. What are common UI flaky causes?

- brittle locators
- missing explicit waits
- async loading
- animations
- test data dependency
- test order dependency
- parallel execution conflicts
- unstable external services

### 34. How do you fix flaky UI tests?

Fixes:

- use explicit waits for real app state
- stabilize locators with id/data-testid
- isolate test data
- remove dependencies between tests
- avoid sleeps
- mock/stub unstable services where appropriate
- move some checks from UI to API level

### 35. Are retries a good solution?

Retries are a temporary mitigation, not the real fix.

Answer:

> Retries can reduce pipeline noise temporarily, but I still track flaky tests, classify root cause, and fix or quarantine them.

### 36. When would you quarantine a flaky test?

When it is damaging pipeline trust and cannot be fixed immediately.

Answer:

> I would quarantine it transparently, create a ticket, keep visibility in reporting, and prioritize based on business importance.

## C# Basics

### 37. What access modifiers do you know in C#?

- `public`: accessible everywhere
- `private`: only inside current class
- `protected`: inside class and derived classes
- `internal`: inside current assembly
- `protected internal`: derived classes or same assembly
- `private protected`: derived classes inside same assembly

### 38. What is a class?

A class is a blueprint for objects. It can contain fields, properties, methods, constructors, and implementation.

Objects can be created with `new`.

### 39. What is an abstract class?

An abstract class cannot be instantiated. It can contain both implemented and abstract members, fields, and constructors.

Limitation:

> C# supports inheritance from only one class.

### 40. What is an interface?

An interface defines a contract: what members a type must implement.

Use:

> Interfaces are useful for abstraction, dependency injection, mocking, and swapping implementations.

### 41. Class vs abstract class vs interface?

Short version:

> Class is a concrete implementation. Abstract class is a base with shared implementation and abstract members. Interface is a contract. In automation frameworks I prefer interfaces/composition where I need flexibility, and base classes only when shared implementation is truly useful.

### 42. What is a static class?

A static class cannot be instantiated or inherited. All its members must be static.

Used for:

- stateless helper methods
- utility logic
- extension methods

Careful note:

> Overusing static helpers can make tests harder to configure and mock.

### 43. What are value types?

Value types store values directly and are copied by value.

Examples:

- `int`
- `double`
- `bool`
- `struct`
- `enum`

### 44. What are reference types?

Reference types store a reference to an object in memory. Assignment copies the reference, not the object.

Examples:

- `class`
- `string`
- `array`
- `object`

### 45. Stack vs heap?

Simple answer:

> Stack is used for method calls and local value data; heap stores objects. Reference variables can be on the stack, but the object they point to is on the heap.

### 46. How are objects deleted in C#?

C# has no manual `delete`. Garbage Collector finds unreachable objects and frees heap memory.

GC can:

- find unreachable objects
- mark them as garbage
- free memory
- compact heap

### 47. What does `using` do under the hood?

`using` ensures `Dispose()` is called.

Under the hood it is similar to:

> try/finally with Dispose in finally.

Use:

> For unmanaged resources or disposable objects like streams, DB connections, HTTP objects depending on usage.

### 48. What is `yield`?

`yield` is used for lazy/deferred generation of an `IEnumerable`.

- `yield return value`: returns next item
- `yield break`: stops iteration

### 49. What is `ref`?

`ref` passes a parameter by reference. The variable must be initialized before the method call.

### 50. What is `out`?

`out` passes a parameter by reference too, but the variable does not need to be initialized before the call. The method must assign it.

Typical example:

> `int.TryParse(stringValue, out var number)`

## C# Code Review Questions

### 51. What is wrong with `.Result` on async methods?

Problem:

- blocks thread
- can cause deadlocks
- breaks async flow

Better:

> Use `await`: `var books = await context.Books.ToListAsync();`

### 52. What is wrong with an async method without await?

If a method is marked `async` but has no `await`, it is misleading and may be unnecessary.

Fix:

- remove `async` if not needed
- or make the method truly async and await async operations

### 53. Why not throw generic `Exception`?

Generic exceptions are less clear and harder to handle.

Better:

- `ArgumentException`
- `InvalidOperationException`
- custom domain exception where useful

### 54. How to validate a username string?

Use:

> `string.IsNullOrWhiteSpace(userName)`

This handles:

- null
- empty string
- whitespace-only string

### 55. Why is creating `DbContext` inside a method bad?

Problems:

- tight coupling
- hard to test/mock
- no dependency injection
- harder lifetime management

Better:

> Inject `BookDbContext` through constructor.

### 56. Why is filtering after `ToListAsync()` inefficient?

Because it loads all records into memory and then filters in C#.

Better:

> Filter in database before materialization: `_context.Books.Where(...).ToListAsync()`.

### 57. What is wrong with `.IsFavourite == true`?

If `IsFavourite` is a bool, write:

> `.Where(b => b.IsFavourite)`

It is cleaner.

### 58. What naming issue is common in C#?

Public properties use PascalCase:

- `UserName`

Local variables and parameters use camelCase:

- `userName`

## IEnumerable, IQueryable, LINQ, EF

### 59. What is `IEnumerable`?

`IEnumerable` represents a sequence that can be iterated in memory.

In EF context:

> Once data is materialized, filtering happens in C# memory.

### 60. What is `IQueryable`?

`IQueryable` represents a query that can be translated by provider, for example into SQL.

In EF:

> Filtering can happen in the database before data is loaded.

### 61. IEnumerable vs IQueryable?

Short answer:

> `IEnumerable` works with in-memory collections. `IQueryable` builds a query that can be executed by a provider, often database-side.

### 62. What is Entity Framework?

Entity Framework is an ORM framework.

Careful wording:

> ORM is the mapping layer between object-oriented code and relational database. It is not the database itself.

## Collections

### 63. When use `List<T>`?

Use List when:

- order matters
- index access is needed
- simple iteration is enough
- duplicates are allowed

Search complexity:

> O(n)

### 64. When use `HashSet<T>`?

Use HashSet when:

- unique elements are needed
- fast existence checks are needed
- order is not important

### 65. When use `Dictionary<TKey, TValue>`?

Use Dictionary when:

- key-value mapping is needed
- fast lookup by key is needed
- cache/lookup table is needed

Average lookup:

> O(1)

### 66. What is `ConcurrentDictionary`?

A thread-safe dictionary for multithreaded scenarios.

Use:

> When multiple threads/tasks may read/write the dictionary concurrently.

## SQL / Database

### 67. What is INNER JOIN?

Returns only rows where there is a match in both tables.

### 68. What is LEFT JOIN?

Returns all rows from the left table and matching rows from the right table. If no match exists, right-side columns are NULL.

### 69. What is FULL OUTER JOIN?

Returns all rows from both tables. If one side has no match, missing columns are NULL.

### 70. How can SQL knowledge help AQA?

Answer:

> SQL helps verify backend state, prepare test data, investigate defects, check reports, and validate API/UI results against database data when appropriate.

## CI/CD

### 71. What triggers can start a pipeline?

- push to branch
- pull request to main
- manual trigger
- schedule
- tag/release

### 72. What are typical CI pipeline stages for .NET tests?

1. Checkout
2. Setup environment / install .NET SDK
3. Restore dependencies
4. Build
5. Run tests
6. Publish test results
7. Attach artifacts: screenshots, logs, videos, traces
8. Optional: Allure/Extent report
9. Optional: tagging, parallel execution, retries

### 73. What artifacts should test automation publish?

- TRX/test result files
- screenshots
- videos/traces
- logs
- API request/response snippets with secrets masked
- Allure/Extent reports
- environment/build metadata

### 74. How would you split tests in CI?

Answer:

> I would run fast smoke tests on PRs, broader regression on main or scheduled builds, and longer E2E suites nightly. Tests should be tagged by purpose: smoke, regression, API, UI, critical, slow.

### 75. How do retries fit into CI?

Retries can reduce temporary noise but should not hide problems.

Answer:

> I use retries only as a temporary mitigation and still track flaky tests separately.

## Aristek-Specific Practice Questions

### 76. If Aristek asks: "How would you build automation from scratch for our project?"

Answer:

> I would start with product risks and architecture. For an automotive inspection platform, I would identify critical workflows: inspection input, defect validation, approve/reject status, reporting, roles, and audit trail. Then I would build a layered framework: tests, fixtures/DI, flows, page objects, API clients, data builders, config/logging/reporting. I would prioritize API/integration checks for business rules and a smaller stable UI smoke/regression set for critical reviewer flows.

### 77. If they ask: "Why not automate everything through UI?"

Answer:

> UI tests are valuable for user confidence, but they are slower and more fragile. I prefer to validate business rules and state transitions at API/integration level, and keep UI tests for critical user journeys and visual/workflow confidence.

### 78. If they ask: "How would you test scanner/computer-vision related flows?"

Answer:

> I would clarify how scanner output is represented in the system: images, metadata, events, API payloads, or stored inspection entities. Then I would test valid/invalid input, delayed processing, duplicate scans, missing/corrupt files, defect status transitions, report correctness, and consistency between API and UI.

### 79. If they ask: "What would you clarify before choosing tools?"

Ask:

- Is there existing Selenium/Playwright infrastructure?
- Is the stack fixed by the client?
- Which language do they prefer for tests: C#, Python, TypeScript?
- What browsers must be supported?
- Is SSO/OAuth involved?
- How are test environments and test data managed?
- What CI system and reporting are expected?

### 80. If they ask: "How do you handle a failing pipeline?"

Answer:

> I first check whether it is product regression, test issue, environment issue, or data issue. I inspect logs, screenshots, traces, API responses, recent commits, and environment health. If it is a real regression, I report/block based on severity. If it is test flakiness, I classify root cause, fix it or quarantine with a ticket.

## Last-Minute Drill

### 81. One-minute answer: framework architecture

> Tests should be readable and business-focused. Low-level details go into page objects and API clients. Business flows go into flow/facade layer. Fixtures/DI provide dependencies. Test data builders create isolated data. Config/logging/reporting/CI are infrastructure. This keeps tests maintainable and reduces duplication.

### 82. One-minute answer: flaky tests

> I confirm the flake, collect artifacts, classify cause, fix root cause, and use quarantine/retries only as temporary measures. Common causes are unstable locators, bad waits, async timing, shared data, environment instability, and parallel conflicts.

### 83. One-minute answer: Playwright vs Selenium

> For a new modern project I usually prefer Playwright because of browser contexts, tracing, parallelization, API+UI support, and CI experience. Selenium is still valid for legacy/browser-compatibility or existing infrastructure. I would choose based on client context, not personal preference only.

### 84. One-minute answer: C# code review

> I would look for async blocking, wrong exception types, poor validation, inefficient DB queries, missing DI, naming issues, unnecessary boolean comparisons, poor separation of concerns, and testability problems.

### 85. One-minute answer: CI/CD

> Pipeline should checkout, setup SDK/dependencies, build, run tagged tests, publish reports/artifacts, and separate PR smoke from larger scheduled regression. The main goal is trusted, fast feedback.
