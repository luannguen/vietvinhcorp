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

---

## Date: 2026-10-04

### Issue
Customer requested 6 crucial enhancements:
1. Contact page displayed legacy "VVC" placeholder texts during initial page loading.
2. Footer layout was unbalanced, logo & slogan were small and shifted left, and text was low-contrast.
3. Home hero banner photos were darkened by excessive black background overlay layers.
4. Header logo spilled out below the navbar border when scrolling.
5. Opening pages flashed outdated/default content before database records hydrated.
6. Default system language needed to be English (EN).

### Decision
- Implemented **Stale-While-Revalidate (SWR) Local Storage caching** in `useSettings.ts` and `VisualEditorContext.tsx`.
- Added elegant Skeleton loader in `Contact.tsx` and updated default company fallbacks to "VIETVINH INDUSTRIES CORPORATION".
- Replaced double dark overlays in `HomeBannerSlider.tsx` and `HeroSection.tsx` with a soft directional gradient + text drop-shadow, making banner photography vivid while preserving readability.
- Standardized navbar logo sizing and bounded container in `Logo.tsx` and `Header.tsx` so the logo is contained and never protrudes when scrolling.
- Re-architected `Footer.tsx` typography and branding: increased logo size (`h-20 lg:h-24`), enlarged slogan font (`text-base text-gray-200 font-medium`), boosted contrast for menu links, contact lines and office details.
- Configured default language in `i18n.ts` and `LanguageSwitcher.tsx` to `en` with fallback to English.

### Consequences
- **Positive**: Zero FOUC / content flashing on page load, instant load feeling, professional brand consistency, polished UI/UX adhering to Design System.
- **Negative**: Cached content needs SWR invalidation on update (handled automatically via background re-fetch).

