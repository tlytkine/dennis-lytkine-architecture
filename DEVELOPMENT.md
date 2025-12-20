# Development Guide - Dennis Lytkine Architecture Website

## Project Overview
Professional architecture website for Dennis Lytkine (AIA, NCARB, LEED Green Associate) based in Fort Myers, Florida.

**Live Site**: https://tlytkine.github.io/dennis-lytkine-architecture/
**GitHub Repository**: https://github.com/tlytkine/dennis-lytkine-architecture

## Contact Information
- **Name**: Dennis Lytkine
- **Phone**: 347-830-5763
- **Location**: Fort Myers, Florida
- **Credentials**: AIA, NCARB, LEED Green Associate

## Project Structure
```
dennis_website/
├── index.html          # Main HTML file with all page content
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript for interactivity
├── README.md           # Project description
├── DEVELOPMENT.md      # This file - development instructions
└── .gitignore          # Git ignore rules
```

## File Descriptions

### index.html
Contains the entire website structure:
- **Navigation bar** - Links to different sections
- **Hero section** - Dennis's name, credentials, tagline
- **Services section** - 6 service cards (licensing, approvals, design, consulting, sustainability, code compliance)
- **About section** - Credentials and experience
- **Contact section** - Phone number, location, contact form
- **Footer** - Copyright and credentials

### styles.css
All visual styling including:
- Color scheme (primary: #2c3e50, secondary: #3498db, accent: #e67e22)
- Responsive design for mobile, tablet, desktop
- Hover effects and animations
- Grid layouts for services and content sections

### script.js
Interactive features:
- Smooth scrolling navigation
- Mobile menu toggle
- Contact form handling
- Scroll animations
- Navbar transparency effects

## How to Make Changes

### Local Development (Preview Changes)
1. Open `/Users/timothylytkine/Documents/dennis_website/index.html` in any browser
2. Make edits to files using any text editor or Claude
3. Refresh browser to see changes

### Publishing Changes to Live Site
After making changes, run these commands in `/Users/timothylytkine/Documents/dennis_website/`:

```bash
git add .
git commit -m "Description of your changes"
git push origin main
```

The live site updates automatically in 1-2 minutes.

## Common Changes

### Update Phone Number
**File**: `index.html`
**Location**: Line ~108, in the contact section
```html
<a href="tel:347-830-5763">347-830-5763</a>
```

### Update Services
**File**: `index.html`
**Location**: Lines ~35-60, services section
Each service is a `.service-card` div with icon, title, and description.

### Change Colors
**File**: `styles.css`
**Location**: Lines 8-14, CSS variables
```css
--primary-color: #2c3e50;    /* Dark blue-gray */
--secondary-color: #3498db;   /* Bright blue */
--accent-color: #e67e22;      /* Orange */
```

### Update Credentials/Experience
**File**: `index.html`
**Location**: Lines ~64-95, about section
Edit the credentials list and experience list.

### Add Email Address
Currently the site only has phone. To add email:
1. Add to contact section in `index.html`
2. Update form handling in `script.js` to send emails

## GitHub Authentication

For future pushes, you have options:

### Option 1: GitHub Desktop (Recommended - Easiest)
1. Download: https://desktop.github.com
2. Sign in with your GitHub account
3. Add existing repository: `/Users/timothylytkine/Documents/dennis_website`
4. Push changes with one click

### Option 2: Personal Access Token
1. Create token: https://github.com/settings/tokens
2. Select "repo" scope
3. Use token when prompted for password during `git push`

### Option 3: SSH Key
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add to GitHub: https://github.com/settings/keys
3. Change remote to SSH:
```bash
git remote set-url origin git@github.com:tlytkine/dennis-lytkine-architecture.git
```

## Working with Claude

### To Continue Development:
Simply tell Claude:
- "I want to update Dennis's website" - Claude can read this DEVELOPMENT.md file
- "Change the phone number to XXX-XXX-XXXX"
- "Add a new service called [name]"
- "Change the colors to [description]"
- "Add a photo gallery section"

### What Claude Knows:
Claude has access to all project files and can:
- Read and edit HTML, CSS, JavaScript
- Preview changes locally
- Commit and push to GitHub
- Test responsive design
- Add new features

### File Paths for Claude:
- Project root: `/Users/timothylytkine/Documents/dennis_website/`
- All files are in this single directory (no subdirectories)

## Deployment Info

**Platform**: GitHub Pages
**Branch**: main
**Deploy folder**: / (root)
**Build time**: 1-2 minutes after push
**HTTPS**: Automatically enforced

## Browser Testing
Test the site in:
- Chrome/Safari (desktop)
- Mobile browsers (responsive design)
- Different screen sizes

## Support Resources
- GitHub Pages Docs: https://docs.github.com/en/pages
- HTML Reference: https://developer.mozilla.org/en-US/docs/Web/HTML
- CSS Reference: https://developer.mozilla.org/en-US/docs/Web/CSS

## Future Enhancement Ideas
- Add project portfolio/gallery
- Add testimonials section
- Add blog for architectural insights
- Add more detailed service pages
- Custom domain (e.g., dennislytkine.com)
- Contact form backend (currently frontend only)
- Add LinkedIn link
- Add professional headshot
- SEO optimization
- Google Analytics

---

**Last Updated**: December 19, 2025
**Maintained by**: Tim Lytkine (for Dennis Lytkine)
