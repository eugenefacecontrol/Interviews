# Interviews rules

## Purpose
This area is dedicated to interview tracking and preparation. Work here stays separate from other areas.

## Main rules
1. Keep one canonical companies registry file with all companies.
2. Every company must also have its own separate folder with all relevant information.
3. For each company, track at least:
   - company name
   - status / stage
   - process
   - requirements
   - notes
   - dates
   - links
   - rejection reason when applicable
   - fit estimate and recommended CV when enough information is available
4. Update the registry whenever a company is added or changed.
5. Store company-specific materials inside that company folder.
6. After adding or updating a company, create a git commit for the change and push it to the configured `origin` remote unless explicitly told not to.
7. Keep HTML output in sync with the canonical companies registry so it can be published via GitHub Pages.
8. If the user provides a vacancy or company link, store it in the registry and render it as a clickable link in the HTML report. For LinkedIn вакансии, prefer showing the position/company as a link to the LinkedIn posting.
9. Always work on interview-related data separately from other domains.

## Expected structure
- `companies.json` — canonical machine-readable registry
- `companies.md` — human-readable summary
- `cv.json` — canonical CV registry with available resume versions
- `companies/<slug>/` — per-company folder
- `site/` — generated HTML output

## Update policy
When the user asks to change the rules, update this file directly and keep the rest of the structure aligned with it.
