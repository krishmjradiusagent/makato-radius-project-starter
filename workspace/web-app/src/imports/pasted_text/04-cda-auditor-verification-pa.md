Create Step 4 as a NEW separate page frame.

DO NOT redesign existing components.
DO NOT rename existing frames.
DO NOT merge pages.
DO NOT create mobile.
DO NOT create settings.

ONLY USE THESE FRAME NAMES:
1. "01_CDA_Components_Page"
2. "02_CDA_Breakdown_Page"
3. "03_CDA_Team_Lead_Review_Page"
4. "04_CDA_Auditor_Verification_Page"

EXISTING SOURCE FRAME:
"01_CDA_Components_Page"
- CDA component library.
- Source of truth.
- Do not restyle existing components.
- Do not delete existing components.
- Do not damage layout.

NEW FRAME TO CREATE:
"04_CDA_Auditor_Verification_Page"
- Width: 1440px
- Desktop only
- Purpose: Auditor final verification before CDA PDF generation.

COMPONENT RULE:
- Use components from "01_CDA_Components_Page".
- If a reusable component is missing, add it inside "01_CDA_Components_Page".
- Add missing components under section: "Added Components for Step 4".
- Then reuse/copy into "04_CDA_Auditor_Verification_Page".
- Do NOT create local-only reusable components inside the page.

NAVIGATION RULE:
Add small prototype navigation chips.

On "01_CDA_Components_Page":
- Keep existing chips.
- Add chip: "Open Auditor Verification"
- Link to "04_CDA_Auditor_Verification_Page"

On "04_CDA_Auditor_Verification_Page":
- Add chips:
  - "Open Components"
  - "Open CDA Breakdown"
  - "Open TL Review"
- Link each chip to correct frame.

Do not modify existing frames except nav chips and missing Step 4 components.

PAGE CONTEXT:
CDA = Closing Disclosure Audit.
This page is for auditors after Team Lead review and Agent confirmation.
Auditor verifies final values, enters Radius fee, confirms company dollar, and finalizes CDA.

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
- Avoid bright accounting colors
- Typography max 24px

BUILD "04_CDA_Auditor_Verification_Page" STRUCTURE:

1. HEADER
Include:
- Breadcrumb: "Auditing Dashboard / CDA Verification"
- Back button: "Back to Auditing Dashboard"
- Title: "Auditor Verification"
- Subtitle: "Verify Radius fee, company dollar, and final CDA before PDF generation."
- Status pill: "Auditor Review"
- Right actions:
  - Save verification
  - Finalize CDA
  - More actions dropdown

2. VERIFICATION ALERT BAR
Place below header.

Content:
- "Final verification required"
- "Team Lead and Agent have confirmed. Enter Radius fee and verify company dollar before generating the CDA PDF."

Actions:
- View approvals
- View change log

Design:
- Compact
- Warning/info treatment
- Not loud

3. TRANSACTION CONTEXT CARD
Show:
- Property: 1284 Willow Creek Dr
- Side: Buyer
- Purchase price: $1,000,000
- Commission: 2.5%
- Gross commission: $25,000
- Closing date: Jun 18, 2026
- Team: Keystone Team
- Primary agent: Ila Corcoran
- Team Lead: Rod Watson
- Agent confirmed: Today, 12:18 PM

Keep compact.
Use subtle dividers.

4. MAIN LAYOUT
Two columns:
- Left content: 70%
- Right sticky verification panel: 30%

Rules:
- Frame width 1440px
- Content max-width around 1320px
- Right panel sticky below header
- Compact operational spacing

5. LEFT CONTENT SECTIONS

A. Approval Summary
DocuSign-inspired progress:
- Agent entry: Complete
- Team Lead review: Complete
- Agent confirmation: Complete
- Auditor verification: Current
- Final CDA PDF: Pending

Add small timestamps:
- Agent submitted: 10:42 AM
- TL reviewed: 11:35 AM
- Agent confirmed: 12:18 PM

B. Final Commission Summary
Rows:
- Purchase Price: $1,000,000
- Gross Commission Income: $25,000
- Pre-split deductions: $750
- Split basis: $24,250
- Agent net total: $18,650
- Team portion before Radius fee: $4,850

Rules:
- Read-only except auditor-only fields.
- Calculated rows should look locked.

C. Agent Breakdown Review
Show both agents in compact stacked cards.

Agent 1:
- Ila Corcoran
- Split: 60%
- Plan: 80/20 Standard
- Gross after split: $14,550
- Team portion: $2,910
- Post-split deductions: $425
- Net commission: $11,215
- Status: Confirmed

Agent 2:
- Michael Tran
- Split: 40%
- Plan: 80/20 Standard
- Gross after split: $9,700
- Team portion: $1,940
- Post-split deductions: $325
- Net commission: $7,435
- Status: Confirmed

Rules:
- Mostly read-only.
- Auditor can flag issue.
- Add subtle "Flag discrepancy" action per card.

D. Radius Fee Input Section
This is the most important auditor section.

Rows/fields:
- Team portion before Radius fee: $4,850
- Radius fee type: Manual entry
- Radius fee amount: editable currency input
- Suggested placeholder: $750
- Company dollar: calculated after Radius fee
- Company dollar example: $4,100

Add helper:
"Radius fee is entered manually until automatic calculation is available."

Controls:
- Currency input for Radius fee
- Recalculate button
- Mark verified checkbox

Rules:
- Radius fee is editable only here.
- Company dollar updates visually after fee.
- Use warning/attention styling before verified.
- Use success/complete styling after verified.

E. Company Dollar Verification
Show compact verification card:
- Team portion: $4,850
- Radius fee: $750
- Company dollar: $4,100
- Cap contribution: Calculated in background
- Cap display: Not shown on CDA

Add checkbox:
- "I verified company dollar and Radius fee."

F. PDF Generation Preview
Show disabled-to-enabled state.

Before finalization:
- CDA PDF: Not generated
- DocuSign envelope: Pending
- Export PDF: Disabled

After verification:
- Button: "Generate CDA PDF"
- Button: "Send via DocuSign"

Add helper:
"PDF generation is available after final auditor verification."

G. Audit Notes
Compact textarea:
- Label: "Auditor notes"
- Placeholder: "Add internal notes for finance or compliance."
- Small save note action

H. Change Log
Compact activity list:
- Agent submitted CDA details
- TL updated commission plan
- Agent confirmed net commission
- Auditor opened verification
- Radius fee pending

Keep low visual weight.

6. RIGHT STICKY VERIFICATION PANEL
Use Finance Side Summary Panel component.

Show:
- Gross commission: $25,000
- Pre-split deductions: $750
- Split basis: $24,250
- Agent net total: $18,650
- Team portion: $4,850
- Radius fee: $750 editable/verified
- Company dollar: $4,100
- Status: Auditor Review

Validation block:
- Agent confirmed
- Team Lead confirmed
- Radius fee required
- Company dollar not verified / verified

Actions:
- Save verification
- Finalize CDA
- Generate PDF disabled until verified
- Send via DocuSign disabled until finalized

Dirty state:
- "Unsaved auditor changes"

7. STICKY ACTION BAR
Include:
- Save verification
- Finalize CDA
- Generate PDF disabled until finalized
- Send via DocuSign disabled until PDF generated
- Status: Auditor Review

8. INLINE EDIT / PERMISSION STATES
Editable:
- Radius fee amount
- Auditor notes
- Verification checkbox

Read-only:
- Purchase price
- Commission rate
- Agent splits
- Team split
- Agent deductions
- Net commission

Rules:
- Read-only fields must look intentionally locked.
- Auditor can flag but not casually edit agent values.
- Use Lucide lock/check/alert icons subtly.

9. MICROCOPY
Add subtle helper text:
- "Radius fee requires manual auditor entry."
- "Company dollar = team portion minus Radius fee."
- "Cap contribution is calculated in background."
- "CDA PDF can be generated after final verification."

ACCEPTANCE CRITERIA:
- New frame named "04_CDA_Auditor_Verification_Page"
- Existing component page remains intact
- Missing reusable components added only to "01_CDA_Components_Page" under "Added Components for Step 4"
- Auditor page clearly focuses on Radius fee and company dollar
- Auditor can finalize CDA
- PDF and DocuSign actions exist
- Agent/TL values are mostly read-only
- Right sticky verification panel exists
- Approval flow feels DocuSign-inspired
- UI feels Stripe-style operational finance
- No mobile screens
- No settings screens
- No unrelated CRM UI