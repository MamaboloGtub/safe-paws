# Safe Paws

School Portfolio of Evidence Website Project

## School
- IIE Rosebank Colege
## Qualification
- Bachelor of Information Technology in Business Systems
## Module
- WEDE5020 - Introdution to web development. 

## Assignment Overview

This repository contains the Safe Paws pet adoption website developed for a school assignment.

- Part 1 Due Date: 28 April 2026
- Part 2 Due Date: 29 May 2026
- POE Due Date: 19 June 2026

Current status: Part 1 implementation (HTML-only foundation, no CSS and no JavaScript).

## Part 1 Scope

The website focuses on semantic HTML structure, navigation, content organization, accessibility basics, and form design using native HTML features.

Implemented pages:

- `index.html` (Home)
- `about.html` (About Safe Paws)
- `adoption.html` (Available pets + adoption form)
- `contact.html` (Contact details + contact form)
- `enquiry.html` (General enquiry form)
- `faq.html` (Expandable FAQ using `details` and `summary`)

## Project Structure

```text
safe-paws/
|- index.html
|- about.html
|- adoption.html
|- contact.html
|- enquiry.html
|- faq.html
|- README.md
|- css/
|- js/
|- images/
	|- cats/
	|- dogs/
	|- hamster_rabbit/
```

## Key HTML Features Included

- Semantic sections (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Accessible navigation (`aria-current`, skip links)
- Native interactive HTML (`details` and `summary` in FAQ)
- Structured forms with `fieldset` and `legend`
- Built-in HTML5 validation (`required`, `email`, `tel`, `number`, `pattern`)
- Contact details using `address`, `mailto`, and `tel`

## How to Run Locally

1. Open the project folder in VS Code.
2. Open `index.html` in your browser.
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
https://YOUR_USERNAME.github.io/safe-paws
```

## Roadmap for Part 2 and POE

Part 2 target areas:

- Add CSS styling and responsive layout
- Improve visual hierarchy and spacing
- Add consistent page-level design system

POE target areas:

- Final refinements across content and UX
- Validation and testing evidence
- Final documentation and submission packaging

## Author

Student project for WEDE Portfolio of Evidence.
