# DeGould Customer Fit Call - 30-Minute Prep

Date: 2026-06-16
Context: Aristek customer call
Customer: DeGould, https://degould.com/
Role angle: QA Automation / SDET for a .NET-heavy automotive inspection product

## Main Assumption

This call is likely less about a deep C# exam and more about customer fit:

- Can I communicate clearly in English?
- Do I understand the product and its quality risks?
- Can I explain how I would approach automation from scratch?
- Do I fit a remote client-facing team?
- Is my profile QA automation / SDET enough for their .NET-heavy environment?

I agree with this assumption.

The customer probably wants to reduce hiring risk: they need to see that I can talk to them directly, understand a real automotive quality domain, reason about automation pragmatically, and be productive around a .NET product without pretending to be a backend .NET developer.

## Product Understanding

Short version:

> As I understand it, DeGould builds automated vehicle inspection solutions for automotive OEMs and logistics workflows. The product combines high-quality vehicle image capture, AI-based damage detection, digital inspections, reporting, and visibility across plants or the supply chain.

Longer version:

> The interesting part for QA is that this is not only a web application. It connects physical vehicle scanning, high-resolution images, AI detection, inspection workflows, defect review, reports, traceability, and customer-facing visibility. That creates meaningful risks around data quality, workflow correctness, integrations, permissions, performance, and reliability.

Useful facts to mention carefully:

- DeGould positions itself around automated vehicle inspections.
- Their domain includes OEM vehicle inspections, damage detection, specification checks, digital inspection workflows, and supply-chain visibility.
- Public material mentions enterprise visibility across plants and DvM usage for supply chain disputes.
- Public customer quotes include Bentley and Wallenius Wilhelmsen.

Do not overstate internal details. Phrase uncertain points as "as I understand from public information".

## Notes From Part 1 Call With Vadim

Source: first part of Aristek / ResTech prep call on 2026-06-16.

Useful process context:

- Vadim is acting as account / sales contact around the client interview.
- The client is UK-based and works in the automotive field.
- On the customer call, I am being presented as an Aristek candidate.
- It is fine to say that Aristek colleagues shared project context and that I also studied public information about DeGould.
- The client has large automotive manufacturers among its customers.
- Current major delivery focus: a new version of the product, called V5, with updates planned during this year.
- Aristek has been working with the client since last year.
- Existing Aristek involvement includes machine learning engineers, mobile engineers, backend engineers, DevOps work, and Angular-related activities.
- Current target role wording is around Software Development Engineer in Test / Software Engineering in Testing.
- Expected interview participants from the client side: an engineer and the Director of Engineering.

What this changes in positioning:

> I should sound like someone joining an existing delivery relationship, not someone discovering the product from zero. I can reference that Aristek already shared project context with me, and I also reviewed public DeGould information to understand the domain.

Good wording:

> Before the call I reviewed the public information about DeGould and also discussed the project context with the Aristek team. My understanding is that the team is now focused on the V5 version of the product, and that Aristek has already been supporting different engineering areas such as ML, mobile, backend, DevOps, and Angular. For me, the relevant part is how SDET work can support this product evolution with reliable automation and fast feedback.

## Expected Call Structure

Likely flow:

1. Short introduction / "tell us about yourself".
2. Recent project and relevant experience.
3. Questions from the CV: technologies, automation stack, C#, Playwright/Selenium, API, CI/CD, possibly Angular/web UI context.
4. Product-fit discussion: how I understand DeGould, how I think about automation for this domain.
5. My questions to them.

Important guidance from Vadim:

- If a technology is in the CV but was not the deepest hands-on area, do not say just "I do not know it".
- Better framing: it was present on the project, I understand the concept, I used it less directly, and I can work with it when needed.
- Be honest, but avoid making the answer sound like a hard "no".

Reusable wording:

> I had exposure to this technology on the project and understand how it fits into the system. It was not my deepest hands-on area compared with QA automation, API testing, CI/CD, and Playwright/Selenium work, but I am comfortable reading the context, working with the team, and going deeper where the automation task requires it.

## 90-Second Opening Pitch

> I am a QA Automation Engineer / SDET with 7+ years in QA and automation. My strongest area is building useful automation around product risk: UI and API checks, regression coverage, CI feedback, failure investigation, and maintainable framework structure.
>
> What interests me in DeGould is that the product has real quality impact. It is not just screens and forms; it is vehicle inspection, image capture, AI damage detection, defect review, reporting, and traceability. From a testing perspective, that means there are many places where automation can give value: API contracts, workflow state transitions, permissions, regression checks, data consistency, and a smaller reliable UI smoke suite.
>
> I have worked with C#, Selenium, Playwright, API testing, CI/CD, logs, SQL, and release support. I would position myself as QA automation first, not as a backend .NET feature developer. If the expectation is to build and maintain automation around a .NET product, work with developers, understand APIs, debug failures, and improve test coverage, that fits my profile well.

Alternative opening that uses the new V5 context:

> I understand from Aristek and from public information that DeGould is working on the V5 evolution of the product, and that the product combines automotive inspection, image capture, AI-supported damage detection, digital workflows, reporting, and traceability. My background is QA automation / SDET: building reliable UI and API automation, integrating tests into CI, investigating failures, and helping teams get useful regression feedback. For a product like this, I would focus on the critical workflows, data integrity, API contracts, permissions, reporting, and a small stable UI smoke layer.

## Positioning For The .NET / C# Concern

Use this if they ask directly about C#:

> My strongest recent hands-on work is more around Playwright, TypeScript, API testing, CI/CD, Azure-based automation, and QA engineering. But I do have a C#/.NET automation foundation from earlier work: Selenium WebDriver, NUnit, typed OOP code, and working close to .NET systems.
>
> I would not present myself as a senior backend .NET developer. I am stronger as a QA automation engineer who can work in a .NET-heavy environment, read automation/backend-adjacent code, understand APIs, investigate failures, and build stable automated checks. If the role is automation ownership around a .NET product, that is a reasonable match.

Shorter version:

> I am not trying to sell myself as a backend .NET developer. My value is QA automation and SDET work around a .NET product: framework structure, API/UI tests, CI feedback, failure analysis, and product-risk thinking.

If they ask about a technology from CV where my hands-on depth is limited:

> I had exposure to it in the project context, but it was not my primary ownership area. My primary ownership was QA automation, test design, framework work, API/UI checks, CI feedback, and investigation. I can understand and work around that technology, but I want to be precise about where my deepest hands-on experience is.

## How I Would Approach Automation From Scratch

Answer:

> I would start from product risk and feedback needs, not from the tool. First I would clarify the most important workflows, current manual regression, API boundaries, test environments, test data, CI expectations, and reporting needs.
>
> Then I would design the automation in layers: API clients, UI page/component objects, test data builders, configuration, assertions, reporting, and CI integration. I would keep UI automation focused on critical user journeys and push as much validation as possible to API or integration level, because it is faster and usually more stable.

For DeGould, first candidates:

- inspection intake / inspection record loading;
- defect detection results becoming reviewable in the system;
- defect status transitions such as new, reviewed, approved, rejected, disputed;
- report generation and report metadata correctness;
- role-based access for reviewer, admin, customer, plant/logistics users;
- audit trail / traceability of inspection decisions;
- API contract checks around inspections, vehicles, defects, images, and reports;
- UI smoke flow for a user reviewing an inspection and exporting or viewing a report;
- reliability of test artifacts: screenshots, logs, API request/response data, correlation IDs.

## Quality Risks I Should Mention

Strong domain-specific risks:

- False negatives: real vehicle damage is missed.
- False positives: clean vehicles are incorrectly flagged, causing rework and loss of trust.
- Image quality: lighting, angle, blur, reflections, dirt, camera/scanner calibration.
- Traceability: inspection result must be linked to the correct vehicle/VIN/time/location.
- Workflow correctness: defect review and status changes must not lose context.
- Permissions: customer, plant, reviewer, and admin access must be isolated correctly.
- Reporting: generated reports must match the underlying inspection data.
- Integration reliability: scanner/image pipeline, backend services, AI results, web UI, and reports must stay consistent.
- Performance: large images and inspection records can make UI/API workflows slow.
- Auditability: disputed damage cases need evidence and clear history.

Good wording:

> In this domain, a bug is not only a broken button. It can mean wrong evidence about a vehicle condition, missed damage, incorrect customer visibility, or weak traceability in a dispute. That is why I would treat data integrity, workflow state, permissions, and reporting as first-class automation targets.

## Likely Customer Questions And Good Answers

### Tell us about yourself.

> I am a QA Automation Engineer / SDET with 7+ years of experience in QA, automation, UI/API testing, regression validation, defect investigation, and CI/CD quality workflows. My strongest area is making automation useful for the team: stable checks, clear framework structure, reliable feedback, and failure analysis that helps developers understand what changed.

Slightly stronger version for this call:

> I am a QA Automation Engineer / SDET with 7+ years of experience in QA, automation, UI/API testing, regression validation, defect investigation, and CI/CD quality workflows. Recently my strongest focus has been making automation useful for engineering teams: stable checks, clear framework structure, reliable feedback, and good failure evidence. I understand this role is connected to DeGould's product evolution, including the V5 work, so I would focus on automation that supports product delivery and reduces regression risk.

### Why are you interested in this product?

> It is connected to real production quality in automotive. The product includes vehicle inspection, high-quality image capture, AI damage detection, defect review, reporting, and traceability. For QA automation this is interesting because there are meaningful risks and not just simple UI validation.

### How would you decide what to automate first?

> I would prioritize stable, repeated, business-critical workflows where automation gives reliable feedback. For this product I would first look at inspection records, defect review, status transitions, reports, role permissions, and API contracts. I would avoid automating unstable or unclear UI too early and would first clarify expected behavior with examples.

### How do you handle flaky tests?

> I classify the failure first: product bug, test issue, environment issue, test data issue, synchronization issue, external dependency, or infrastructure issue. Then I check artifacts such as logs, screenshots, API responses, timestamps, environment health, and recent changes. I prefer fixing the root cause over hiding the problem with reruns.

### What makes a good automation framework?

> A good framework is understandable, stable, and useful in CI. It has clear layers, avoids duplicated setup, controls test data, provides good failure evidence, and separates UI flows from API/data helpers. The team should be able to trust the result and maintain the tests without fear.

### How would you work with developers and the customer?

> I prefer short feedback loops: clarify acceptance criteria early, discuss testability, agree what should be tested at unit/API/UI level, and make failed automation easy to reproduce. With customer stakeholders, I try to ask concrete questions using examples, especially around edge cases and business rules.

### Are you comfortable with English client communication?

> Yes. I am comfortable with English in meetings, technical discussion, written communication, and async collaboration. For a new domain I may need a short time to learn product vocabulary, but I can ask clear questions and keep communication structured.

## Questions To Ask DeGould

Ask 2-4 depending on time:

- What are the main quality goals for the V5 version this year?
- What are the most critical workflows you expect automation to cover first?
- Where is the biggest current pain: manual regression time, flaky automation, missing coverage, test data, CI speed, or environment stability?
- What parts of the product are most active right now: inspection workflow, AI result review, reporting, customer visibility, or integrations?
- What is the current automation stack around the .NET services and web UI?
- How do you usually investigate failures across UI, backend, image processing, and AI result data?
- What would success look like for this role after the first 2-3 months?

Avoid asking the customer directly about salary, incubator details, or Russian-speaking colleagues. Those are recruiter/vendor topics.

## Tone For The Call

Best tone:

- calm;
- structured;
- product-aware;
- honest about C# level;
- confident about QA automation value;
- no over-claiming backend .NET depth;
- client-facing and practical.

One sentence to keep in mind:

> I understand the product risk, I can communicate clearly, and I can build practical automation that gives the team reliable feedback.

## Actual Customer Interview Notes

Date: 2026-06-16
Participants: Richard, Louise, Vadim, Yauheni
Status: completed, feedback pending

Client-side roles:

- Richard: Director of Software and Platform at DeGould; previously principal software engineer.
- Louise: responsible for testing / test plans for V5; the SDET role would report into Louise.

Process / urgency:

- Role is active and important now.
- Vadim mentioned the first 6 months are expected to be an active period.
- Yauheni confirmed no planned vacation soon and availability roughly within a week, with incubator/access details to be clarified by Ksenia.
- Vadim's immediate post-call impression: good interview / good conversation; feedback expected in a few days.

## Actual V5 Quality Goals Mentioned

High-level product goals for V5:

- Reduce "time to quality": time from system installation to producing usable results for manufacturers.
- Reduce "shutter to screen time": time from camera trigger to results appearing on the dashboard.
- Reduce cost.
- Improve availability and reduce outages.

Testing maturity context:

- Historically DeGould has not had a strong automated test suite.
- Existing quality signal is mostly unit tests plus manual testing.
- Unit tests do not give enough confidence about release quality.
- V5 should have quality built in from the start.
- Richard has started discussing contract testing: define contracts between services first, then test services against those contracts.
- Bigger open problem: even if each component works and contracts are valid, does the whole system work correctly together?

## Actual Testing Need They Described

Louise described the important testing target as hardware + software system behavior, especially integration between services.

Hardware-side examples:

- cabling correctness;
- installation of cables/connectors;
- temperature testing;
- stability of hardware inputs for the software.

Software / integration-side pain:

- services often work well in isolation;
- issues appear when services work together;
- load from one service can overload another;
- not enough compute processing can cause failures;
- strange inputs, timeouts, and synchronization issues need simulation;
- edge cases should be tested so the whole system still works.

Planned test environment:

- physical cluster in Louise's office;
- every dev change should be automatically deployed to this physical cluster;
- cluster is attached to physical hardware;
- tests should run continuously against the hardware;
- tests should repeatedly fire cameras, ingest images, and run the system as if it were real;
- if something goes wrong, they want an alert tied to the change that was deployed;
- goal: before customer release, the system has already been running for weeks in a realistic fake environment.

## Actual Stack Mentioned

V5 / new stack:

- Kubernetes for most components.
- Components written by different teams in different languages.
- Main languages: .NET, Python, Go.
- NATS as local-cluster message broker; also used for key-value store style functionality.
- GCP cluster.
- GCP Pub/Sub for cloud communication.
- GCP-managed services/databases.

Migration / legacy:

- Results will be passed back to the old monolithic API in AWS.
- Old dashboard will be used for the time being.
- Longer term, a new dashboard should run in GCP with the new stack.
- V4 had mostly monolithic architecture running on the booth plus monolithic cloud/server-side architecture.

## Interview Performance Assessment

Overall: probably positive enough to stay in process.

Strong points:

- English communication was workable and natural enough for the client.
- Rapport was good: home automation, Tampermonkey, AI, Bachata, Poland/Krakow discussion created a friendly tone.
- The client seemed engaged rather than trying to end the call quickly.
- Louise explicitly related to the "automation as puzzle" angle.
- Asking about V5 quality goals was a good move and produced the most valuable technical context in the call.
- Availability/no vacation point supports their urgent 6-month active period.

Risks / weaker points:

- The opening self-introduction was too long and too nonlinear.
- "My main strength is fixing everything" sounds energetic but less professional than "failure investigation, cross-functional ownership, and automation around complex systems".
- The answer to "how would you build integration tests" was too generic. It should have gone directly into contract tests, message/event flows, service orchestration, load/timeout/strange input scenarios, test data, observability, and continuous hardware-cluster execution.
- The technology-choice answer focused too much on Playwright/Cypress/UI automation, while their core need is service integration + hardware/software system testing.
- Personal automation stories were memorable and helped rapport, but should be shorter in a client interview.
- Be careful with "C# is my top one language and I use it all the time" if the next technical check goes deep. Better to say C# is the strongest typed automation language from earlier work, while current strongest practical area is QA/SDET automation, CI, and system investigation.

Likely client read:

> Good cultural/communication fit, clearly automation-minded and curious. Technical fit is plausible, but they may still wonder whether he can structure integration/system tests for Kubernetes/message-based/hardware-connected architecture without needing too much guidance.

## If There Is A Follow-Up

Use this answer if they ask again about integration/system testing:

> Based on what you described, I would not treat this mainly as UI automation. I would build several layers. First, contract tests between services so each service respects the expected messages and schemas. Second, integration tests around NATS/message flows, timeouts, retries, strange inputs, and load from one service to another. Third, a smaller end-to-end suite on the physical cluster, where cameras are triggered, images are ingested, processing runs, and results are checked on the dashboard or API. I would also make sure each failure gives useful evidence: correlation IDs, service logs, message payload references, timing, resource metrics, and the deployed change that triggered the run.

Good follow-up sentence:

> After hearing more about the V5 setup, I understand the key challenge is not only automating test cases, but creating reliable confidence that the whole hardware/software system keeps working under realistic conditions.
