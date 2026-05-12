Update the existing CDA Figma Make file.

PRIMARY COLOR:
Use #5A5FF2 as the primary action color.
Use shadcn/ui primitives only.
Use Tailwind semantic tokens where possible.
Use Inter typography.
Keep Radius quiet-premium desktop style.
WCAG-AA only.

DO NOT:
- Do not recreate existing Radius screens.
- Do not redesign existing product layouts.
- Do not recreate Settings page shell.
- Do not recreate My Transactions page shell.
- Do not recreate Purchase Details shell.
- Do not recreate Transaction Queue shell.
- Do not create fake full-app pages.
- Do not create mobile screens.
- Do not use non-shadcn controls.
- Do not use gradients.
- Do not use random colors.
- Do not duplicate Default Assignments preview/list sections.
- Do not leave broken dropdown states.

GOAL:
Design ONLY the NEW CDA solution screens/components/states that attach into the existing Radius product.

This file should become:
"CDA INSERTION MAP + COMPONENT LIBRARY"

The flow should show:
- what NEW CDA UI gets added
- where it attaches
- who uses it
- what opens what
- what state transitions happen

NOT:
full recreated app pages.

==================================================
FRAME 1:
"01_CDA_Components_Page"
==================================================

Keep existing valid components:
- Commission Plans list
- Fee Types list
- Default Assignments table
- Finance summary cards
- Split bars
- Empty states
- CDA status badges
- Agent breakdown cards

REMOVE:
- duplicate Default Assignments preview/list sections
- duplicate unnecessary assignment cards

REORGANIZE COMPONENTS INTO THESE GROUPS:

1. SETTINGS COMPONENTS
- Commission Plans list
- Fee Types list
- Default Assignments table
- Bulk assign toolbar
- Recalculation warning

2. CDA TABLE COMPONENTS
- CDA Status badges
- CDA Action links
- CDA column header
- Table row states:
  - Setup needed
  - Estimate ready
  - Draft
  - Awaiting TL
  - Awaiting agent
  - Auditor review
  - Needs correction
  - Finalized

3. CDA BREAKDOWN COMPONENTS
- Finance summary card
- Split allocation bar
- Agent breakdown rows
- Deduction rows
- Section headers
- Finance summary footer
- Net commission summary

4. POPUPS / DRAWERS / MENUS
Add these reusable shadcn components:

A. Add Commission Plan Modal
Fields:
- Plan name
- Plan type
- Agent split %
- Team split %
- Cap amount
- Deal types
- Reset period
- Tier rows
Actions:
- Cancel
- Save plan

B. Edit Commission Plan Modal
Prefilled:
- 80/20 Standard
- Agent 80%
- Team 20%
- Cap $18,000

C. Add Fee Type Modal
Fields:
- Fee name
- Flat / Percentage
- Amount
- Percentage basis
- Pre/Post split
- Applies to
- Accrued by
- Pro-rate
- Calculation period
- Min fee
- Max fee
- Sliding scale
- Contributes to cap
Actions:
- Cancel
- Save fee type

D. Edit Fee Type Modal
Prefilled:
- RM Fee
- Flat
- Post-split
- Agent
- $300

E. Commission Plan Dropdown Menu
Items:
- Edit plan
- Assign to agents
- Duplicate plan
- Archive plan

F. Fee Type Dropdown Menu
Items:
- Edit fee
- Assign default
- Duplicate fee
- Archive fee

G. Edit Agent Defaults Drawer
Fields:
- Commission Plan dropdown
- Default Fee Types multi-select
- Apply changes to under-contract deals toggle
Actions:
- Cancel
- Save defaults

H. Assign Defaults Drawer
Fields:
- Commission Plan dropdown
- Default Fee Types multi-select
Actions:
- Cancel
- Save defaults

I. Bulk Assign Drawer
Fields:
- Selected agents count
- Commission Plan dropdown
- Fee Types multi-select
- Apply to under-contract deals toggle
Actions:
- Cancel
- Apply defaults

J. Recalculation Warning Modal
Title:
"Active CDA estimates may update"

K. Request Correction Modal
Textarea:
"Correction note"

L. Finalize CDA Confirmation Modal
Actions:
- Cancel
- Finalize CDA

M. Send via DocuSign Modal
Recipients:
- Agent
- Team Lead
- Accounting copy

N. Unsaved Changes Dialog
Actions:
- Keep editing
- Discard changes

O. Purchase Details CDA Estimate Card
States:
- Setup needed
- Estimate ready
- Updated estimate

Includes:
- Gross commission
- Pre-split deductions
- Split basis
- Estimated net commission
- Company dollar pending
CTA:
- View CDA Breakdown

==================================================
FRAME 2:
"15_CDA_Insertion_Map"
==================================================

Purpose:
Show ONLY the NEW CDA UI pieces and where they attach into the existing Radius product.

DO NOT recreate existing product pages.

Use:
- floating annotations
- arrows
- labels
- component references
- overlay references

The frame should feel like:
"Implementation Blueprint"

==================================================
SECTION 1:
"SETTINGS INSERTION"
==================================================

Show ONLY:
- CDA Settings tab label
- Commission Plans section
- Fee Types section
- Default Assignments table
- Add Plan modal
- Add Fee modal
- Edit Defaults drawer
- Bulk Assign drawer
- Recalculation warning modal

Annotations:
"Attaches inside existing Settings page."

"Only Team Lead/Admin can access CDA Settings."

"Commission plans + fee types power automatic CDA calculation."

"Default Assignments connects plans + fees to agents."

==================================================
SECTION 2:
"TRANSACTION LIST INSERTION"
==================================================

Show ONLY:
- CDA Status column
- CDA Action column
- Row states

States:
- Setup needed
- Estimate ready
- Draft
- Awaiting TL
- Awaiting agent
- Auditor review
- Needs correction
- Finalized

Annotations:
"Attaches into existing My Transactions table."

"CDA estimate auto-generates from Deal Terms."

"No manual Start CDA flow."

"Reopen existing CDA draft if one exists."

==================================================
SECTION 3:
"PURCHASE DETAILS INSERTION"
==================================================

Show ONLY:
- CDA Estimate card
- Required field checklist
- Estimate ready state

Required fields:
- Purchase price
- Commission rate
- Agent allocation
- Award allocation
- Commission plan
- Default fees

Annotations:
"Attaches inside existing Purchase Details drawer."

"CDA estimate updates automatically when deal terms change."

==================================================
SECTION 4:
"TEAM LEAD REVIEW INSERTION"
==================================================

Show ONLY:
- TL Review finance summary
- Editable deduction rows
- Editable split rows
- Send to Agent action
- Request Correction modal

Annotations:
"TL can edit plans, allocations, and deductions."

"TL cannot finalize CDA."

==================================================
SECTION 5:
"AGENT CONFIRMATION INSERTION"
==================================================

Show ONLY:
- Agent confirmation summary
- Confirm CTA
- Request correction CTA
- Correction modal

Annotations:
"Agent sees only own payout."

"Agent cannot edit calculations."

==================================================
SECTION 6:
"TC INSERTION"
==================================================

Show ONLY:
- TC review/read-only state
- Purchase Details assist state

Annotations:
"TC can assist if assigned."

"TC cannot finalize CDA."

==================================================
SECTION 7:
"AUDITOR INSERTION"
==================================================

Show ONLY:
- Auditor verification summary
- Radius fee input
- Company dollar verification
- Finalize CDA modal
- Send via DocuSign modal

Annotations:
"Auditor enters Radius fee."

"Auditor finalizes CDA."

==================================================
SECTION 8:
"FINALIZED STATE INSERTION"
==================================================

Show ONLY:
- Finalized PDF summary
- Download PDF CTA
- Read-only finalized state

Annotations:
"Finalized CDA becomes locked."

"Historical fees/plans remain preserved."

==================================================
SECTION 9:
"CDA STATUS MAP"
==================================================

Create compact mapping table:

Columns:
- Status
- Action
- Opens
- Owner

Rows:
- Setup needed
- Estimate ready
- Draft
- Awaiting TL
- Awaiting agent
- Auditor review
- Needs correction
- Finalized

==================================================
SECTION 10:
"IMPLEMENTATION NOTES"
==================================================

Cards:
- CDA estimate auto-generates from Deal Terms.
- Settings defaults power automatic calculations.
- Changing defaults can recalculate active CDA estimates.
- If TL edits after agent confirmation, confirmation resets.
- Radius fee remains manual.
- Do not create duplicate CDA records.
- Archived plans/fees remain visible historically.

STYLE RULES:
- Use shadcn Card, Badge, Button, Dialog, Sheet, DropdownMenu, Table, Separator, Tabs, Select, Checkbox, Switch.
- Keep headings <= 24px.
- Compact Radius spacing.
- No fake app shells.
- No giant empty canvases.
- Focus on CDA additions only.

ACCEPTANCE:
- Components page contains all reusable CDA overlays/components.
- Duplicate unnecessary assignment previews removed.
- Correct Default Assignments table remains.
- Insertion Map page exists.
- Insertion Map shows ONLY CDA additions.
- Existing Radius screens are NOT recreated.
- All role flows are represented via CDA insertions only.
- Dropdowns/modals/drawers are complete and reusable.
- Primary color #5A5FF2 used for primary actions.