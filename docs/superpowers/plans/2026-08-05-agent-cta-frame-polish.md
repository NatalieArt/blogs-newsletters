# Agent CTA and Screenshot Frame Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the secondary onboarding route into a plain text link and give the Agent screenshot a refined thin frame on both entry points.

**Architecture:** Keep the existing semantic anchor and screenshot markup. Make the change entirely in the scoped CSS blocks of `onboarding/index.html` and `index.html`, preserving layout, actions, media assets, and responsive behavior.

**Tech Stack:** Static HTML, inline CSS, Node.js built-in test runner, Nokogiri HTML5 parser, Google Chrome local preview.

## Global Constraints

- Keep `Explore Creative Agent` as the only button-styled CTA.
- Keep `No agent? Continue with the guide` as an accessible anchor to `#s0`.
- Remove the secondary link border, background, rounded container, fixed button height, and button-width behavior.
- Add exactly a four-pixel dark inset, one-pixel translucent mint frame, and restrained shadow around the Agent screenshot.
- Apply the screenshot finish to both `onboarding/index.html` and the root `index.html`.
- Preserve the existing twelve-result mixed media wall and all four autoplay loops.

---

### Task 1: Regression contract and scoped CSS implementation

**Files:**
- Modify: `tests/agent-preface.test.mjs`
- Modify: `onboarding/index.html`
- Modify: `index.html`

**Interfaces:**
- Consumes: `.agent-secondary`, `.agent-demo-shot`, `.featured-guide-shot`, and their existing child `<img>` elements.
- Produces: a text-only secondary link and matching one-pixel screenshot finishes on both page surfaces.

- [ ] **Step 1: Write the failing regression contract**

Add assertions to `tests/agent-preface.test.mjs` that require these literal scoped declarations:

```js
assert.match(onboardingHtml, /\.agent-preface-actions \.agent-secondary\{min-height:0;border:0;border-radius:0;background:transparent/);
assert.match(onboardingHtml, /\.agent-demo-shot\{[^}]*padding:4px/);
assert.match(onboardingHtml, /\.agent-demo-shot img\{[^}]*border:1px solid rgba\(0,255,157,\.3\)/);
assert.match(indexHtml, /\.featured-guide-shot\{[^}]*padding:4px/);
assert.match(indexHtml, /\.featured-guide-shot img\{[^}]*border:1px solid rgba\(0,255,157,\.3\)/);
```

- [ ] **Step 2: Run the test to verify RED**

Run: `node --test tests/agent-preface.test.mjs`

Expected: FAIL because the secondary link still has a border and both screenshot wrappers lack the four-pixel frame treatment.

- [ ] **Step 3: Implement the onboarding polish**

Set `.agent-secondary` to `min-height:0`, `border:0`, `border-radius:0`, `background:transparent`, `padding:4px 0`, left alignment, muted text, and no hover translation. Restore `width:auto` and `align-self:flex-start` inside the mobile action stack. Add `padding:4px` and a dark mint-tinted background to `.agent-demo-shot`; add the exact `border:1px solid rgba(0,255,157,.3)`, `border-radius:8px`, and restrained shadow to its image.

- [ ] **Step 4: Implement the root-index screenshot finish**

Add `padding:4px` and the same dark mint-tinted background to `.featured-guide-shot`; add the exact `border:1px solid rgba(0,255,157,.3)`, `border-radius:8px`, and matching shadow to its image.

- [ ] **Step 5: Run GREEN and static validation**

Run `node --test tests/agent-preface.test.mjs`, the Nokogiri parser check for both HTML files, and `git diff --check`.

Expected: all tests pass, both documents parse, and the diff has no whitespace errors.

- [ ] **Step 6: Run Google Chrome visual QA**

Open `/onboarding/#agent-preface-title` and `/#blogs`. Verify the secondary route renders as plain text with no border/background, both screenshots have a thin mint frame, twelve result tiles remain visible, four videos play when in view, there is no horizontal overflow, and there are no relevant page-console errors. Capture one onboarding screenshot.

- [ ] **Step 7: Commit the completed polish**

```bash
git add tests/agent-preface.test.mjs onboarding/index.html index.html
git commit -m "fix: lighten agent CTA and frame screenshots"
```
