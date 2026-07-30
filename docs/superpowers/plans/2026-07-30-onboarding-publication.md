# Onboarding Publication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the existing Sogni Create guide at `https://natalieart.github.io/blogs-newsletters/onboarding/` with banner-based social previews and a verified mobile layout.

**Architecture:** Copy the approved source article into one isolated top-level static-page directory, then update only that copy’s public URL metadata and responsive CSS. Validate the exact route locally through a browser, push `main`, wait for GitHub Pages, and repeat the route checks against production.

**Tech Stack:** Static HTML/CSS/JavaScript, GitHub Pages, Git/GitHub CLI, in-app Browser.

## Global Constraints

- Copy only the contents of `blogs/sogni-create-step-by-step/` from the source checkout into a new top-level `onboarding/` directory.
- Keep the original source checkout unchanged.
- Do not include unrelated local changes from the private Sogni repository.
- Public URL: `https://natalieart.github.io/blogs-newsletters/onboarding/`.
- Social image URL: `https://natalieart.github.io/blogs-newsletters/onboarding/assets/hero.jpg`.
- Verify one desktop viewport and at least one mobile viewport.
- Publish directly to the `main` branch of `NatalieArt/blogs-newsletters`.

---

### Task 1: Create the isolated onboarding page

**Files:**
- Create: `onboarding/index.html`
- Create: `onboarding/assets/*`

**Interfaces:**
- Consumes: `/Users/Natalie/Desktop/blog.sogni.ai/blogs/sogni-create-step-by-step/`
- Produces: a self-contained static page rooted at `/onboarding/`

- [ ] **Step 1: Run the precondition check**

Run:

```bash
test -f onboarding/index.html
```

Expected: exit code `1`, confirming the public route does not already exist.

- [ ] **Step 2: Copy the approved source snapshot**

Run:

```bash
mkdir -p onboarding
rsync -a --delete \
  /Users/Natalie/Desktop/blog.sogni.ai/blogs/sogni-create-step-by-step/ \
  onboarding/
```

Expected: `onboarding/index.html` and 41 files under `onboarding/assets/`.

- [ ] **Step 3: Verify the snapshot**

Run:

```bash
test -f onboarding/index.html
test -f onboarding/assets/hero.jpg
test "$(find onboarding/assets -maxdepth 1 -type f | wc -l | tr -d ' ')" = "41"
```

Expected: exit code `0`.

- [ ] **Step 4: Commit the isolated source**

Run:

```bash
git add onboarding
git commit -m "Add onboarding article"
```

Expected: one commit containing only `onboarding/`.

---

### Task 2: Configure social previews and mobile behavior

**Files:**
- Modify: `onboarding/index.html`

**Interfaces:**
- Consumes: `onboarding/assets/hero.jpg` at 2048 × 935 pixels
- Produces: canonical/OG/Twitter metadata for `/onboarding/` and responsive CSS at `max-width: 720px`

- [ ] **Step 1: Verify the copied page still has source-only metadata**

Run:

```bash
rg -n 'noindex|blog\.sogni\.ai/blogs/sogni-create-step-by-step|property="og:image:width"' onboarding/index.html
```

Expected: matches for `noindex` and the old `blog.sogni.ai` URL; no `og:image:width` match.

- [ ] **Step 2: Update the public metadata**

Apply these exact head values:

```html
<link rel="canonical" href="https://natalieart.github.io/blogs-newsletters/onboarding/">
<meta property="og:url" content="https://natalieart.github.io/blogs-newsletters/onboarding/">
<meta property="og:image" content="https://natalieart.github.io/blogs-newsletters/onboarding/assets/hero.jpg?v=onboarding-20260730">
<meta property="og:image:secure_url" content="https://natalieart.github.io/blogs-newsletters/onboarding/assets/hero.jpg?v=onboarding-20260730">
<meta property="og:image:width" content="2048">
<meta property="og:image:height" content="935">
<meta property="og:image:alt" content="New to Sogni? Read this first — the complete Sogni Create guide.">
<meta name="twitter:image" content="https://natalieart.github.io/blogs-newsletters/onboarding/assets/hero.jpg?v=onboarding-20260730">
<meta name="twitter:image:alt" content="New to Sogni? Read this first — the complete Sogni Create guide.">
```

Delete:

```html
<meta name="robots" content="noindex">
```

- [ ] **Step 3: Use the file-based hero in the rendered banner**

Replace the first hero banner’s embedded `data:image/jpeg;base64,...` source with:

```html
<img src="assets/hero.jpg" width="2048" height="935" alt="Two neon fashion portraits rendered from the same prompt by Krea 2 Turbo and FLUX.1 Krea in Sogni Create">
```

Expected: the banner visual is unchanged while the HTML payload is smaller.

- [ ] **Step 4: Add the mobile CSS acceptance rules**

Add this rule after the base table styles:

```css
@media(max-width:720px){
  .band,.wrap,.pills{padding-left:14px;padding-right:14px}
  .wrap{padding-top:26px;padding-bottom:64px}
  .hero-banner{border-radius:14px}
  .hero-banner img{height:clamp(240px,70vw,300px);object-position:center 42%}
  .hero-banner .hero-cap{padding:18px}
  .hero-banner .hero-h{font-size:clamp(25px,8vw,34px);max-width:18ch}
  .hero-banner .hero-eyebrow{font-size:10px;margin-bottom:8px}
  .pills{gap:10px}
  .pill{flex-basis:100%;padding:10px 12px}
  .toc{padding:20px 18px}
  .toc ol{columns:1}
  h2{margin-top:48px;align-items:flex-start}
  table{display:block;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}
  th,td{min-width:120px;padding:9px 10px}
  td.ico,td.ico.wide{min-width:160px}
  .promptbox{padding:48px 14px 14px}
  .promptbox .ptext{padding-right:0;overflow-wrap:anywhere}
  .btn{width:100%;justify-content:center}
  .cta-hero{padding:30px 18px}
}
```

- [ ] **Step 5: Run static assertions**

Run:

```bash
test "$(rg -c 'property="og:image:width" content="2048"' onboarding/index.html)" = "1"
test "$(rg -c 'name="twitter:image:alt"' onboarding/index.html)" = "1"
! rg -n 'name="robots" content="noindex"' onboarding/index.html
rg -n 'natalieart\.github\.io/blogs-newsletters/onboarding/' onboarding/index.html
rg -n 'src="assets/hero\.jpg"' onboarding/index.html
git diff --check
```

Expected: all commands pass and the new public URL appears in canonical, OG, and image metadata.

- [ ] **Step 6: Commit the publication adjustments**

Run:

```bash
git add onboarding/index.html
git commit -m "Prepare onboarding page for GitHub Pages"
```

Expected: one commit containing only `onboarding/index.html`.

---

### Task 3: Verify and publish the public route

**Files:**
- Verify: `onboarding/index.html`
- Verify: `onboarding/assets/hero.jpg`

**Interfaces:**
- Consumes: local route `http://127.0.0.1:4173/onboarding/`
- Produces: live route `https://natalieart.github.io/blogs-newsletters/onboarding/`

- [ ] **Step 1: Start a local static server**

Run:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Expected: the repository root is served on port `4173`.

- [ ] **Step 2: Run desktop browser QA**

Open `http://127.0.0.1:4173/onboarding/` at a desktop viewport and verify:

```text
Page title: New to Sogni? Read This First | The Complete Sogni Create Guide
Hero heading: New to Sogni? Read this first
No blank page or framework error overlay
No relevant console errors or warnings
The Blogs dropdown opens and closes
```

Capture one desktop screenshot.

- [ ] **Step 3: Run mobile browser QA**

Resize to 390 × 844 and verify:

```text
No document-level horizontal overflow
Hero title remains legible over the banner
Header navigation remains reachable
Tables scroll inside their own viewport
The first content card and CTA remain within the viewport
```

Capture one mobile screenshot.

- [ ] **Step 4: Confirm the intended Git scope**

Run:

```bash
git status -sb
git log --oneline origin/main..HEAD
git diff --stat origin/main..HEAD
```

Expected: only the approved design/plan documents and `onboarding/` changes are ahead of `origin/main`.

- [ ] **Step 5: Push the live branch**

Run:

```bash
git push origin main
```

Expected: GitHub accepts the push and starts a Pages deployment for the new `main` SHA.

- [ ] **Step 6: Wait for GitHub Pages**

Run:

```bash
gh run list --repo NatalieArt/blogs-newsletters --workflow pages-build-deployment --limit 1
gh run watch --repo NatalieArt/blogs-newsletters --exit-status
```

Expected: the Pages build and deployment completes successfully.

- [ ] **Step 7: Verify production**

Open `https://natalieart.github.io/blogs-newsletters/onboarding/` and repeat page identity, non-blank content, console-health, desktop screenshot, mobile screenshot, and dropdown interaction checks.

Run:

```bash
curl -fsSL https://natalieart.github.io/blogs-newsletters/onboarding/ |
  rg 'og:image:width|natalieart.github.io/blogs-newsletters/onboarding'
curl -fsSI https://natalieart.github.io/blogs-newsletters/onboarding/assets/hero.jpg
```

Expected: the page returns the public metadata and the banner asset returns HTTP `200`.
