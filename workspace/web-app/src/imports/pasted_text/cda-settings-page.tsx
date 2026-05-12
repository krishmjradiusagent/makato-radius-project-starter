Create Step 5 as a NEW separate page frame.

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

EXISTING SOURCE FRAME:
"01_CDA_Components_Page"
- CDA component library.
- Source of truth.
- Do not restyle existing components.
- Do not delete existing components.
- Do not damage layout.

NEW FRAME TO CREATE:
"05_CDA_Settings_Page"
- Width: 1440px
- Desktop only
- Purpose: Team Lead / Admin settings for configuring Commission Plans and Fee Types.

COMPONENT RULE:
- Use components from "01_CDA_Components_Page".
- If a reusable component is missing, add it inside "01_CDA_Components_Page".
- Add missing components under section: "Added Components for Step 5".
- Then reuse/copy into "05_CDA_Settings_Page".
- Do NOT create local-only reusable components inside the page.

NAVIGATION RULE:
Add small prototype navigation chips.

On "01_CDA_Components_Page":
- Keep existing chips.
- Add chip: "Open CDA Settings"
- Link to "05_CDA_Settings_Page"

On "05_CDA_Settings_Page":
- Add chips:
  - "Open Components"
  - "Open CDA Breakdown"
  - "Open TL Review"
  - "Open Auditor Verification"
- Link each chip to correct frame.

Do not modify existing frames except nav chips and missing Step 5 components.

PAGE CONTEXT:
CDA = Closing Disclosure Audit.
This page lives in Settings under a new "CDA" section.
Team Leads/Admins use it to create and manage commission plans and fee types.
These settings drive default CDA calculations inside Deal Terms.

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

BUILD "05_CDA_Settings_Page" STRUCTURE:

1. HEADER
Include:
- Breadcrumb: "Settings / CDA"
- Back button: "Back to Settings"
- Title: "CDA Settings"
- Subtitle: "Configure commission plans and fee types used in CDA calculations."
- Right actions:
  - Save changes
  - Add commission plan
  - Add fee type

Header rules:
- Compact
- No hero treatment
- Subtle separator below

2. SETTINGS OVERVIEW STRIP
Compact strip below header.

Show 4 small stat cards:
- Commission plans: 4
- Fee types: 6
- Assigned agents: 18
- Unassigned agents: 3

Rules:
- Compact
- Not dashboard-heavy
- Low visual weight

3. MAIN LAYOUT
Two-column content layout.

Left column: 58%
Right column: 42%

Left:
- Commission Plans section

Right:
- Fee Types section

Frame:
- Width 1440px
- Content max-width around 1320px
- Center content
- Use shadcn spacing tokens

4. COMMISSION PLANS SECTION
Use Card + Section Header.

Title:
"Commission Plans"

Subtitle:
"Create default split structures for agents and teams."

Top right:
- Add commission plan button

List rows:
1. 80/20 Standard
   - Type: Standard
   - Split: Agent 80% / Team 20%
   - Cap: $18,000
   - Assigned: 12 agents

2. 70/30 Standard
   - Type: Standard
   - Split: Agent 70% / Team 30%
   - Cap: $15,000
   - Assigned: 4 agents

3. Keystone Tiered
   - Type: Tiered
   - Reset: Yearly
   - Deal types: Buyer, Seller
   - Assigned: 2 agents

4. Lease Referral Plan
   - Type: Standard
   - Split: Agent 60% / Team 40%
   - Deal types: Lease, Landlord
   - Assigned: 0 agents

Each row includes:
- Plan name
- Badges: Standard/Tiered
- Split summary
- Assignment count
- Three-dot menu

Three-dot menu options:
- Edit plan
- Assign to agents
- Duplicate
- Archive

Rules:
- Only names and compact metadata.
- No giant plan cards.
- Similar to team members/groups list.
- Clean table/list hybrid.
- Use subtle separators.

5. FEE TYPES SECTION
Use Card + Section Header.

Title:
"Fee Types"

Subtitle:
"Define reusable deductions for CDA calculations."

Top right:
- Add fee type button

List rows:
1. TC Fee
   - Flat
   - Pre-split
   - Team
   - $500
   - Cap: No

2. RM Fee
   - Flat
   - Post-split
   - Agent
   - $300
   - Cap: Yes

3. E&O Fee
   - Flat
   - Post-split
   - Agent
   - $125
   - Cap: No

4. Compliance Review
   - Flat
   - Pre-split
   - Team
   - $250
   - Cap: No

5. Broker Admin Fee
   - Percentage
   - Post-split
   - Team
   - 2%
   - Cap: Yes

6. Sliding Scale Team Fee
   - Percentage
   - Post-split
   - Both
   - Sliding scale
   - Cap: Yes

Each row includes:
- Fee name
- Fee badges:
  - Flat / Percentage
  - Pre-split / Post-split
  - Agent / Team / Both
  - Cap / No cap
- Fee value
- Three-dot menu

Three-dot menu options:
- Edit fee
- Assign default
- Duplicate
- Archive

Rules:
- Compact operational list.
- Fee badges must be easy to scan.
- Avoid loud colors.
- Use existing Fee Badge System.

6. ADD COMMISSION PLAN MODAL PREVIEW
Show modal open state on the page, slightly offset or as overlay preview.

Modal title:
"Add Commission Plan"

Fields:
- Plan name
- Plan type segmented control:
  - Standard
  - Tiered

Standard selected state fields:
- Agent split %
- Team split %
- Cap amount
- Deal types:
  - Buyer
  - Seller
  - Lease
  - Landlord

Toggle:
- Apply as default for selected agents

Actions:
- Cancel
- Save plan

Rules:
- Use shadcn Dialog style.
- Compact.
- Clear validation.
- Split percentages must total 100%.

7. TIERED PLAN ACCORDION PREVIEW
Inside same modal or below modal preview, show collapsed/expanded tier builder section.

Tiered example:
- Tier 1: 1–5 deals / Agent 80% / Team 20%
- Tier 2: 6–10 deals / Agent 85% / Team 15%
- Tier 3: 11+ deals / Agent 90% / Team 10%

Fields:
- Reset period:
  - Monthly
  - Quarterly
  - Yearly
- Based on:
  - Units
  - Volume

Rules:
- Use accordion builder.
- Do not make spreadsheet grid.
- Make tiers clean and fast to edit.

8. ADD FEE TYPE MODAL PREVIEW
Show second compact modal preview or side-by-side modal mock.

Modal title:
"Add Fee Type"

Fields:
- Fee name
- Fee type:
  - Flat
  - Percentage
- Amount:
  - Currency input for flat
  - Percentage input for percentage
- Applies:
  - Agent
  - Team
  - Both
- Timing:
  - Pre-split
  - Post-split
- Percentage basis:
  - Property value
  - GCI
  - Net commission
  - Post-split commission

Toggles:
- Sliding scale
- Contributes to cap

Actions:
- Cancel
- Save fee type

Rules:
- Percentage basis only appears when Percentage selected.
- Sliding scale reveals tier rows.
- Cap toggle is visible and clear.

9. SLIDING SCALE BUILDER PREVIEW
Inside fee modal, show small expanded state.

Rows:
- Up to $8,000 → 65%
- Above $8,000 → 100%

Controls:
- Add tier
- Remove tier

Rules:
- Clean tier rows.
- Easy to understand.
- No spreadsheet look.
- Use compact inputs.

10. ASSIGNMENT PATTERN
Add a small inline assignment preview.

Title:
"Assign defaults"

Show:
- Selected plan: 80/20 Standard
- Assign to agents: Ila Corcoran, Michael Tran, Ava Patel
- Default fees: TC Fee, RM Fee, E&O Fee

Rules:
- This can appear as small drawer/card preview.
- Shows how three-dot menu assignment works.
- Keep low visual weight.

11. VALIDATION STATES
Show subtle validation examples:
- Split total must equal 100%.
- Fee amount is required.
- Percentage basis is required for percentage fees.
- Tier ranges cannot overlap.

12. MICROCOPY
Use concise helper text:
- "Commission plans define default agent/team splits."
- "Fee timing controls whether deductions apply before or after agent allocation."
- "Cap contribution is calculated in background."
- "Assigned defaults apply automatically when CDA is created."

13. ACCEPTANCE CRITERIA
The output is correct only if:
- New frame named "05_CDA_Settings_Page"
- Existing component page remains intact
- Missing reusable components added only to "01_CDA_Components_Page" under "Added Components for Step 5"
- Settings page includes Commission Plans list
- Settings page includes Fee Types list
- Add Commission Plan modal exists
- Standard and Tiered plan states are visible
- Add Fee Type modal exists
- Flat, Percentage, Pre-split, Post-split, Agent, Team, Both are visible
- Sliding scale builder is visible
- Cap contribution toggle is visible
- Three-dot assignment pattern exists
- UI feels Stripe-style operational finance
- No mobile screens
- No unrelated CRM UI