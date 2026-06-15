# TD SYNNEX - Technical Interview Prep

Date: 2026-06-15
Role: Senior Test Automation Engineer (.NET)
Interview: 45 minutes with Tugay Taskin

## Main Positioning

I am a Senior QA Automation Engineer / SDET with 7+ years of experience in UI/API automation, CI/CD feedback, framework improvement, defect diagnostics, and environment-aware testing. My strongest value is building maintainable automation that gives useful release signal and makes failures easier to analyze.

Do not position yourself as a backend .NET developer. Position yourself as a senior automation engineer with C#/.NET automation foundation and strong framework/CI/API thinking.

## 60-Second Intro

I am a Senior QA Automation Engineer / SDET with 7+ years of experience across UI and API automation, CI/CD-integrated testing, framework improvement, defect investigation, and environment-aware quality work.

In my recent work at Definely, I improved and extended an automation framework: coverage grew from around 117 to almost 200 tests without increasing runtime, and logs were reduced from about 1.5 GB to around 11 MB per run. Earlier, at Leapwork, I worked deeply with Azure DevOps, CI/CD, environments, diagnostics, Docker-related support, and automation tooling.

My strongest value is building maintainable automation that gives useful release signal, not just increasing test count.

## Likely Technical Questions And Answers

### 1. How would you design a test automation framework?

Answer:

I would design it in layers: test/spec layer, fixtures or dependency injection, page objects/components for UI, API clients, test data builders, configuration, reporting, and utilities.

Tests should describe business behavior and orchestrate actions. Page objects should contain locators and page-level actions, but not complex business logic. API clients should be used for setup, backend validation, and faster checks where UI is not necessary.

Example structure:

    tests/
      smoke/
      regression/
    pages/
      LoginPage.cs
      OrdersPage.cs
    api/
      OrdersApiClient.cs
    data/
      OrderBuilder.cs
    fixtures/
      TestFixture.cs
    config/
      TestSettings.cs
    reporting/
      Allure / TRX / screenshots / logs

### 2. What makes a good UI automation test?

Answer:

A good UI test validates meaningful user behavior, uses stable locators, waits for real application conditions, avoids sleeps, has clear assertions, is independent from other tests, controls its own data where possible, and produces useful failure artifacts.

Bad:

    Thread.Sleep(5000);
    driver.FindElement(By.XPath("//div[3]/button")).Click();

Better:

    var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
    var submitButton = wait.Until(d =>
        d.FindElement(By.CssSelector("[data-testid='submit-order']")));

    submitButton.Click();

### 3. How do you handle flaky tests?

Answer:

I first classify the failure: product bug, test bug, environment issue, test data issue, timing issue, external dependency, or infrastructure issue. Then I check artifacts: screenshots, logs, stack trace, network/API responses, timestamps, CI state, and recent changes.

Retries are only temporary. The real fix is root cause: stable waits, better locators, isolated data, cleanup, removing test order dependency, or moving fragile checks from UI to API.

### 4. How do you test APIs?

Answer:

I verify status codes, schema, required fields, business rules, authorization, validation errors, negative cases, data persistence, and downstream effects. I separate API clients from test logic and use API setup to make UI tests faster and less brittle.

Example:

    public class OrdersApiClient
    {
        private readonly HttpClient _client;

        public OrdersApiClient(HttpClient client)
        {
            _client = client;
        }

        public async Task<OrderDto> CreateOrderAsync(CreateOrderRequest request)
        {
            var response = await _client.PostAsJsonAsync("/api/orders", request);
            response.EnsureSuccessStatusCode();

            var order = await response.Content.ReadFromJsonAsync<OrderDto>();
            return order ?? throw new InvalidOperationException("Empty order response");
        }
    }

### 5. How would you integrate tests into CI/CD?

Answer:

I would split tests by purpose: PR smoke checks, main branch regression, and scheduled deeper runs. The pipeline should publish reports and artifacts: screenshots, logs, videos, API traces, and test result files.

The most important thing is trust. If tests are flaky or too slow, developers stop respecting the pipeline.

Example GitHub Actions shape:

    name: tests

    on:
      pull_request:
      push:
        branches: [main]
      schedule:
        - cron: "0 2 * * *"

    jobs:
      test:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - uses: actions/setup-dotnet@v4
            with:
              dotnet-version: "8.0.x"
          - run: dotnet restore
          - run: dotnet build --no-restore
          - run: dotnet test --no-build --logger "trx"
          - uses: actions/upload-artifact@v4
            if: always()
            with:
              name: test-results
              path: "**/*.trx"

## C# Code Review Drill

Likely question:

What problems do you see in this code and how would you improve it?

Bad code pattern:

    public Task<List<Book>> FavouriteBooksAsync(string? UserName)
    {
        if (UserName is null || UserName.All(char.IsWhiteSpace))
        {
            throw new Exception("User name is incorrect");
        }

        BookDbContext context = new BookDbContext();

        var books = context.Books.ToListAsync().Result;

        var favouriteBooks = books
            .Where(_ => _.userName == UserName && _.IsFavourite == true)
            .ToList();

        return Task.FromResult(favouriteBooks);
    }

What to say:

The biggest problems are blocking async, in-memory filtering, and lack of dependency injection. I would inject the context, make the method truly async, filter at database level, improve validation and exception type, and clean up naming.

Issues:

- .Result blocks async execution and can cause deadlocks/thread blocking.
- Task.FromResult hides that the method is not truly async.
- new BookDbContext() inside the method creates tight coupling and hurts testability.
- ToListAsync() before Where loads all records into memory.
- throw new Exception() is too generic.
- UserName.All(char.IsWhiteSpace) should be string.IsNullOrWhiteSpace.
- UserName parameter should be userName.
- userName property should be UserName.
- _ should not be used as a meaningful lambda variable.
- IsFavourite == true should be IsFavourite.

Better version:

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

Direct database work:

I would move filtering to the database level. Instead of loading all records into memory and filtering in C#, I would apply Where before ToListAsync. Entity Framework can translate that into SQL, so the database returns only the needed records.

Bad:

    var books = await _context.Books.ToListAsync();

    var favouriteBooks = books
        .Where(b => b.UserName == userName && b.IsFavourite)
        .ToList();

Better:

    var favouriteBooks = await _context.Books
        .Where(b => b.UserName == userName && b.IsFavourite)
        .ToListAsync();

For QA automation:

Direct database access can be useful for test data setup, cleanup, and backend state verification. But I would use it carefully. API setup is often closer to real product behavior, while database setup is useful when UI/API setup is too slow, unavailable, or too complex.

## C# Quick Questions

### IEnumerable vs IQueryable

IEnumerable works in memory. If data is already loaded, LINQ filtering happens in C#.

IQueryable represents a query that can be translated by a provider, for example Entity Framework translating LINQ into SQL. For database filtering, IQueryable is important because filtering should happen in the database, not after loading all records into memory.

### Interface vs abstract class

An interface defines a contract. A class can implement multiple interfaces. An abstract class can contain shared implementation and state, but C# allows inheritance from only one class.

In automation, I usually prefer interfaces/composition for swappable services, drivers, API clients, and easier testing.

### Value type vs reference type

Value types store the value directly and assignment creates a copy. Examples: int, bool, struct, enum.

Reference types store a reference to an object in heap. Assignment copies the reference, not the object. Examples: class, string, array, object.

### using / IDisposable

using ensures Dispose is called even if an exception happens. Under the hood it is similar to try/finally. It is used for resources like streams, database connections, HTTP-related resources, or anything implementing IDisposable.

### List vs Dictionary vs HashSet

List is ordered and good for iteration; search is O(n).

Dictionary stores key-value pairs and gives average O(1) lookup by key.

HashSet stores unique values and is useful when uniqueness and fast contains checks matter.

## Stories To Reuse

### Definely C#/FlaUI framework

At Definely, the automation framework had stability and maintainability issues. There were too many static waits, large logs, and room to increase coverage.

I worked on improving the framework structure and execution signal: removed unnecessary waits, replaced static sleeps with condition-based waits, improved logging, and extended coverage.

As a result, the test suite grew from around 117 to almost 200 tests without increasing runtime, and logs were reduced from about 1.5 GB to around 11 MB per run. That made failures easier to investigate and the pipeline signal more useful.

### API automation

For newer or unstable API calls, we could first use Postman/Newman to validate behavior quickly. Once flows became stable, they could be moved into automated tests in the C#/NUnit-style project. API setup and backend validation helped reduce UI-heavy validation time and made regression faster.

### Azure DevOps / CI/CD

At Leapwork, I worked around Azure DevOps pipelines, virtual machines, environment configuration, Docker/Docker Compose support, logs, diagnostics, and release support. That helps me understand not only test code, but also why tests fail in CI and how to make failure evidence useful.

## Questions To Ask Them

Pick 3-5.

1. What is the current .NET automation stack: NUnit, xUnit, Selenium, Playwright, RestSharp, Azure DevOps?
2. Is the main challenge framework maintenance, new coverage, flaky tests, CI speed, or test data?
3. How much backend/API validation is expected compared with UI automation?
4. How are test data setup and cleanup handled today?
5. What reports/artifacts do developers use when automated tests fail?
6. What would you expect this person to improve in the first 2-3 months?
7. Based on our discussion, do you see any gaps in my profile that I should clarify?

## Closing

Thank you, this sounds close to the kind of role I am looking for: senior automation work, C#/.NET direction, CI/CD feedback, and improving test reliability. I would be glad to continue to the next stage.
