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


---

## Date: 2026-11-06

### Issue
1. Footer logo had a raised box border (`bg-white/10 p-2.5 rounded-xl border border-white/15`) and did not align evenly in width with the slogan line below it (`"Chuyên nghiệp - Tận tâm - Tân tiến"`).
2. Footer contact email (`contact@vietvinhcorp.com`) wrapped onto two lines due to narrow `lg:col-span-2` column and `break-all`.
3. Admin CMS (`SettingsPage.tsx`) lacked direct controls for Footer logo Media Library selection, custom logo width, multi-language Footer slogan (`vi`/`en`), and live Footer preview.

### Decision
- Removed the raised border/background box on the Footer logo in `Footer.tsx` and grouped Logo + Slogan in an `inline-flex flex-col items-center` container where the logo defaults to `w-0 min-w-full` (matching the exact width of the slogan line below) or uses `footer_logo_width` if customized by Admin.
- Rebalanced Upper Footer grid in `Footer.tsx` (`lg:col-span-3` Brand, `lg:col-span-2` per menu, `lg:col-span-3` Fast Contact) and replaced `break-all` with `whitespace-nowrap` on the email and hotline links.
- Upgraded `SettingsPage.tsx` with `ImagePickerModal` (Media Library selection), Live Footer Preview on `#0B3B8C` background, Footer Logo Width control (`footer_logo_width`), bilingual Footer Slogan (`site_description`/`footer_slogan` & `site_description_en`/`footer_slogan_en`), bilingual Copyright (`copyright_text` & `copyright_text_en`), quick Footer Contact inputs (`contact_hotline`, `contact_email`), and a shortcut to Footer Menu Manager (`/menu`).

---

## Date: 2026-11-06 (Projects Module & Visual Editor Overhaul)

### Issue
1. Spelling/encoding corruption `"Vi?t Vinh Corporation"` appeared on `/projects` (`featured_projects_desc`) and in 22 other translation keys across `vi/translation.json` and `en/translation.json`, plus unstyled `.btn-accent` / `.btn-white` CTA buttons in `Projects.tsx`.
2. Admin could not find `/projects` to edit its content because:
   - `Projects.tsx` was hardcoded and not wrapped in `VisualEditorProvider` / `VisualPageRenderer`.
   - `useVisualEditor.ts` threw `Không tìm thấy trang này` if a system page (`projects`, `services`, `home`, etc.) did not yet have a record in `static_pages`.
   - `PagesPage.tsx` only listed existing DB rows and had no quick links for core system pages.
   - `ProjectsPage.tsx` had no shortcut to the Visual Editor and mistakenly called `productService.getCategories()` (which filtered `.eq('type', 'product')`), making the Project Category dropdown in `ProjectForm.tsx` always empty.

### Decision
- Fixed all 23 occurrences of `"Vi?t Vinh Corporation"` across `vrcfrontend/src/locales/vi/translation.json` and `vrcfrontend/src/locales/en/translation.json`.
- Built 3-layer Projects architecture:
  - Hook `useProjectsData.ts` with `localStorage` SWR caching (`vrc_projects_list_cache`, `vrc_project_cats_cache`), instant search, and category/featured filters.
  - Visual Editor blocks `ProjectHeroBlock` (`project_hero`), `ProjectOverviewBlock` (`project_overview`), and `ProjectShowcaseBlock` (`project_showcase`) in `ProjectBlocks.tsx`, registered in both `vrcfrontend` and `backend/BlockLibrary.tsx`.
  - Refactored `vrcfrontend/src/pages/Projects.tsx` to use `VisualEditorProvider slug="projects"` and `VisualPageRenderer` with bilingual (`vi`/`en`) default sections and anti-FOUC skeleton loading.
  - Upgraded `ProjectDetail.tsx` (XSS-safe HTML rendering via `sanitizeHtml`, working Share / Copy Link button, Related Projects section, Skeleton loader) and `ProjectCategory.tsx`.
- Upgraded `backend/src/hooks/useVisualEditor.ts` to support virtual system pages (creating the `static_pages` row automatically on first save and preserving child default sections when DB sections are empty).
- Added Core System Pages quick-edit cards in `PagesPage.tsx` and upgraded `ProjectsPage.tsx` + `ProjectForm.tsx` with Visual Editor shortcut, `categoryService.getCategories('project')`, inline quick-create category, `ImagePickerModal` + direct upload, `ReactQuill` rich text editor, RBAC permission guards, and featured toggle.
