# Current Task

## Name
Convert React Project to Single-File HTML

## Goal
Convert the existing React/TSX CDA project into a single self-contained `index.html` file using Tailwind CSS, Lucide React, and Framer Motion. Maintain 1:1 visual parity.

## Project Type
- HTML prototype

## Workspace Path
`/Users/radius/Desktop/CDA/workspace/web-app`

## Scope

### In Scope
- Conversion of all React components to HTML/JS.
- Preservation of all screens (Agent Confirmation, Auditor Verification, Assign Defaults).
- Preservation of all interactions (dialogs, sheets, tabs, accordions).
- Preservation of all styling (shadcn/ui visual identity via Tailwind).
- Single `index.html` output.

### Out of Scope
- Redesigning the UI.
- Modifying spacing or structure.
- Removing any functionality.

## Inputs
- Existing code at `/Users/radius/Desktop/CDA/workspace/web-app`
- Makato truth files

## Desired Output
- Single self-contained `index.html`

## Acceptance Criteria
- [ ] Matches React project visually 1:1
- [ ] Self-contained in one file (CDNs allowed)
- [ ] All flows (routing simulated) working
- [ ] All UI states preserved
- [ ] Handoff updated
