# Decisions

Use this for locked project decisions.

Decisions override summaries.

### 2026-05-08 — Tag Sheet Behavior

Decision:
- Tags are managed from a dedicated bottom sheet, not inline on the client page.
- Users can search existing tags, create a new tag from the search field, edit a tag name, and delete a tag with confirmation.
- Tags behave as a shared master list across clients, while each client keeps its own selected tag set.
- Tapping a tag toggles selection on and off.
- Creating a tag trims whitespace, requires a non-empty unique name, and auto-selects the new tag for the current client.
- Deleting a tag removes it from the master list and from any selected client state.

Reason:
- This keeps tag management consistent, fast, and easy to reason about for both browsing and editing.

Applies To:
- Client profile tag management
- Tag creation, selection, edit, and delete flows

Impact:
- The UI can rely on one canonical tag model and one canonical bottom-sheet interaction pattern.
- Future tag work should preserve the shared-master-list behavior and selection toggle behavior.

Status:
Final

Owner:
unknown

## Template

### YYYY-MM-DD — Decision Title

Decision:
-

Reason:
-

Applies To:
-

Impact:
-

Status:
Proposed | Final | Reversed

Owner:
unknown
