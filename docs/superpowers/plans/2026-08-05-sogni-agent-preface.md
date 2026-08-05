# Sogni Agent-first Onboarding Preface Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an agent-first preface and compact campaign mosaic to the onboarding guide, then feature that guide on the root index.

**Architecture:** Keep the static, dependency-free structure of the repository. Add one optimized local campaign mosaic, isolated CSS/HTML for the onboarding feature and index feature, and a small progressive-enhancement copy interaction that falls back when the Clipboard API is unavailable.

**Tech Stack:** Static HTML, inline CSS and vanilla JavaScript, Node.js built-in test runner, FFmpeg for deterministic image composition, local HTTP preview.

## Global Constraints

- Insert the onboarding feature before `<h2 id="s0">First, which Sogni should you use?</h2>`.
- Use the exact install command `npx setup-sogni-agent-skill`.
- Link the agent CTA to `https://www.sogni.ai/agent`.
- Reuse one optimized mosaic visual on the onboarding page and root index without committing the full-resolution source set.
- Preserve the existing comparison table and all three existing root-index article cards.
- Keep desktop and mobile layouts free of horizontal overflow.

---

### Task 1: Regression contract and campaign mosaic

**Files:**
- Create: `tests/agent-preface.test.mjs`
- Create: `onboarding/assets/agent-campaign-mosaic.jpg`
- Create: `assets/agent-campaign-mosaic.jpg`

**Interfaces:**
- Consumes: existing static files `onboarding/index.html`, `index.html`, and selected PNG stills in `/Users/Natalie/Desktop/SOGNI AND REMOTION/`.
- Produces: a deterministic `1600x900` JPEG mosaic and static assertions used by later tasks.

- [ ] **Step 1: Write the failing static contract test**

Use Node’s built-in `node:test` and `node:assert/strict` to assert that the onboarding HTML contains `class="agent-preface"`, the exact command, an `aria-label="Copy install command"` button, the agent URL, and a mosaic before `id="s0"`; assert that the index contains `class="featured-guide"`, links to `onboarding/`, and references the index mosaic; assert both mosaic files exist and are non-empty.

- [ ] **Step 2: Run the test to verify RED**

Run: `node --test tests/agent-preface.test.mjs`

Expected: FAIL because the feature markup and mosaic assets do not exist.

- [ ] **Step 3: Build the optimized mosaic**

Use FFmpeg to scale and crop twelve selected 16:9 campaign stills to `400x300`, tile them as `4x3`, and encode `onboarding/assets/agent-campaign-mosaic.jpg` at `1600x900`; copy the optimized result to `assets/agent-campaign-mosaic.jpg`.

- [ ] **Step 4: Confirm asset properties**

Run: `sips -g pixelWidth -g pixelHeight onboarding/assets/agent-campaign-mosaic.jpg assets/agent-campaign-mosaic.jpg` and `du -h` for both files.

Expected: both files are `1600x900`, readable, and substantially smaller than the full-resolution source set.

### Task 2: Onboarding agent-first feature

**Files:**
- Modify: `onboarding/index.html`
- Test: `tests/agent-preface.test.mjs`

**Interfaces:**
- Consumes: `onboarding/assets/agent-campaign-mosaic.jpg`.
- Produces: `.agent-preface`, `.agent-command`, `.agent-copy`, the primary agent CTA, and the `#s0` continuation link.

- [ ] **Step 1: Add isolated responsive CSS**

Add styles for a two-column feature panel with mint eyebrow, headline, body copy, command row, CTA row, mosaic, caption overlay, mobile stacking below `760px`, and focus-visible states.

- [ ] **Step 2: Add semantic feature markup before `#s0`**

Use the headline “Already use Claude, Codex or Hermes? Start here.” Explain that the Creative Agent Skill is the fastest, most powerful Sogni path for agent users; show `npx setup-sogni-agent-skill`; link to the official Agent page; and link “Otherwise, continue with the guide” to `#s0`.

- [ ] **Step 3: Add robust copy behavior**

On `.agent-copy` click, copy the adjacent command with `navigator.clipboard.writeText` when available; otherwise use a temporary textarea and `document.execCommand('copy')`. Change the button label to “Copied” on success and restore it after 1.8 seconds.

- [ ] **Step 4: Run the contract test**

Run: `node --test tests/agent-preface.test.mjs`

Expected: onboarding assertions pass; index assertions still fail because Task 3 is not implemented.

### Task 3: Root-index featured guide and full validation

**Files:**
- Modify: `index.html`
- Test: `tests/agent-preface.test.mjs`

**Interfaces:**
- Consumes: `assets/agent-campaign-mosaic.jpg` and the published `onboarding/` route.
- Produces: `.featured-guide` above the existing `.bento` grid, linking the complete card to `onboarding/`.

- [ ] **Step 1: Add isolated featured-guide CSS**

Add a wide, two-column card with the mosaic on the left and guide copy on the right; match existing card hover, border, typography and badge behavior; stack at `720px` and preserve the existing `.bento` rules.

- [ ] **Step 2: Add the featured guide markup**

Insert the feature after the Blogs section header and before `.bento`. Use the title “Your first steps with Sogni”, describe the web walkthrough plus the faster Agent route, and link the whole feature to `onboarding/`.

- [ ] **Step 3: Run automated tests and static checks**

Run: `node --test tests/agent-preface.test.mjs`, `git diff --check`, and an HTML parser check over both HTML files.

Expected: all tests pass, no whitespace errors, and both documents parse.

- [ ] **Step 4: Run rendered desktop and mobile QA**

Serve the repository on `http://127.0.0.1:8000`. Verify `/onboarding/` and `/` at `1440x1000` and `390x844`, inspect page identity and meaningful DOM content, check console errors, capture screenshots, click the install-copy control and confirm “Copied”, click the continuation link and confirm `#s0`, and confirm the root featured guide resolves to `/onboarding/`.

- [ ] **Step 5: Review the final diff**

Run: `git status --short`, `git diff --stat`, and `git diff -- onboarding/index.html index.html tests/agent-preface.test.mjs`.

Expected: only the planned HTML, test, mosaic, spec, and plan files are changed or added.
