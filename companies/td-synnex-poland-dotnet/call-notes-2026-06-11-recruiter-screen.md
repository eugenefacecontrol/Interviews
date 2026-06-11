# TD SYNNEX Poland - Recruiter Screen Notes - 2026-06-11

## Outcome

- Recruiter screen completed.
- Recruiter plans to move Yauheni to the next step with hiring manager Tugay.
- Next step: 45-minute video call with Tugay.
- Scheduling: recruiter will send slots. Publicly visible next slot was around Monday 2026-06-22, but recruiter said she would ask Tugay for earlier availability.

## Role Confirmed

- Role: Senior Test Automation Engineer focused on C#/.NET.
- There is a second open QA role focused more on Playwright.
- This role is more hands-on coding and focused on C#/.NET.

## Company / Product Context

- TD SYNNEX is a global IT distributor/provider in a B2B2B2C model:
  - vendor -> TD SYNNEX -> reseller -> final customer.
- Business covers IT-related hardware/software/services.
- The role contributes to improving software quality across modern web applications and services.

## Responsibilities Mentioned

- Design and scale test automation frameworks using mainly C#/.NET.
- Build and maintain automation frameworks for web and API testing.
- Develop automated tests for web apps and APIs.
- Contribute to CI/CD pipelines and continuous testing.
- Work with QA teams and developers in an agile environment.
- Some exposure to AI, because TD SYNNEX is expanding AI usage across IT teams; AI is not the main role focus.

## Team

- Large QA/digital agile engineering structure.
- The specific team is about 6 people; most are based in India, hiring manager is based in Prague.
- Poland has a large data center of excellence with 30+ people: data scientists, data engineers, software engineers.
- Wider structure includes team leads in Prague, Netherlands, and India.
- Two big QA teams were mentioned:
  - one around 12 people,
  - another around 7 people.
- They are hiring one person for Playwright and one person for .NET/C#.

## Work Model / Benefits

- Hybrid model: 2-3 days per week in the office.
- Office: Warsaw, close to the airport.
- Benefits mentioned:
  - glasses refund,
  - holiday funds,
  - health insurance,
  - life insurance,
  - MultiSport card.

## Technical Topics Discussed

### C# / FlaUI / framework improvement

Yauheni described current Definely work:

- Initially worked with C# and FlaUI-style framework.
- Framework had 117 tests and was expanded to almost 200 without increasing runtime.
- Removed unnecessary waits and static sleeps.
- Replaced static waits with locator/element-based waits.
- Reduced debug logging from around 1.5 GB to 11 MB per run.
- Later moved from C#/FlaUI to TypeScript/Playwright because the product/project direction changed.
- Built a Playwright/TypeScript framework from scratch with a colleague.
- Then company moved part of automation enablement toward Power Automate so manual testers could learn automation quickly.
- Power Automate helped cover about 150 cases in 3 months with manual testers involved, but it created supportability and hidden-code bottlenecks.
- This is a key reason for wanting to return to code-based automation.

### API automation

- API tests were partly in the same C# test project using regular REST API calls and NUnit/unit-test style execution.
- New/unstable API calls were first added in Postman.
- Postman collections were run via Newman.
- Once an API became stable, it could be moved into C# automated tests.

### Azure DevOps / CI/CD

- Yauheni described strong experience from Leapwork:
  - virtual machines,
  - application configuration,
  - Docker / Docker Compose,
  - CI/CD pipelines,
  - test pipeline integration,
  - Grafana/K9s/diagnostics context.
- Recruiter mentioned TD SYNNEX mostly uses Azure, though they are multi-cloud.

### AI

- Recruiter said AI exposure exists in the role, not as the main focus.
- Yauheni emphasized he likes that the company is not against AI and sees AI as an extension/tool, not just a trend.
- Recruiter said she would mention this to the hiring manager.

## Availability / Salary

- Availability: ASAP / within 1-2 weeks.
- No vacation planned for the next several months.
- Salary expectation discussed: 18,000-20,000 PLN per month.

## Recruiter Guidance / Contact

- Recruiter is based in Barcelona and uses a Spanish phone number.
- For questions, email is preferred over LinkedIn because LinkedIn messages can be missed.
- If a call is needed, email with the question or proposed call times; recruiter can call back.

## Positive Signals

- Recruiter praised the CV as complete.
- Recruiter did not ask generic CV walkthrough and focused on role-relevant projects.
- The C#/.NET framework improvement story landed well.
- API automation and Azure DevOps/CI/CD background were relevant.
- Recruiter moved toward next step with hiring manager instead of screening out.
- AI interest was explicitly noted as positive and recruiter said she would mention it to the hiring manager.

## Risks / Follow-Up Prep

- Hybrid Warsaw 2-3 days/week could be a practical constraint from Krakow.
- Next call will likely probe technical depth in:
  - C#/.NET automation,
  - Playwright vs C# scope,
  - API automation architecture,
  - Azure DevOps pipelines,
  - framework design,
  - waits/flakiness/logging improvements,
  - AI usage in QA.
- Be careful with wording around FlaUI/FlyUI; clarify the exact framework/tool name if asked.
- Keep the Power Automate story concise: it was useful for fast enablement, but the desired direction is maintainable code-based automation.
- Keep personal automation examples short; they show genuine automation interest, but the next call should prioritize enterprise test automation examples.

## Next Preparation Focus

1. Prepare a concise C#/.NET automation story:
   - problem,
   - architecture,
   - waits/flakiness changes,
   - API coverage,
   - logs reduction,
   - result.
2. Prepare Azure DevOps pipeline examples:
   - how tests were triggered,
   - artifacts/logs,
   - failure diagnostics,
   - Docker/environment setup.
3. Prepare API automation architecture:
   - Postman/Newman for volatile APIs,
   - C#/NUnit for stable APIs,
   - data setup/cleanup,
   - CI integration.
4. Prepare answer on AI:
   - practical use for test design, debugging, data generation, code review, flakiness diagnosis,
   - not replacing QA judgment.
5. Decide how to answer Warsaw hybrid:
   - confirm willingness/feasibility or ask for flexibility if needed.
