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
4. Update the registry whenever a company is added or changed.
5. Store company-specific materials inside that company folder.
6. After adding or updating a company, create a git commit for the change and push it to the configured `origin` remote unless explicitly told not to.
7. Keep HTML output in sync with the canonical companies registry so it can be published via GitHub Pages.
8. Always work on interview-related data separately from other domains.

## Expected structure
- `interviews/companies.json` — canonical machine-readable registry
- `interviews/companies.md` — human-readable summary
- `interviews/companies/<slug>/` — per-company folder
- `interviews/site/` — generated HTML output

## Update policy
When the user asks to change the rules, update this file directly and keep the rest of the structure aligned with it.
