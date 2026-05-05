# Decision Log: Visual Editor Synchronization

## Date: 2026-05-05

### Issue
Visual Editor preview edits were not synchronized with the property inspector panel until blur.

### Decision
Implement real-time synchronization using `onInput` in `EditableElement`.

### Technical Details
- Added `onInput` handler to `EditableElement` components for real-time capture.
- Refactored `VisualEditorContext` to use a `useEffect` for `postMessage` synchronization, ensuring reliable and consistent updates from child to parent whenever `contentData` changes.
- Fixed image previews in the `PropertyInspector` by passing and prepending the `frontendUrl` to relative image paths.
- Guarded `useEffect` DOM updates in `EditableElement` with `document.activeElement` check to prevent React from overwriting the DOM while the user is typing.

### Consequences
- **Positive**: Real-time feedback for editors, better UX.
- **Negative**: Increased number of `postMessage` calls between iframe and parent. (Considered acceptable for typical page sizes).
