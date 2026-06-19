# Safe Paws

School Portfolio of Evidence Website Project

## School
- IIE Rosebank College
## Qualification
- Bachelor of Information Technology in Business Systems
## Module
- WEDE5020 - Introduction to web development. 

## Assignment Overview

This repository contains the Safe Paws pet adoption website developed for a school assignment.

- ~~Part 1 Due Date: 28 April 2026~~
- Part 2 Due Date: 29 May 2026
- POE Due Date: 19 June 2026

Current status: Part 3 implementation (JavaScript enhancements, SEO, form validation, AJAX submission, and deployment).

## ChangeLog 
Find the changelog here: [release](https://github.com/MamaboloGtub/safe-paws/releases)

### Part 3 Changelog (Enhancing Functionality and SEO)

| Date | Change | Details |
|------|--------|---------|
| 2026-06-19 | JavaScript interactive elements | Added tab navigation (index.html featured animals, about.html explore tabs) with full keyboard accessibility (ArrowLeft/Right, Home, End). Implemented FAQ accordion behaviour that auto-closes sibling items when one opens. |
| 2026-06-19 | Modals and lightbox gallery | Built Quick View modal for adoption pet cards and "See More Pets" paginated gallery modal with 30 extra images across dogs, cats, and rabbits. Both modals support Escape key close and backdrop click. |
| 2026-06-19 | Interactive Leaflet map | Integrated Leaflet.js on contact.html to display Safe Paws location in Polokwane. Map lazy-loads via IntersectionObserver for page speed optimisation. |
| 2026-06-19 | CSS and JS animations | Added scroll-reveal animations using IntersectionObserver, CSS keyframe slideshow on homepage, hover transitions on cards, and FAQ summary nudge animation. All animations respect prefers-reduced-motion. |
| 2026-06-19 | Dynamic pet directory | Built JavaScript-powered pet listing on adoption.html with real-time search (by name, breed, description), type filtering (dogs/cats/rabbits), and sorting (name A-Z/Z-A, age youngest/oldest). |
| 2026-06-19 | Enquiry form contextual response | After validation, enquiry form now displays a relevant response panel showing adoption fees, availability, volunteer schedules, or other details based on the selected enquiry type. |
| 2026-06-19 | Contact form mailto compilation | Contact form now compiles validated input into a pre-filled mailto link (recipient, subject, body) and opens the user's email client to send the message. |
| 2026-06-19 | AJAX form submission | All forms now use fetch() to submit data asynchronously to a mock endpoint (httpbin.org/post). If the network request fails, submissions fall back to localStorage logging gracefully. |
| 2026-06-19 | JavaScript form validation | Implemented comprehensive client-side validation: custom error messages per field, field-level aria-live error display, conditional validation (animal name required when enquiry type is "animal"), character counters on textareas, and real-time error clearing on input. |
| 2026-06-19 | SEO — meta tags and keywords | Added unique title tags, meta descriptions, and meta keywords to all 6 pages. Added canonical URLs, robots meta directives, and referrer policy headers. |
| 2026-06-19 | SEO — robots.txt and sitemap.xml | Created robots.txt allowing all crawlers with sitemap reference. Created sitemap.xml listing all 7 URLs with priority and change frequency. |
| 2026-06-19 | SEO — image optimisation | All images use descriptive alt text, explicit width/height attributes, lazy loading, and async decoding for performance. |
| 2026-06-19 | SEO — page speed | Implemented deferred script loading, IntersectionObserver for lazy map init, force-cache on component fetches, and CSS containment via grid layout. |
| 2026-06-19 | Responsive design | Full mobile responsiveness with grid layout collapsing at 768px and 480px breakpoints. Navbar, forms, cards, and tabs all adapt to small screens. |
| 2026-06-19 | Deployment | Website deployed on GitHub Pages at https://mamabologtub.github.io/safe-paws/ |

## References

- [Image Source References (Harvard Anglia)](REFERENCES.md)

## Part 1 Scope

Part 1 details were moved into a dedicated document:

- [Part 1 Scope and Deliverables](PART1.md)
- [Full Project Plan Reference](PROJECT_PLAN.md)

## Part 2 and POE

Part 2 and POE planning details were moved into dedicated documents:

- [Part 2 Scope and Targets](PART2.md)
- [Full Project Plan (Part 1 + Part 2 + POE)](PROJECT_PLAN.md)

## Part 3 — Enhancing Functionality and SEO

### JavaScript Features
- **Interactive Tabs** — Featured animals (index.html) and About page with full keyboard navigation
- **FAQ Accordion** — Auto-closing sibling items using `details`/`summary` with JS enhancement
- **Modals** — Quick View lightbox for pet cards and paginated "See More Pets" gallery (30 images)
- **Interactive Map** — Leaflet.js on contact page showing Polokwane location, lazy-loaded
- **Dynamic Pet Directory** — JS-rendered pet cards with real-time search, filter by type, sort by name/age
- **Animations** — Scroll-reveal (IntersectionObserver), CSS keyframe slideshow, hover transitions
- **Form Validation** — Client-side validation with custom error messages, conditional fields, character counters
- **AJAX Submission** — Forms submit asynchronously via `fetch()` with localStorage fallback
- **Enquiry Response** — Contextual response panel showing fees, availability, or schedules based on enquiry type
- **Contact Mailto** — Form data compiled into a pre-filled `mailto:` link opening the user's email client

### SEO Features
- Unique title tags and meta descriptions per page
- Meta keywords, canonical URLs, robots directives
- robots.txt and sitemap.xml
- Descriptive image alt text and filenames
- Lazy loading, deferred scripts, IntersectionObserver for performance
- Responsive design (768px and 480px breakpoints)

### Deployment
- GitHub Pages: https://mamabologtub.github.io/safe-paws/

## Project Structure

```text
safe-paws/
|- index.html
|- about.html
|- adoption.html
|- contact.html
|- enquiry.html
|- faq.html
|- robots.txt
|- sitemap.xml
es/
	|- cats/
	|- dogs/
	|- hamster_rabbit/
```

## Wireframes

View them in part 2 or follow the link below

- [View All Page Wireframes](PART2.md#wireframes)

## Key HTML Features Included

- Semantic sections (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Accessible navigation (`aria-current`, skip links)
- Native interactive HTML (`details` and `summary` in FAQ)
- Structured forms with `fieldset` and `legend.`
- Built-in HTML5 validation (`required`, `email`, `tel`, `number`, `pattern`)
- Contact details using `address`, `mailto`, and `tel.`

## How to Run Locally

1. Open the project folder in VS Code.
2. Open `index.html` in your browser. (When using the vsCode, you can right-click on the `index.html` file and select Open with Live Server).
3. Navigate through the site using the page links.

## Publish on GitHub Pages

### 1. Create a GitHub Repository

1. Sign in to GitHub.
2. Create a new public repository (for example: `safe-paws`).

### 2. Push the Project

Run in PowerShell from the project folder:

```powershell
cd c:\Users\TshepoMahudu\Documents\RC\WEDE5020\safe-paws

git init
git add .
git commit -m "Initial Safe Paws website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/safe-paws.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to `Settings` > `Pages`.
3. Under source, choose `Deploy from a branch`.
4. Select branch `main` and folder `/ (root)`.
5. Save.

Your site URL will be:

```text
https://mamabologtub.github.io/safe-paws/
```



## Author

Student project for WEDE Portfolio of Evidence.
