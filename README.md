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

- ~~Part 1 Due Date: 28 April 2026~~
- Part 2 Due Date: 29 May 2026
- POE Due Date: 19 June 2026

Current status: Part 1 implementation (HTML-only foundation, no CSS and no JavaScript).

## Part 1 Scope

Part 1 details were moved into a dedicated document:

- [Part 1 Scope and Deliverables](PART1.md)
- [Full Project Plan Reference](PROJECT_PLAN.md)

## Part 2 and POE

Part 2 and POE planning details were moved into dedicated documents:

- [Part 2 Scope and Targets](PART2.md)
- [Full Project Plan (Part 1 + Part 2 + POE)](PROJECT_PLAN.md)

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
|- PART1.md
|- PART2.md
|- PROJECT_PLAN.md
|- css/
|- js/
|- images/
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
- Structured forms with `fieldset` and `legend`
- Built-in HTML5 validation (`required`, `email`, `tel`, `number`, `pattern`)
- Contact details using `address`, `mailto`, and `tel`

## How to Run Locally

1. Open the project folder in VS Code.
2. Open `index.html` in your browser. (when using the vsCOde you can right click on the `index.html` file and select Open with Live Server).
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
