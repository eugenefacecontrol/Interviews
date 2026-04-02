# Interviews

Interview workspace.

## Report
- Published report: https://eugenefacecontrol.github.io/Interviews/interviews/site/

## Files
- `RULES.md` — operating rules for this area
- `companies.json` — canonical registry for automation
- `companies.md` — human-readable registry
- `companies/` — per-company folders
- `site/` — generated HTML for GitHub Pages
- `scripts/add-company.js` — helper for adding/updating companies
- `scripts/render-companies-html.js` — HTML generator

## Callable command
Global command name: `interviews-add`

It adds or updates a company, refreshes registries, regenerates HTML, creates a git commit, and pushes to `origin` by default.
