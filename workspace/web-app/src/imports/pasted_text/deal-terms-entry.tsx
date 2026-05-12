Create Step 6 as a NEW separate page frame.

DO NOT redesign existing components.
DO NOT rename existing frames.
DO NOT merge pages.
DO NOT create mobile.

ONLY USE THESE FRAME NAMES:
1. "01_CDA_Components_Page"
2. "02_CDA_Breakdown_Page"
3. "03_CDA_Team_Lead_Review_Page"
4. "04_CDA_Auditor_Verification_Page"
5. "05_CDA_Settings_Page"
6. "06_CDA_Deal_Terms_Entry_Page"

EXISTING SOURCE FRAME:
"01_CDA_Components_Page"
- CDA component library.
- Source of truth.
- Do not restyle existing components.
- Do not delete existing components.
- Do not damage layout.

NEW FRAME TO CREATE:
"06_CDA_Deal_Terms_Entry_Page"
- Width: 1440px
- Desktop only
- Purpose: Existing Deal Terms transaction section with CDA entry point.

COMPONENT RULE:
- Use components from "01_CDA_Components_Page".
- If a reusable component is missing, add it inside "01_CDA_Components_Page".
- Add missing components under section: "Added Components for Step 6".
- Then reuse/copy into "06_CDA_Deal_Terms_Entry_Page".
- Do NOT create local-only reusable components inside this page.

NAVIGATION RULE:
Add small prototype navigation chips.

On "01_CDA_Components_Page":
- Keep existing chips.
- Add chip: "Open Deal Terms Entry"
- Link to "06_CDA_Deal_Terms_Entry_Page"

On "06_CDA_Deal_Terms_Entry_Page":
- Add chips:
  - "Open Components"
  - "Open CDA Breakdown"
  - "Open TL Review"
  - "Open Auditor Verification"
  - "Open CDA Settings"
- Link each chip to correct frame.

Do not modify existing frames except nav chips and missing Step 6 components.

PAGE CONTEXT:
This is the existing transaction Deal Terms section.
User reviews contract/commission details here.
CDA starts from this page through a clear "CDA Breakdown" action.

STYLE:
- Match CDA system
- Stripe-inspired operational finance UI
- Fast workflow first
- Financial clarity second
- Dense but readable
- Quiet premium
- shadcn/ui primitives only
- Tailwind + Radix + Lucide
- Inter typography
- Semantic shadcn tokens only
- WCAG-AA
- Typography max 24px
- No gradients
- No spreadsheet styling
- No unrelated CRM redesign

BUILD "06_CDA_Deal_Terms_Entry_Page" STRUCTURE:

1. HEADER
Include:
- Breadcrumb: "Transactions / Deal Terms"
- Back button: "Back to Transaction"
- Title: "Deal Terms"
- Subtitle: "Review contract terms, commission details, and CDA calculation."
- Status pill: "Pending"
- Right actions:
  - Save changes
  - Continue

2. TRANSACTION CONTEXT STRIP
Compact strip:
- Property: 1284 Willow Creek Dr
- Client: Michael Loft
- Side: Buyer
- Status: Pending
- Closing date: Jun 18, 2026
- Team: Keystone Team

3. MAIN LAYOUT
Two columns:
- Left form content: 68%
- Right CDA summary card: 32%

Frame:
- Width 1440px
- Content max-width around 1320px
- Desktop only

4. LEFT CONTENT

A. Contract Details Section
Fields:
- Purchase price: $1,000,000
- Acceptance date: May 10, 2026
- Closing date: Jun 18, 2026
- Transaction side: Buyer
- Property type: Single Family
- MLS ID: RA-248193

B. Commission Details Section
Fields:
- Commission type: Percentage
- Commission rate: 2.5%
- Gross commission: $25,000 calculated
- Commission paid by: Seller
- Commission notes

C. Agent Allocation Section
Rows:
- Ila Corcoran / Primary Agent / 60%
- Michael Tran / Co-Agent / 40%

Actions:
- Add co-agent
- Edit allocation

Validation:
- Allocation must total 100%

D. Commission Plan Section
Fields:
- Selected plan: 80/20 Standard
- Default fees applied:
  - TC Fee
  - RM Fee
  - E&O Fee

Actions:
- Change plan
- Manage fees

Helper:
"Defaults are assigned from CDA Settings and can be adjusted before review."

E. CDA Readiness Checklist
Checklist:
- Purchase price entered
- Commission rate entered
- Agent allocation totals 100%
- Commission plan selected
- Required fees applied
- Ready for CDA review

5. RIGHT CDA SUMMARY CARD
Sticky summary card.

Title:
"CDA Calculation"

Show:
- Gross commission: $25,000
- Pre-split deductions: $750 estimated
- Split basis: $24,250 estimated
- Agent net estimate: Pending review
- Company dollar: Pending auditor verification

Status:
- CDA not started

Primary button:
- "Open CDA Breakdown"

Secondary:
- "Preview estimate"

Helper:
"Open CDA Breakdown to review deductions, splits, and approvals."

States:
- Button enabled when readiness checklist complete
- If incomplete, show disabled state and missing items

6. CDA ENTRY CTA
Make "Open CDA Breakdown" clearly route to:
"02_CDA_Breakdown_Page"

Prototype link:
- Button "Open CDA Breakdown" opens "02_CDA_Breakdown_Page"

7. INLINE STATES
Show:
- Gross commission calculated row
- Agent allocation validation
- Missing/complete checklist states
- CDA not started status
- Estimate values marked as pending review

8. MICROCOPY
Use concise helper text:
- "Gross commission is calculated from purchase price and commission rate."
- "Agent allocation must total 100% before CDA review."
- "CDA Breakdown opens the approval workflow."
- "Company dollar is finalized by auditor verification."

9. ACCEPTANCE CRITERIA
The output is correct only if:
- New frame named "06_CDA_Deal_Terms_Entry_Page"
- Existing frames remain intact
- CDA entry point is inside Deal Terms
- "Open CDA Breakdown" links to "02_CDA_Breakdown_Page"
- Right CDA summary card exists
- Readiness checklist exists
- Agent allocation is visible
- Commission plan/default fees are visible
- No mobile screens
- No settings redesign
- No unrelated CRM redesign