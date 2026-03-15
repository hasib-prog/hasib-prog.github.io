# 🛡️ Cybersecurity Portfolio — Setup & Customization Guide

## File Structure
```
/portfolio
├── index.html        ← All content / markup
├── style.css         ← All styling (dark cyber theme)
├── script.js         ← All JavaScript (canvas, typing, scroll, filters)
└── assets/
    ├── resume.pdf    ← Drop your resume here
    ├── images/       ← Profile photo, project screenshots
    └── icons/        ← Any custom icons
```

---

## 🚀 Quick Start (GitHub Pages)

1. Create a new GitHub repo named `yourusername.github.io`
2. Drop all four files into the repo root
3. Put your `resume.pdf` inside `assets/`
4. Push to `main` branch
5. GitHub Pages auto-publishes at `https://yourusername.github.io`

---

## ✏️ Personalizing the Portfolio

### Your Name & Info
- Open `index.html`
- Search for `Your Name` and replace with your real name
- Search for `Your University`, `Your City, Country` etc.

### Profile JSON (About section)
Update the terminal JSON block in the `#about` section.

### Social Links (Contact section)
Replace all `yourusername` placeholders in `#contact`:
```html
href="https://github.com/yourusername"
href="https://linkedin.com/in/yourusername"
href="mailto:your.email@example.com"
href="https://twitter.com/yourusername"
```

### Typed Titles (Hero)
Edit the `phrases` array in `script.js` (initTypedText):
```js
const phrases = [
  'Your Title 1',
  'Your Title 2',
  ...
];
```

---

## ➕ Adding New Projects

Copy this block into `#projects-grid` in `index.html`:

```html
<article class="project-card reveal" data-category="YOUR_CATEGORY" data-delay="1">
  <div class="card-header">
    <div class="card-icon">🔧</div>
    <div class="card-meta">
      <span class="card-category">Category</span>
      <span class="card-status status-complete">Completed</span>
    </div>
  </div>
  <h3 class="card-title">Project Title</h3>
  <p class="card-desc">Description of your project.</p>
  <div class="card-tools">
    <span class="tool-tag">Tool1</span>
    <span class="tool-tag">Tool2</span>
  </div>
  <div class="card-actions">
    <a href="YOUR_GITHUB_URL" class="card-btn btn-github" target="_blank">GitHub</a>
    <a href="YOUR_REPORT_URL" class="card-btn btn-report">📄 Writeup</a>
  </div>
</article>
```

**Valid data-category values:** `malware` | `network` | `siem` | `threat-intel` | `forensics`

To add a new category, add a filter button:
```html
<button class="filter-btn" data-filter="new-category">New Category</button>
```

---

## ➕ Adding New Certifications

Copy a cert card in the `#certifications` section:

```html
<div class="cert-card reveal cert-earned">
  <div class="cert-icon">🏆</div>
  <div class="cert-info">
    <h3 class="cert-name">Cert Name</h3>
    <span class="cert-issuer">Issuer</span>
    <span class="cert-status earned">✓ Earned</span>
  </div>
  <div class="cert-progress">
    <div class="cert-bar"><div class="cert-fill" data-width="100"></div></div>
    <span class="cert-pct">100%</span>
  </div>
</div>
```

Status classes: `earned` | `in-progress` | `planned`

---

## ➕ Adding Writeups / Blog Posts

Copy a writeup card in the `#writeups` section:

```html
<article class="writeup-card reveal">
  <div class="writeup-meta">
    <span class="writeup-date">// Jan 2025</span>
    <span class="writeup-tag">Your Tag</span>
  </div>
  <h3 class="writeup-title">Post Title</h3>
  <p class="writeup-excerpt">Short description...</p>
  <a href="YOUR_LINK" class="writeup-link">Read Writeup →</a>
</article>
```

---

## ➕ Adding Achievements

Copy a timeline item in the `#achievements` section:

```html
<div class="timeline-item reveal">
  <div class="timeline-dot"></div>
  <div class="timeline-content">
    <div class="timeline-header">
      <span class="timeline-type type-ctf">🏴 CTF</span>
      <span class="timeline-date">2025</span>
    </div>
    <h3 class="timeline-title">Achievement Title</h3>
    <p class="timeline-desc">Description...</p>
  </div>
</div>
```

Type classes: `type-ctf` | `type-academic` | `type-award`

---

## 🎨 Theming (CSS Variables)

All colors are in `:root` at the top of `style.css`:

```css
--accent-blue:   #00c8ff;   /* Primary accent */
--accent-green:  #00ff9d;   /* Secondary accent */
--bg-primary:    #070b0f;   /* Page background */
--bg-card:       #0f1822;   /* Card background */
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `> 1024px` | Full two-column layouts |
| `≤ 1024px` | Single column, stacked |
| `≤ 768px`  | Mobile menu active, hero scales down |
| `≤ 480px`  | Buttons stack vertically |

---

## ✅ Pre-Launch Checklist

- [ ] Replace all `Your Name` placeholders
- [ ] Add `assets/resume.pdf`
- [ ] Update all social / contact links
- [ ] Update stat counters (projects, CTFs, certs) in hero section
- [ ] Add real GitHub links to project cards
- [ ] Add real writeup links
- [ ] Update typed title phrases in `script.js`
- [ ] Test on mobile
- [ ] Deploy to GitHub Pages
