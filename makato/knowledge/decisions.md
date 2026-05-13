# Decisions

This file tracks architectural and product decisions made during development.

---

## Date: 2024-05-10
### Decision: Dedicated Bottom Sheet for Tags
- **Context**: Agent profile tags need management.
- **Decision**: Use a dedicated bottom sheet (`Sheet`) instead of inline editing.
- **Rationale**: Better UX on mobile and more space for tag search/selection.
- **Status**: Final

---

## Date: 2026-05-12
### Decision: Custom Toast Notification System
- **Context**: Need to provide user feedback for actions like "Save Assignments" without adding external dependencies.
- **Decision**: Implemented a lightweight, Vanilla JS toast system that injects DOM elements into a fixed container.
- **Rationale**: Maintains the single-file goal and zero-build requirement while providing modern UX.
- **Status**: Final

### Decision: Centralized Agent State
- **Context**: Multiple panels (Agent List, Settings, Summary, Modal) need to stay in sync.
- **Decision**: Use a global `agents` array as the source of truth and re-render components on change.
- **Rationale**: Simplest way to ensure data consistency in a non-reactive Vanilla JS environment without a state management library.
- **Status**: Final

---

## Date: 2026-05-13
### Decision: Remove Actions from Default Assignments Table
- **Context**: The user wanted to simplify the Default Assignments table.
- **Decision**: Removed the three-dot action menu.
- **Rationale**: Reduces visual noise in the high-density assignment list.
- **Status**: Final

### Decision: Hide Default Assignments Section
- **Context**: The user wanted to hide the Default Assignments table temporarily.
- **Decision**: Commented out the section in both React and HTML.
- **Rationale**: Temporary removal from view while other features are finalized.
- **Status**: Temporary
