# Safe Paws Project Plan (Part 1 + Part 2 + POE)

## 1. Project Overview

**Project name:** Safe Paws Pet Adoption Website  
**Module:** WEDE5020 - Introduction to Web Development  
**Institution:** IIE Rosebank College  
**Current status:** Part 1 completed (HTML foundation submitted), Part 2 and POE in progress  
**Project milestones:**
- Part 1 due: **28 April 2026** (completed)
- Part 2 due: **29 May 2026**
- POE due: **19 June 2026**

### 1.1 Purpose
Develop the Safe Paws website from a semantic HTML prototype into a complete, styled, responsive, and user-friendly multi-page website suitable for academic assessment and portfolio presentation.

### 1.2 Existing Scope Already Implemented
The project already includes:
- 6 HTML pages: Home, About, Adoption, Contact, Enquiry, FAQ
- Semantic structure (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Basic accessibility elements (skip link, `aria-current`, labels, fieldsets)
- Native HTML interactions (`details`/`summary` in FAQ)
- Multiple forms with built-in validation
- Local image categories for pets

### 1.3 Part 1 Summary (Completed)
Part 1 focused on creating a complete semantic HTML website foundation. The completed work includes:
- Planning and structuring six linked pages
- Creating consistent navigation and page layout
- Building multiple functional forms using native HTML validation
- Adding accessibility basics such as skip links, labels, and semantic headings
- Organizing project assets into a clean folder structure (`css/`, `js/`, `images/`)

### 1.4 Part 1 Evidence Available for Submission
- Complete HTML files for all required pages
- Working internal navigation between pages
- Form structures with required fields and valid input types
- Accessible markup elements (`main`, `section`, `article`, `label`, `fieldset`, `legend`)
- README with project overview and timeline context

### 1.5 Out of Scope (for current module phase)
- Backend database and server-side processing
- Real-time authentication/accounts
- Production payment system

## 2. Goals and Success Criteria

### 2.1 Primary Goals
1. Build a consistent visual identity across all pages using CSS.
2. Make the site responsive for mobile, tablet, and desktop.
3. Improve usability and readability of pet listings and forms.
4. Add light JavaScript enhancements that improve UX without breaking core HTML functionality.
5. Produce POE-ready evidence: testing, validation, screenshots, and documentation.

### 2.2 Success Criteria (Measurable)
- All pages share one consistent layout system and visual style.
- No horizontal scroll on mobile at common breakpoints (360px+, 768px+, 1024px+).
- All major user journeys are functional:
  - Browse pets
  - Open details
  - Navigate between pages
  - Submit enquiry/adoption/contact forms
- HTML and CSS pass W3C validation with no critical errors.
- Accessibility checks show no critical issues (labels, heading order, keyboard navigation, contrast).
- Final repository is clean, structured, and deployable via GitHub Pages.

## 3. Deliverables

### 3.1 Part 1 Deliverables (by 28 Apr 2026) - Completed
1. Semantic HTML implementation for all six pages.
2. Consistent site navigation and footer links.
3. Core content sections for Home, About, Adoption, Contact, Enquiry, and FAQ.
4. HTML forms with field grouping and native validation.
5. Project repository structure prepared for Part 2 and POE expansion.

### 3.2 Part 2 Deliverables (by 29 May 2026)
1. Global stylesheet(s) in `css/` (base, layout, components, utilities as needed).
2. Optional JavaScript enhancements in `js/`.
3. Updated HTML pages linked to CSS/JS with improved structure consistency.
4. Responsive layouts for all six pages.
5. Updated `README.md` with run instructions and feature summary.

### 3.3 POE Deliverables (by 19 June 2026)
1. Final polished website (content + UI + UX).
2. Testing and validation report (manual test matrix + validator results).
3. Accessibility evidence (checklist and screenshots).
4. Deployment evidence (live GitHub Pages URL + screenshots).
5. Final submission package (source, documentation, evidence files).

## 4. Work Breakdown Structure (WBS)

## 4.1 Part 1 Work Completed (Retrospective)
- Created project information architecture and page hierarchy.
- Implemented semantic HTML templates across all required pages.
- Added accessible and structured forms for enquiry, contact, and adoption.
- Added FAQ content using native interactive HTML (`details` and `summary`).
- Established reusable content patterns to support future CSS/JS enhancements.

## 4.2 Foundation and Design System
- Define visual direction: colors, typography, spacing scale, buttons, links, cards.
- Create CSS custom properties (`:root` variables).
- Add normalization/base rules (box model, body defaults, image responsiveness).
- Build reusable layout containers and section spacing patterns.

## 4.3 Navigation and Shared Layout
- Standardize header/footer across all pages.
- Ensure active page state style is clear and consistent.
- Improve skip-link visibility on keyboard focus.
- Ensure footer links and contact info are consistent in all files.

## 4.4 Page-Specific Implementation

### Home (`index.html`)
- Style hero area and CTA.
- Convert featured animals into responsive card grid.
- Improve browse-by-type sections and visual hierarchy.
- Improve quick enquiry form styling and spacing.

### About (`about.html`)
- Improve readability of long-form content.
- Style mission/impact/team sections with clear section cards or blocks.
- Add better visual grouping for stats and values.

### Adoption (`adoption.html`)
- Style available pets as consistent cards.
- Improve scanability of pet attributes (breed/age/gender).
- Improve large adoption form UX (field grouping, spacing, required indicators).

### Contact (`contact.html`)
- Highlight contact details as key information block.
- Style contact form with clear labels, focus states, and submit action.
- Improve "ways to help" list into structured content blocks.

### Enquiry (`enquiry.html`)
- Standardize visual form style to match contact/adoption pages.
- Improve message and preferred contact method sections.
- Add friendly success/next-step messaging style.

### FAQ (`faq.html`)
- Style `details` components for clarity and accessibility.
- Improve spacing and structure for long FAQ categories.
- Add optional JS enhancement to support "expand/collapse all" (non-essential).

## 4.5 JavaScript Enhancements (Lightweight)
- Add small progressive enhancements only:
  - Form helper messages
  - Optional FAQ controls
  - Simple smooth scrolling for internal links
- Ensure site is fully usable when JavaScript is disabled.

## 4.6 Quality Assurance and Documentation
- Cross-browser checks (Chrome, Edge, Firefox recommended).
- Responsive checks at multiple viewport sizes.
- Link checking and image path verification.
- Validation and accessibility checks.
- Prepare evidence artifacts for POE.

## 5. Timeline and Milestones

## 5.1 Phase Plan (Date-Based)

### Phase 0: Part 1 Foundation (01 Apr - 28 Apr) - Completed
- Planned site structure and content architecture.
- Built all required pages using semantic HTML.
- Implemented navigation, forms, and FAQ interactions.
- Performed initial content and structure checks.

**Milestone M0:** Part 1 submitted (HTML foundation complete).

### Phase 1: UI Foundation (29 Apr - 06 May)
- Define design tokens and global styles.
- Build shared header/footer and base layout classes.
- Link CSS in all pages.

**Milestone M1:** Shared design system applied on all pages.

### Phase 2: Page Styling and Responsiveness (07 May - 17 May)
- Complete page-by-page styling for all six pages.
- Implement responsive behavior for cards, forms, navigation.
- Improve typography and section hierarchy.

**Milestone M2:** All pages are readable, responsive, and visually consistent.

### Phase 3: JS Enhancements and QA (18 May - 24 May)
- Add optional JavaScript UX enhancements.
- Fix bugs from manual testing.
- Run validation and accessibility pass.

**Milestone M3:** Feature complete and ready for Part 2 submission.

### Phase 4: Part 2 Submission Buffer (25 May - 29 May)
- Final polish and small refinements.
- Update README and capture evidence screenshots.
- Submit Part 2.

**Milestone M4:** Part 2 submitted.

### Phase 5: POE Hardening (30 May - 12 Jun)
- Improve consistency, polish, and content quality.
- Expand test evidence and documentation.
- Prepare final presentation narrative.

**Milestone M5:** POE candidate ready for final review.

### Phase 6: Final POE Packaging (13 Jun - 19 Jun)
- Final validation and proof checks.
- Verify GitHub Pages deployment and links.
- Compile and submit final POE package.

**Milestone M6:** POE submitted.

## 5.2 Submission Readiness Checklist by Phase

### Part 1 (Completed)
- Required pages created and linked
- Semantic structure implemented
- Forms and accessibility basics included

### Part 2 (In Progress)
- Visual design system implemented
- Responsive behavior verified
- Enhanced UX and consistency delivered

### POE (Final)
- Testing and validation evidence compiled
- Deployment proof documented
- Final package prepared for submission

## 6. Roles and Responsibilities (Solo Student Plan)

- **Designer:** Define visual system, layout, and readability.
- **Frontend Developer:** Implement HTML/CSS/JS updates.
- **QA Tester:** Execute test matrix and fix defects.
- **Documenter:** Maintain README, evidence logs, and submission notes.

(If this is an individual project, one student performs all roles.)

## 7. Risk Management

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Time pressure near deadline | High | Medium | Use weekly milestones and 3-4 day buffer before each due date |
| Inconsistent styling across pages | Medium | High | Use shared CSS variables/components and reuse classes |
| Mobile layout breaks | High | Medium | Test each page at defined breakpoints during implementation |
| Form usability issues | Medium | Medium | Standardize label/input spacing and required/error cues |
| Validation issues before submission | Medium | Medium | Run validation checks after each phase, not only at end |
| Broken links/images | Medium | Low | Use link-check pass and page-by-page navigation test |

## 8. Quality Plan

### 8.1 Testing Checklist
- Navigation links functional on all pages.
- Active navigation state correct per page.
- Forms accept valid input and block invalid required fields.
- Phone/email patterns behave correctly.
- FAQ expand/collapse works as expected.
- All images load and have meaningful `alt` text.
- Keyboard-only navigation works for menus and forms.
- Focus states are visible.
- Color contrast is readable.
- No overlapping content at mobile widths.

### 8.2 Validation Targets
- HTML validation: no critical errors.
- CSS validation: no critical errors.
- Accessibility: no critical blockers in basic checks.

### 8.3 Evidence to Collect
- Before/after screenshots for each page.
- Validator result screenshots.
- Mobile/tablet/desktop screenshots.
- Test matrix with pass/fail and fixes.

## 9. Suggested File and Asset Plan

- Keep HTML pages at root as currently structured.
- In `css/`, split into:
  - `styles.css` (or)
  - `base.css`, `layout.css`, `components.css`, `pages.css`
- In `js/`, add:
  - `main.js` for optional enhancements
- In `images/`, keep existing category folders and optimize image sizes if needed.

## 10. Weekly Execution Checklist

### Week 1
- Finalize design tokens and base styles
- Apply shared layout to all pages

### Week 2
- Complete Home/About/Adoption styling
- Start responsive adjustments

### Week 3
- Complete Contact/Enquiry/FAQ styling
- Add JS enhancements and run QA

### Week 4 (Part 2 Week)
- Final bug fixes
- Documentation and submission

### POE Weeks
- Polish + evidence + final packaging

## 11. Definition of Done

The project is complete when:
1. All six pages are visually consistent and responsive.
2. All key user tasks are functional without JavaScript dependence.
3. Validation/testing evidence is documented.
4. GitHub repository is organized and up to date.
5. Live deployment works and is included in final submission evidence.

## 12. Immediate Next Actions (Priority Order)

1. Create and link a global stylesheet to all HTML pages.
2. Implement shared header/footer styles and consistent spacing system.
3. Build reusable pet card and form styles.
4. Complete responsive behavior for all pages.
5. Run validation/accessibility checks and log findings.
6. Capture evidence and update README for submission.
