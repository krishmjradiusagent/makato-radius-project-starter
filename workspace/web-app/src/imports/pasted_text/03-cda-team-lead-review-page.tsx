Create Step 3 as a NEW separate page frame.

DO NOT redesign existing components.
DO NOT rename existing frames.
DO NOT merge pages.
DO NOT create mobile.
DO NOT create settings.

ONLY USE THESE FRAME NAMES:
1. "01_CDA_Components_Page"
2. "02_CDA_Breakdown_Page"
3. "03_CDA_Team_Lead_Review_Page"

EXISTING SOURCE FRAME:
"01_CDA_Components_Page"
- This is the CDA component library.
- Treat it as the source of truth.
- Do not restyle existing components.
- Do not delete existing components.
- Do not reorganize existing components unless needed only to add missing components cleanly.

NEW FRAME TO CREATE:
"03_CDA_Team_Lead_Review_Page"
- Width: 1440px
- Desktop only
- Purpose: Team Lead review and adjustment state for CDA.

IMPORTANT COMPONENT RULE:
- Use components from "01_CDA_Components_Page".
- If a required reusable component is missing, add it inside "01_CDA_Components_Page".
- Add missing components under a section named "Added Components for Step 3".
- Then use/copy that component into "03_CDA_Team_Lead_Review_Page".
- Do NOT create local-only reusable components inside "03_CDA_Team_Lead_Review_Page".
- Page frame should contain page composition only.

NAVIGATION RULE:
Add small prototype navigation chips.

On "01_CDA_Components_Page":
- Keep existing "Open CDA Breakdown"
- Add chip: "Open TL Review"
- Link to "03_CDA_Team_Lead_Review_Page"

On "02_CDA_Breakdown_Page":
- Add or keep chip: "Open TL Review"
- Link to "03_CDA_Team_Lead_Review_Page"

On "03_CDA_Team_Lead_Review_Page":
- Add chip: "Open Components"
- Link to "01_CDA_Components_Page"
- Add chip: "Open CDA Breakdown"
- Link to "02_CDA_Breakdown_Page"

Do not modify anything else in existing frames except navigation chips and missing Step 3 components.

PAGE CONTEXT:
CDA = Closing Disclosure Audit.
Entry point = Deal Terms section.
This page represents the Team Lead review state after agent entry.
Team Lead can review, correct, add fees, change commission plan, adjust split, and send back/request agent confirmation.

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

BUILD "03_CDA_Team_Lead_Review_Page" STRUCTURE:

1. HEADER
Include:
- Breadcrumb: "Deal Terms / CDA / Team Lead Review"
- Back button: "Back to Deal Terms"
- Title: "Team Lead Review"
- Subtitle: "Validate commission plan, splits, deductions, and payout before sending to the agent."
- Status pill: "Awaiting TL"
- Right actions:
  - Save changes
  - Send to agent
  - More actions dropdown

Header rules:
- Compact height
- Subtle separator below
- Title max 24px
- No hero treatment

2. REVIEW ALERT BAR
Place below header.

Content:
- "Review required"
- "Agent submitted CDA details. Confirm commission plan, deductions, and split before sending for agent confirmation."

Actions:
- View change log
- Mark reviewed

Design:
- Subtle warning/info treatment
- Not loud
- Compact

3. TRANSACTION CONTEXT CARD
Show compact transaction details:
- Property: 1284 Willow Creek Dr
- Side: Buyer
- Purchase price: $1,000,000
- Commission: 2.5%
- Gross commission: $25,000
- Closing date: Jun 18, 2026
- Team: Keystone Team
- Primary agent: Ila Corcoran
- Submitted by: Ila Corcoran
- Submitted: Today, 10:42 AM

Keep compact.
Use subtle dividers.

4. MAIN LAYOUT
Use 2-column layout.

Left main content:
- 70%

Right sticky review panel:
- 30%

Rules:
- Frame width 1440px
- Content max-width around 1320px
- Center content
- Right panel sticky below header
- Use shadcn spacing tokens

5. LEFT CONTENT SECTIONS

A. Review Checklist
Use compact checklist/card.

Items:
- Commission plan selected
- Gross commission calculated
- Pre-split deductions reviewed
- Agent split reviewed
- Post-split deductions reviewed
- Company dollar pending auditor input

States:
- Complete
- Needs review
- Pending auditor

Purpose:
Fast TL scanning.

B. Commission Plan Section
Rows:
- Current plan: 80/20 Standard
- Applies to: Ila Corcoran
- Team split: 20%
- Agent split: 80%
- Cap contribution: Enabled

Controls:
- Inline edit commission plan
- Change plan button
- Checkbox/toggle: "Apply plan changes to all under contract deals"

Important:
This toggle must appear here.
Microcopy:
"Apply this commission plan change to all current under contract deals for this agent."

C. Gross Commission Section
Rows:
- Purchase Price: $1,000,000
- Commission Rate: 2.5%
- Gross Commission Income: $25,000

Rules:
- Commission rate editable inline
- GCI read-only calculated
- Add helper text: "Calculated from purchase price × commission rate"

D. Pre-Split Deductions Section
Rows:
- TC Fee / Flat / Pre-split / Team / $500
- Compliance Review / Flat / Pre-split / Team / $250

Controls:
- Inline edit amount
- Remove row icon
- "+ Add pre-split deduction"

Rules:
- Show fee badges
- Hover reveals edit/remove actions
- Use subtle destructive icon only on hover

E. Split Allocation Section
Show:
- Split basis after pre-split deductions: $24,250

Allocation:
- Ila Corcoran: 60%
- Michael Tran: 40%

Controls:
- Inline edit percentages
- Add co-agent button
- Validation helper:
  "Agent allocation must total 100%."

Use minimal segmented allocation bar.
No gradients.

F. Agent Breakdown Section
Use left agent list + right detail layout.

Left list:
- Ila Corcoran / 60% / Needs TL review
- Michael Tran / 40% / Needs TL review

Right selected detail:
- Ila Corcoran
- Split basis: $14,550
- Commission plan: 80/20 Standard
- Team portion: $2,910
- Agent gross after team split: $11,640

Post-split deductions:
- RM Fee: $300
- E&O Fee: $125

Controls:
- Inline edit commission plan
- Inline edit deductions
- "+ Add post-split deduction"
- Add note field: "Internal TL note"

Net commission:
- $11,215

G. Company Dollar Section
Rows:
- Team portion: $2,910
- Radius fee: Manual auditor input required
- Company dollar: Pending

Rules:
- Radius fee row uses warning treatment
- TL cannot enter Radius fee
- Add helper text:
  "Auditor enters Radius fee during final verification."

H. Change Log Section
Compact activity list:
- Ila submitted CDA details
- System applied 80/20 Standard plan
- System applied TC Fee and Compliance Review
- Split allocation updated to 60/40

Design:
- Compact
- Low visual weight
- Useful for audit confidence

I. Approval Progress Section
DocuSign-inspired progress:
- Agent entry: Complete
- Team Lead review: Current
- Agent confirmation: Pending
- Auditor verification: Pending
- Final CDA PDF: Pending

6. RIGHT STICKY REVIEW PANEL
Use Finance Side Summary Panel component.

Show:
- Gross commission: $25,000
- Pre-split deductions: $750
- Split basis: $24,250
- Ila net commission: $11,215
- Michael net commission: $7,435
- Company dollar: Pending
- Current status: Awaiting TL

Review actions:
- Save changes
- Send to agent
- Request auditor help
- Export PDF disabled
- Finalize disabled

Validation block:
- Allocation total: 100%
- Missing Radius fee
- Agent confirmation pending

Dirty state:
- "Unsaved TL changes"

7. STICKY ACTION BAR
Use CDA Sticky Action Bar component.

Include:
- Save changes
- Send to agent
- Request auditor help
- Status: Awaiting TL
- Unsaved changes

Disabled:
- Export PDF
- Finalize CDA

8. INLINE EDIT STATES
Show inline edit affordance on:
- Commission plan
- Apply plan changes toggle
- Commission rate
- Pre-split deduction amount
- Agent split percentage
- Post-split deduction amount
- TL note

Rules:
- Use Lucide pencil/edit icon
- Hover reveals edit/remove actions
- Calculated rows are read-only
- Read-only rows look intentionally locked
- No modal opened on this page except "Add deduction" trigger state

9. ADD DEDUCTION MODAL TRIGGER STATE
Do not fully open the modal unless space allows.
Show button states for:
- "+ Add pre-split deduction"
- "+ Add post-split deduction"

If showing modal preview:
- Use existing Fee Builder Modal component
- Keep it as a small overlay example
- Do not create separate modal page

10. MICROCOPY STATES
Add subtle helper text:
- "Agent allocation must total 100%."
- "Radius fee requires auditor input."
- "Send to agent after TL review is complete."
- "Export PDF available after finalization."

11. ACCEPTANCE CRITERIA
The output is correct only if:
- New frame is named "03_CDA_Team_Lead_Review_Page"
- Existing frames keep names:
  - "01_CDA_Components_Page"
  - "02_CDA_Breakdown_Page"
- Component page is not damaged
- Missing reusable components are added only to "01_CDA_Components_Page"
- Missing components are placed under "Added Components for Step 3"
- Team Lead page contains page composition only
- Navigation chips allow moving between all three frames
- Page clearly shows Team Lead review state
- TL can edit plan, fees, splits, and deductions
- TL cannot enter Radius fee
- Apply plan changes to all under contract deals toggle is included
- Right sticky review panel exists
- Approval flow feels DocuSign-inspired
- UI feels Stripe-style operational finance
- No mobile screens
- No settings screens
- No unrelated CRM UI