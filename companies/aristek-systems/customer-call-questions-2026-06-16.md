# Aristek Systems - Customer Call Questions

Date: 2026-06-16
Role: AQA Engineer (C#+Python)
Call type: expected customer / project-fit call
Use with: `second-stage-prep-2026-06-12.md`, `call-notes-2026-06-08.md`

## Call Goal

This call is likely less about a deep C# exam and more about customer fit:

- Can I communicate clearly in English?
- Do I understand the product and its quality risks?
- Can I explain how I would approach automation from scratch?
- Do I fit a remote client-facing team?
- Is my profile QA automation / SDET enough for their .NET-heavy environment?

Main positioning:

> I am a QA automation engineer first: 7+ years in QA/AQA, strong around UI/API automation, CI feedback, regression risk, failure investigation, and practical framework work. I can work close to developers and read/debug code when needed, but I should not position myself as a backend .NET feature developer.

## Product Summary

The client is a UK-based company building an automotive inspection and real-time quality-control platform.

The product combines:

- large physical scanners for cars after the manufacturing line;
- computer vision to inspect production / paint quality and detect defects;
- a web application where users review inspection results, validate defects, work with reports, and track quality data;
- microservices and cloud infrastructure around this workflow.

Known customers include large European automotive manufacturers such as Mercedes and BMW.

Good short wording:

> As I understand it, the product is an automotive inspection and quality-control platform. Large scanners inspect cars after production, computer vision helps detect paint or production defects, and users work with the results through a web application. From a QA automation perspective, it is interesting because it combines hardware input, computer vision output, web workflows, reports, permissions, and traceability.

## Things To Mention Naturally

Use this only if it fits the question. Do not lead with contract details.

> I am considering opportunities where I can work on a stable long-term project, ideally through my current incubator setup if possible. The team format also sounds comfortable: client communication in English, and Russian-speaking colleagues internally for smoother day-to-day communication and onboarding. But the main reason this project is interesting to me is the product itself: automotive quality inspection, scanners, computer vision, web workflows, and meaningful QA automation risks.

Shorter version:

> The incubator setup would be convenient for me, and Russian-speaking colleagues are a plus for internal communication. But the main point is the product: automotive inspection with scanners, computer vision, web workflows, and production-quality control sounds more interesting than a simple CRUD application.

## Questions They May Ask Me

### 1. Tell us about yourself and your relevant experience.

Answer:

> I am a QA Automation Engineer / SDET with 7+ years of experience in QA, test automation, UI/API testing, regression validation, defect investigation, and CI/CD quality workflows. My strongest area is making automation useful for the engineering team: stable checks, understandable framework structure, clear failure analysis, and actionable feedback instead of noisy test results.
>
> I have worked with Selenium/Playwright-oriented UI automation, API testing, SQL/log diagnostics, release support, and collaboration with developers. I also have experience helping teams move from manual-heavy testing to better automation practices.

### 2. Why are you interested in this project?

Answer:

> The project is interesting because it is not just a simple web application. It is connected to real production quality: automotive inspection, scanners, computer vision, defect review, reporting, and traceability. From a QA automation perspective, that creates meaningful risks and good areas for API, UI, integration, and regression automation.

### 3. Why do you think you fit this role?

Answer:

> I think I fit because this role needs someone who can combine QA thinking with engineering practice: understand product risk, build stable automation, work with APIs/UI/CI, investigate failures, and communicate clearly with developers and the client. That is exactly the area where my experience is strongest.

### 4. How would you start automation from scratch?

Answer:

> I would start with product risks and pipeline needs, not with tool choice. First I would clarify critical workflows, current manual regression, API boundaries, environments, test data, CI constraints, and reporting expectations.
>
> Then I would split the framework into clear layers: test/spec layer, page/component objects for UI, API clients, test data builders, configuration, assertions, reporting, and utilities. I would keep UI tests focused on critical user journeys and move as much validation as possible to API/integration level because it is faster and more stable.

Mention:

- smoke vs regression vs deeper scheduled checks;
- stable selectors and explicit waits;
- API setup and validation instead of doing everything through UI;
- screenshots, logs, request/response data, test data identifiers;
- tagging and parallel execution in CI.

### 5. What would you automate first for our product?

Answer:

> I would first identify the critical user and business workflows. For this product I would expect candidates such as inspection data intake, defect review, defect status changes, approve/reject flows, report generation, permissions, and audit/traceability. I would likely start with API-level checks for data transitions and contracts, plus a smaller UI smoke suite for the key reviewer workflow.

Possible first scenarios:

- user login and role-based access;
- inspection / report entity creation or loading;
- defect status transitions;
- approve / reject review flow;
- report generation and report metadata correctness;
- permissions for reviewer/admin/customer roles;
- audit trail or traceability checks;
- API contract checks around inspections, defects, and reports.

### 6. How do you decide what to automate?

Answer:

> I prioritize stable, repeated, business-critical flows where automation gives reliable feedback. Good candidates are regression-prone flows, high-risk integrations, smoke checks, API contracts, permissions, data validation, and workflows that are expensive to retest manually.
>
> I avoid automating unclear or frequently changing UI too early. For unclear requirements, I first use exploratory testing and examples to stabilize understanding, then automate the agreed behavior.

### 7. How do you handle flaky tests?

Answer:

> I do not treat rerun as the real fix. First I classify the failure: product bug, test bug, environment issue, test data issue, timing/synchronization issue, external dependency, or infrastructure issue. Then I look at artifacts: logs, screenshots, network/API responses, timestamps, environment health, and recent code changes.
>
> Common fixes are better waits based on real application state, stable selectors, isolated test data, cleanup, avoiding test order dependency, controlling unstable dependencies where appropriate, and moving fragile UI validation to API level.

### 8. What makes a good UI automation test?

Answer:

> A good UI test validates meaningful user behavior, uses stable locators, waits for real application conditions, avoids sleeps, has clear assertions, is independent from other tests, creates or controls its own data where possible, and gives enough evidence when it fails. It should not duplicate implementation details or depend on layout details that users do not care about.

### 9. How would you test REST / GraphQL APIs?

Answer:

> For REST I would cover status codes, response schema, required fields, business rules, authorization, validation errors, idempotency where relevant, pagination/filtering/sorting, negative cases, and persistence or downstream effects.
>
> For GraphQL I would test queries and mutations separately, validate schema expectations, required/optional fields, nested objects, authorization, and error handling. GraphQL often returns HTTP 200 with errors in the response body, so assertions must check both the `errors` field and the business payload.

### 10. How would you test microservices?

Answer:

> I would split it into contract testing, integration testing, and a smaller number of end-to-end tests. Contract tests verify service agreements. Integration tests check real interactions between selected services and data stores or message brokers where needed. End-to-end tests should cover only the most critical full workflows.
>
> I would pay attention to async processing, eventual consistency, retries, timeouts, observability, test data, environment stability, and correlation IDs for failure investigation.

### 11. How strong are you with C#/.NET?

Answer:

> My profile is QA automation first, not backend feature ownership. I can work with automation code, OOP, typed languages, test runners, APIs, logs, and CI. If the role expects framework/API/UI automation around a .NET product, that fits me. If it expects full backend feature development, I would want to clarify that expectation.

### 12. What C# / OOP concepts are important for automation?

Answer:

> For automation, I need practical OOP: classes, interfaces, composition, inheritance when useful, encapsulation, generics, exceptions, async/await, LINQ basics, dependency injection concepts, and clean structure. I care less about abstract theory and more about readable, maintainable test code.

### 13. How would you integrate tests into CI/CD?

Answer:

> I would define suites by purpose: PR smoke checks, main-branch regression, scheduled deeper runs, and environment-specific checks if needed. The pipeline should install dependencies, prepare config/secrets safely, run tests with tags, publish reports, and keep artifacts like screenshots, logs, and API traces.
>
> The important point is that the pipeline result must be trusted. If tests are flaky or too slow, developers stop respecting them. I would start with a smaller reliable smoke set and expand coverage with clear ownership.

### 14. How do you work with developers, PO, and a distributed team?

Answer:

> I prefer short feedback loops: clarify acceptance criteria early, discuss testability, agree what should be covered at unit/API/UI level, and make failures easy to reproduce. With PO or client stakeholders, I try to ask concrete questions using examples, especially around edge cases and business rules.

### 15. How do you use AI in testing?

Answer:

> I use AI as an engineering assistant for test ideas, edge cases, draft test cases, code review suggestions, log analysis, helper scripts, and refactoring ideas. I do not treat it as an authority. I validate the output and follow client privacy/security rules, especially for code, logs, and production-like data.

### 16. Why QA automation instead of DevOps?

Answer:

> I like DevOps because it is also automation, and that experience helps me with CI, environments, logs, and infrastructure thinking. But QA automation fits me better long-term because it is closer to product behavior and user workflows. I enjoy selectors, API behavior, test design, failure analysis, and seeing the direct quality impact.

### 17. What do you need from us to be productive?

Answer:

> Clear priorities, access to environments/logs/API documentation, stable test data strategy, CI visibility, and a way to discuss testability with developers early. I can work independently, but automation becomes much better when quality is part of the development workflow.

### 18. Do you have experience with English-speaking teams?

Answer:

> Yes. Most of my professional experience has been with English-speaking teams or clients. I am comfortable working in English in daily meetings, technical discussions, written communication, and async collaboration. It can take a short time to adapt to a new team’s vocabulary and domain, but that is normal and I usually adapt quickly.

## Possible Questions From Oris96 Notes

These are likely question formulations that match the answers from Oris96's prep notes.

### Testing Theory

- What is software testing?
- What is the main goal of testing?
- What are the 7 principles of testing?
- What does "testing shows presence of defects, not absence" mean?
- Why is exhaustive testing impossible?
- What is defect clustering?
- How is defect clustering related to the Pareto principle?
- What is the pesticide paradox?
- What does "testing depends on context" mean?
- What is the absence-of-errors fallacy?
- What steps do you follow when you receive a new task?
- How do you analyze requirements?
- What do you do when acceptance criteria are unclear?
- How do you define test scope?
- What types of scenarios do you prepare for a feature?
- How do you decide whether a scenario should be automated?

### Automation Framework Architecture

- How would you design an automation framework from scratch?
- What layers would you include in a Playwright + TypeScript framework?
- What should be in the test/spec layer?
- What is the role of fixtures or dependency injection in an automation framework?
- How does `test.extend()` work in Playwright conceptually?
- What is a flow layer?
- What is the difference between a flow and a page object?
- What should be inside a Page Object?
- Why should Page Objects not contain business logic?
- What is the API layer in an automation framework?
- Why use API clients in UI automation?
- What is a test data builder or factory?
- What belongs to the infrastructure/configuration layer?
- What kind of utilities/helpers are acceptable in a framework?
- How do you avoid turning helpers into a messy shared utilities folder?

### Framework Choice

- How would you choose an automation framework for a new project?
- When would you choose Playwright?
- When would you choose Selenium?
- When would you choose Cypress?
- What are Playwright's advantages for enterprise projects?
- Why might Selenium still be a good choice?
- Why might Cypress be enough for a smaller frontend-only project?
- What tool would you choose for a project with SSO, multi-tab flows, API + UI tests, and CI/CD?
- What tool would you choose for a legacy project with old browser requirements?
- What factors matter more than personal preference when choosing a framework?

### Flaky Tests

- What is a flaky test?
- How do you confirm that a test is flaky?
- What artifacts do you check when a test fails intermittently?
- How do you classify flaky test root causes?
- What are typical reasons for UI test flakiness?
- How do you fix flaky UI tests?
- When would you quarantine or disable a flaky test?
- Are retries a good solution for flaky tests?
- How would you handle flaky tests in CI/CD?
- How do you prioritize flaky test fixes?
- What long-term process helps reduce flaky tests?

### C# Basics

- What access modifiers exist in C#?
- What is the difference between `public`, `private`, `protected`, and `internal`?
- What is `protected internal`?
- What is `private protected`?
- What is a class?
- What is an abstract class?
- What is an interface?
- What is the difference between class, abstract class, and interface?
- When would you use an interface instead of an abstract class?
- What is the difference between value types and reference types?
- Give examples of value types and reference types.
- Where are value types and reference types stored?
- What is stack and heap in simple terms?
- How are objects deleted in C#?
- What is Garbage Collector?
- What does `using` do under the hood?
- What is `IDisposable`?
- What is a static class?
- When would you use a static class?
- What are extension methods?
- What is `yield`?
- What is deferred execution?
- What is the difference between `yield return` and `yield break`?
- What is the difference between `ref` and `out`?

### Async / Code Review

- What issues do you see in this C# code?
- Why is `.Result` dangerous on async calls?
- What is blocking async?
- How can `.Result` cause deadlocks?
- How would you fix `ToListAsync().Result`?
- What is wrong with an async-style method that does not use `await`?
- When should a method return `Task.FromResult`?
- Why is throwing `new Exception()` a bad practice?
- What exception type would you use for invalid method arguments?
- How would you validate a nullable or whitespace string?
- Why is `string.IsNullOrWhiteSpace()` better here?
- What is wrong with creating `new BookDbContext()` inside a method?
- Why is dependency injection useful?
- How would you make this code more testable?
- What is wrong with loading all books into memory before filtering?
- Why should filtering be done at the database level?
- How would you rewrite this LINQ query?
- What is wrong with `IsFavourite == true`?
- What naming issues do you see in the code?

### LINQ / Collections / Database

- What is the difference between `IEnumerable` and `IQueryable`?
- When does LINQ execute in memory?
- When does LINQ become SQL?
- Why is `IQueryable` important for Entity Framework queries?
- What is Entity Framework?
- Is Entity Framework a database?
- What is an ORM?
- What is the difference between `List<T>`, `HashSet<T>`, and `Dictionary<TKey, TValue>`?
- When would you use a List?
- When would you use a HashSet?
- When would you use a Dictionary?
- What is the average lookup complexity of a Dictionary?
- What is the search complexity of a List?
- What is `ConcurrentDictionary`?
- When do you need thread-safe collections?
- What is an INNER JOIN?
- What is a LEFT JOIN?
- What is a FULL OUTER JOIN?

### CI/CD

- How would you build a CI pipeline for automated tests?
- What triggers can start a pipeline?
- What stages should a test pipeline include?
- What is usually done during checkout/setup/build/test/reporting stages?
- How would you publish test results in GitHub Actions?
- What artifacts should UI tests publish?
- How would you handle screenshots, videos, logs, and reports?
- How would you split smoke and regression tests in CI?
- How would you use tags in a test pipeline?
- When would you run tests on schedule instead of every pull request?
- How would you handle flaky tests in the pipeline?
- What environment variables or secrets are needed for test runs?

## C# Code Review Drill

This is the likely code-review task from Oris96's notes. The interviewer may show a small service method and ask:

> What problems do you see in this code, and how would you improve it?

Do not try to find everything at once. Use this order:

1. Validation and exceptions.
2. Async/await problems.
3. Database/query efficiency.
4. Dependency injection and testability.
5. Naming/readability.
6. Optional: interface/return type/design improvements.

### Short Answer Structure

Start with this:

> I see several issues here: blocking async with `.Result`, creating `DbContext` inside the method instead of injecting it, loading all books into memory before filtering, weak validation, too generic exception type, and some naming/style issues. I would make the method truly async, inject the context, filter at database level, use `string.IsNullOrWhiteSpace`, and throw a more specific exception.

Then go issue by issue.

### Main Issues To Mention

1. Blocking async:

Problem:

> `context.Books.ToListAsync().Result` blocks the current thread and can cause deadlocks or thread starvation. It also breaks the async flow.

Fix:

> Use `await`: `await context.Books.Where(...).ToListAsync()`.

2. Method is not truly async:

Problem:

> The method returns `Task<List<Book>>`, but it does not use `await`; it wraps the final result with `Task.FromResult`.

Fix:

> Mark it `async` and await the database query.

3. Inefficient filtering:

Problem:

> The code loads all books first and filters in memory. That is inefficient and can be dangerous for a large table.

Fix:

> Filter in the database with `Where` before `ToListAsync`.

4. DbContext creation inside method:

Problem:

> `new BookDbContext()` inside the method creates tight coupling and makes the code hard to test or mock.

Fix:

> Inject `BookDbContext` through the constructor.

5. Validation:

Problem:

> `UserName is null || UserName.All(char.IsWhiteSpace)` works partly, but `string.IsNullOrWhiteSpace(UserName)` is clearer and safer.

Fix:

> Use `string.IsNullOrWhiteSpace(userName)`.

6. Generic exception:

Problem:

> `throw new Exception(...)` is too generic.

Fix:

> Use `ArgumentException` or `ArgumentNullException`, depending on the exact validation rule.

7. Naming:

Problem:

> Method parameter `UserName` should be camelCase: `userName`. Property `Book.userName` should be PascalCase: `UserName`.

8. Unnecessary boolean comparison:

Problem:

> `_.IsFavourite == true` is redundant.

Fix:

> Use `b.IsFavourite`.

9. Lambda readability:

Problem:

> `_` as a lambda parameter is usually used for ignored values. Here the value is used, so a meaningful name is better.

Fix:

> Use `b => b.UserName == userName && b.IsFavourite`.

10. Interface naming:

Problem:

> `UserWorkerInterface` is not idiomatic C#.

Fix:

> Prefer `IUserWorker`.

### Improved Code Example

Use this as the mental target. Exact syntax may vary depending on EF setup.

```csharp
public interface IUserWorker
{
    Task<List<Book>> FavouriteBooksAsync(string? userName);
}

public class UserWorker : IUserWorker
{
    private readonly BookDbContext _context;

    public UserWorker(BookDbContext context)
    {
        _context = context;
    }

    public async Task<List<Book>> FavouriteBooksAsync(string? userName)
    {
        if (string.IsNullOrWhiteSpace(userName))
        {
            throw new ArgumentException("User name is incorrect", nameof(userName));
        }

        return await _context.Books
            .Where(b => b.UserName == userName && b.IsFavourite)
            .ToListAsync();
    }
}
```

If they ask about case sensitivity:

> I would clarify whether user names are case-sensitive in the product. If not, I would normalize or use a database-side case-insensitive comparison according to the DB/provider rules.

If they ask about cancellation:

> In production code I would consider adding a `CancellationToken`, especially for database calls in web/API services.

Example:

```csharp
public async Task<List<Book>> FavouriteBooksAsync(
    string? userName,
    CancellationToken cancellationToken = default)
{
    if (string.IsNullOrWhiteSpace(userName))
    {
        throw new ArgumentException("User name is incorrect", nameof(userName));
    }

    return await _context.Books
        .Where(b => b.UserName == userName && b.IsFavourite)
        .ToListAsync(cancellationToken);
}
```

### Direct Database Work

If they mention "working directly with the database", connect it to two ideas:

1. In application code, use the ORM correctly so filtering is executed by the database, not in memory.
2. In test automation, direct DB work can be useful for test data setup, cleanup, and verification, but it should be used carefully.

Good wording:

> Here I would move filtering to the database level. Instead of calling `ToListAsync()` first and then filtering in C#, I would apply `Where` to the query and then call `ToListAsync()`. With Entity Framework this allows the provider to translate the LINQ expression into SQL, so the database returns only the needed records.

For test automation:

> In automation, direct database access can be useful for preparing test data, cleaning test data, and verifying backend state after UI/API actions. But I would not use DB checks to replace user-facing validation completely. For critical flows, I would combine API/UI checks with DB validation only where it gives extra confidence or makes setup faster.

Example phrases:

- Use DB directly to create or reset test data before a test.
- Use DB validation to check persisted state after an action.
- Avoid overusing DB assertions for everything, because tests can become too coupled to implementation details.
- Prefer API setup if the API is stable and represents real product behavior; use DB setup when API setup is unavailable, too slow, or too complex.

### Simple Spoken Version

Use this if nervous:

> First I would fix the async part. The code calls `ToListAsync().Result`, which blocks async execution. I would use `await` instead. Second, I would not create `BookDbContext` inside the method; I would inject it through the constructor, because it is better for testability and dependency management. Third, I would not load all books and then filter in memory. I would apply `Where` before `ToListAsync`, so filtering is done by the database. Also I would use `string.IsNullOrWhiteSpace`, throw `ArgumentException`, fix naming, and replace `IsFavourite == true` with just `IsFavourite`.

### Very Short Version

> The biggest problems are blocking async, in-memory filtering, and lack of DI. I would inject the context, make the method truly async, filter in the database, improve validation and exception type, and clean up naming.

### If They Ask Why This Matters For QA Automation

Answer:

> Even as an AQA, I need to read and review automation/framework code. These issues matter because they affect stability, performance, testability, and CI reliability. Blocking async or loading too much data can create slow or flaky tests. Lack of DI makes code harder to mock and maintain.

## Questions I Should Ask The Company / Customer

Choose 6-8 depending on time. Do not ask all of them mechanically.

### Product And Risk

1. What are the main quality risks in the product right now?

Why ask:

> This shows that I think in terms of business and product risk, not only test scripts.

2. What are the most critical user workflows for the first automation coverage?

Follow-up examples:

> Is it scanner data ingestion, defect review, report generation, customer approval, permissions, or something else?

3. What are the biggest current pain points?

Possible options:

> Lack of automation coverage, flaky tests, slow regression, environment instability, unclear requirements, test data, or CI signal quality.

4. What would success look like for this AQA after the first 1-2 months?

Why ask:

> This clarifies expectations and gives me a concrete target for onboarding.

### Automation Scope

5. What is currently covered by automated tests, and what would you expect the new AQA to build first?

6. Is the automation framework expected to be built from scratch, or is there an existing codebase to extend?

7. What is the expected balance between UI automation, API/integration tests, and manual/exploratory testing?

8. Are there preferred tools or frameworks already chosen for UI/API testing and reporting?

Possible follow-up:

> For example Selenium/Playwright, xUnit/NUnit, Allure or another reporting tool.

### Technical Setup

9. How are test environments organized today?

Follow-up:

> Are they stable enough for automated regression? Can QA reset or prepare data independently?

10. How does test data work?

Follow-up:

> Do we create test data through API, database seeds, existing fixtures, or manually prepared data?

11. How are CI/CD pipelines organized now?

Follow-up:

> Which checks should block pull requests or releases, and which checks run on schedule?

12. What level of observability is available for QA investigation?

Follow-up:

> Logs, correlation IDs, API traces, monitoring dashboards, browser/network traces, access to cloud logs.

### Role Expectations

13. How much C#/.NET backend work is expected from the AQA role?

Good phrasing:

> Is the expectation mainly automation/framework work around a .NET product, or also production backend feature development?

Why ask:

> This is important because my strongest profile is QA automation/SDET, not backend feature ownership.

14. How closely does QA work with developers on testability and automation design?

15. Who defines automation priorities: QA, PO, developers, or the team together?

16. Will this AQA be the only automation person on the new team?

Follow-up:

> If yes, is there support from existing QA/AQA people in the wider organization during onboarding?

### Team And Communication

17. How will communication work between the client PO, Aristek team, and customer-side engineers?

18. What is the usual meeting rhythm for the team?

Follow-up:

> Daily, planning, refinement, demo, retro, async updates.

19. What documentation or product knowledge is available for onboarding?

20. Are there domain experts available for questions about scanner/computer-vision behavior and inspection rules?

### AI And Security

21. Are there any restrictions around AI tools, source code, logs, screenshots, or customer data?

Why ask:

> This is a strong and relevant question because Aristek promotes AI internally, but the customer may have stricter security rules.

22. If AI tools are allowed, what usage is acceptable?

Examples:

> Test ideas, code review suggestions, test case drafts, log analysis, local-only usage, no production data, no confidential data.

## Questions To Avoid Or Leave For Recruiter

Avoid asking the customer:

- salary/rate/benefits/contract details;
- vacation/sick days;
- whether they can teach C#;
- questions that sound like fear of responsibility;
- too many questions about Russian-speaking colleagues.

Better to ask Aristek recruiter:

- incubator / B2B paperwork;
- contract terms;
- exact start date;
- benefits;
- administrative flow.

## Strong Closing

If the call ends with a chance to summarize:

> Thank you, this gives me a clearer picture of the project. From what I understand, the role needs someone who can build practical automation around product risk, API/UI workflows, CI feedback, and failure investigation. That matches my strongest experience. I would be especially interested in clarifying the first automation priorities and the expected balance between framework work, API/UI tests, and any deeper .NET involvement.

Shorter closing:

> Thank you, the product sounds interesting and the automation scope looks close to my experience. I especially like that it is a real production-quality domain with scanner data, computer vision, web workflows, and reporting. I would be glad to continue.
