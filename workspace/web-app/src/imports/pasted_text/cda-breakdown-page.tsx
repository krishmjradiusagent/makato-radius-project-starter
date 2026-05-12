Create Step 2 as a NEW separate page frame.

DO NOT redesign existing components.
DO NOT rename existing frames.
DO NOT merge pages.
DO NOT create mobile.
DO NOT create settings.

ONLY USE THESE FRAME NAMES:
1. "01_CDA_Components_Page"
2. "02_CDA_Breakdown_Page"

EXISTING SOURCE FRAME:
"01_CDA_Components_Page"
- This is the CDA component library.
- Treat it as the source of truth.
- Do not restyle existing components.
- Do not delete existing components.
- Do not reorganize existing components unless needed only to add missing components cleanly.

NEW FRAME TO CREATE:
"02_CDA_Breakdown_Page"
- Width: 1440px
- Desktop only
- Purpose: Main CDA Breakdown page opened from Deal Terms.

IMPORTANT COMPONENT RULE:
- Use components from "01_CDA_Components_Page".
- If a required component is missing, add that missing reusable component inside "01_CDA_Components_Page".
- Add missing components under a new section named "Added Components for Step 2".
- Then use/copy that component into "02_CDA_Breakdown_Page".
- Do NOT create local-only components inside "02_CDA_Breakdown_Page".
- "02_CDA_Breakdown_Page" should contain page composition only.

NAVIGATION RULE:
Add a small prototype navigation chip to both frames.

On "01_CDA_Components_Page":
- Add chip: "Open CDA Breakdown"
- Link to "02_CDA_Breakdown_Page"

On "02_CDA_Breakdown_Page":
- Add chip: "Open Components"
- Link to "01_CDA_Components_Page"

This navigation chip is the only allowed modification to existing component page, except adding missing components under "Added Components for Step 2".

PAGE CONTEXT:
CDA = Closing Disclosure Audit.
Entry point = Deal Terms section.
User clicks "CDA Breakdown" from Deal Terms.
This page reviews commission, deductions, splits, company dollar, and approval status.

STYLE:
- Stripe-inspired operational finance UI
- Fast workflow first
- Financial clarity second
- Dense but readable
- Quiet premium
- Modern audit-finance tool
- shadcn/ui primitives only
- Tailwind + Radix + Lucide
- Inter typography
- Semantic shadcn tokens only
- WCAG-AA
- No gradients
- No spreadsheet styling
- No enterprise ugliness
- Avoid green-heavy UI
- Avoid bright accounting colors
- Typography max 24px

BUILD "02_CDA_Breakdown_Page" STRUCTURE:

1. HEADER
Include:
- Breadcrumb: "Deal Terms / CDA Breakdown"
- Back button: "Back to Deal Terms"
- Title: "CDA Breakdown"
- Subtitle: "Review commission, deductions, and payout before approval."
- Status pill: "Draft"
- Actions:
  - Save draft
  - Request approval

Use compact header.
Add subtle separator below.

2. TRANSACTION CONTEXT CARD
Show:
- Property: 1284 Willow Creek Dr
- Side: Buyer
- Purchase price: $1,000,000
- Commission: 2.5%
- Gross commission: $25,000
- Closing date: Jun 18, 2026
- Team: Keystone Team
- Primary agent: Ila Corcoran

Keep compact.
Use subtle dividers.
No hero card.

3. BUYER / SELLER SEGMENTED TOGGLE
Use component from "01_CDA_Components_Page".
- Buyer selected
- Seller inactive
- Compact
- Not tabs

4. MAIN LAYOUT
Two columns:
- Left content: 70%
- Right sticky summary: 30%

Rules:
- Page width: 1440px
- Content max-width: around 1320px
- Center content
- Right summary sticky below header
- Use shadcn spacing tokens

5. LEFT CONTENT SECTIONS

A. Gross Commission
Rows:
- Purchase Price: $1,000,000
- Commission Rate: 2.5%
- Gross Commission Income: $25,000

Rules:
- GCI is read-only calculated row
- Commission rate has inline edit affordance
- Use Money Row component

B. Pre-Split Deductions
Rows:
- TC Fee / Flat / Pre-split / Team / $500
- Compliance Review / Flat / Pre-split / Team / $250

Include:
- "+ Add deduction" button
- Fee badges
- Row hover edit icon
- Inline edit affordance

C. Split Allocation
Show:
- Split basis after pre-split deductions: $24,250

Allocation:
- Ila Corcoran: 60%
- Michael Tran: 40%

Below:
- Ila Corcoran basis: $14,550
- Michael Tran basis: $9,700

Use clean minimal segmented allocation bar.
No chart visuals.
No gradients.

D. Agent Breakdown
Use left agent list + right detail.

Left list:
- Ila Corcoran / 60% / Awaiting TL
- Michael Tran / 40% / Awaiting TL

Right selected detail:
- Ila Corcoran
- Split basis: $14,550
- Commission plan: 80/20 Standard
- Team split: 20%
- Team portion: $2,910
- Agent gross after team split: $11,640

Post-split deductions:
- RM Fee: $300
- E&O Fee: $125

Net commission:
- $11,215

Rules:
- Use Agent Breakdown Card component
- Net commission prominent but not oversized
- Commission plan editable
- Post-split deductions editable
- Agent split percentage editable
- Use subtle hover states

E. Company Dollar
Rows:
- Team portion: $2,910
- Radius fee: Manual auditor input required
- Company dollar: Pending

Rules:
- Radius fee row uses warning treatment
- Company dollar pending until auditor input
- Make auditor dependency clear

F. Approval Progress
DocuSign-inspired progress:
- Agent entry: Complete
- Team Lead review: Current
- Agent confirmation: Pending
- Auditor verification: Pending
- Final CDA PDF: Pending

Keep compact.
Operational, not decorative.

6. RIGHT STICKY SUMMARY PANEL
Use Finance Side Summary Panel component.

Show:
- Gross commission: $25,000
- Pre-split deductions: $750
- Split basis: $24,250
- Selected agent net: $11,215
- Company dollar: Pending
- Status: Draft

Actions:
- Save draft
- Request approval
- Export PDF disabled
- Finalize CDA disabled

Show dirty state:
- "Unsaved changes"

7. STICKY ACTION BAR
Use CDA Sticky Action Bar component.

Include:
- Save draft
- Request approval
- Export PDF disabled
- Finalize CDA disabled
- Status: Draft
- Unsaved changes

Avoid duplicate visual weight with right panel.
Make footer lightweight.

8. INLINE EDIT STATES
Show subtle inline edit affordance on:
- Commission rate
- Pre-split deduction amount
- Agent split percentage
- Commission plan
- Post-split deduction amount

Rules:
- Use Lucide pencil/edit icon
- Hover reveals edit icon
- Calculated rows are read-only
- Read-only rows should look intentionally locked

9. MICROCOPY STATES
Add subtle helper text:
- "Calculated from purchase price × commission rate"
- "Radius fee requires auditor input"
- "Export PDF available after finalization"
- "Finalize available after all approvals"

Keep helper text small.

ACCEPTANCE CRITERIA:
- Existing frame remains named "01_CDA_Components_Page"
- New frame is named "02_CDA_Breakdown_Page"
- Component page is not visually damaged
- Missing reusable components are added only to "01_CDA_Components_Page"
- Missing components are placed under "Added Components for Step 2"
- Breakdown page contains page composition only
- Both frames have navigation chips
- Breakdown page uses 2-column layout
- Right summary panel is sticky
- Entry context clearly says Deal Terms
- Approval flow feels DocuSign-inspired
- UI feels Stripe-style operational finance
- No mobile screens
- No settings screens
- No unrelated CRM UI