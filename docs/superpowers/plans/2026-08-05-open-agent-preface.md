# Open Agent Preface Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the enclosing card treatment from the onboarding Agent preface while preserving the framed Agent screenshot, dense result wall, responsive behavior, and framed root-index feature.

**Architecture:** Make a narrowly scoped CSS-only change in the onboarding document. The section becomes an open two-column editorial layout separated by whitespace; the media keeps its own screenshot finish, and the result wall flows beneath it without a surrounding panel.

**Tech Stack:** Static HTML, CSS, Node.js built-in test runner, Chrome DevTools browser automation.

## Global Constraints

- Apply the open editorial treatment only to the onboarding preface; keep the root-index feature framed.
- Keep the screenshot's four-pixel dark inset, one-pixel translucent mint frame, and restrained shadow.
- Keep all twelve native 16:9 result tiles uncropped, including four looping videos.
- Preserve the current mobile ordering, reduced-motion behavior, copy control, links, and accessible labels.

---

### Task 1: Open the onboarding Agent preface

**Files:**
- Modify: `onboarding/index.html:97-153`
- Test: `tests/agent-preface.test.mjs`

**Interfaces:**
- Consumes: Existing `.agent-preface`, `.agent-preface-grid`, `.agent-preface-copy`, `.agent-preface-media`, `.agent-demo-shot`, and `.agent-result-wall` markup and styles.
- Produces: An open desktop and mobile preface without a shared panel while leaving all HTML, behavior, assets, and root-index styles unchanged.

- [ ] **Step 1: Capture the failing visual contract**

Open `http://127.0.0.1:8000/onboarding/#agent-preface-title` in Chrome and evaluate:

```js
const section = document.querySelector('.agent-preface');
const style = getComputedStyle(section);
({
  borderTopWidth: style.borderTopWidth,
  borderRadius: style.borderRadius,
  boxShadow: style.boxShadow,
  backgroundImage: style.backgroundImage,
});
```

Expected before implementation: the open-layout contract fails because the section reports a `1px` border, non-zero radius, non-`none` shadow, and gradient background.

- [ ] **Step 2: Implement the minimal CSS change**

In `onboarding/index.html`, replace only the preface container/layout declarations with:

```css
.agent-preface{
  margin:52px 0 34px;
  border:0;
  border-radius:0;
  overflow:visible;
  background:none;
  box-shadow:none
}
.agent-preface-grid{
  display:grid;
  grid-template-columns:minmax(0,.9fr) minmax(400px,1.1fr);
  align-items:center;
  gap:32px;
  min-height:0
}
.agent-preface-copy{display:flex;flex-direction:column;justify-content:center;padding:0}
.agent-preface-media{display:flex;flex-direction:column;min-width:0;background:transparent;border:0}
.agent-result-wall{margin-top:12px;background:transparent;border-top:0}
```

Update the existing responsive declarations to use a `26px` grid gap, no media divider, a `36px 0 28px` preface margin under `520px`, and zero copy padding:

```css
@media(max-width:860px){
  .agent-preface-grid{grid-template-columns:1fr;gap:26px}
  .agent-preface-media{order:-1;border:0}
}
@media(max-width:520px){
  .agent-preface{margin:36px 0 28px}
  .agent-preface-copy{padding:0}
}
```

Do not change `.agent-demo-shot`, the Agent markup, assets, scripts, or `index.html` at the repository root.

- [ ] **Step 3: Run automated regression tests**

Run:

```bash
node --test tests/agent-preface.test.mjs
```

Expected: all 6 tests pass.

- [ ] **Step 4: Verify the open layout in Chrome**

Reload the onboarding URL with a cache-busting query and evaluate the Step 1 contract again.

Expected:

```json
{
  "borderTopWidth": "0px",
  "borderRadius": "0px",
  "boxShadow": "none",
  "backgroundImage": "none"
}
```

Also confirm the desktop grid gap is `32px`, the screenshot retains a `1px` border, there are 12 result tiles with 4 videos, the page has no horizontal overflow, and no page-authored console errors or warnings are present. Inspect a desktop screenshot and repeat the overflow check at a mobile width.

- [ ] **Step 5: Commit the implementation**

```bash
git add onboarding/index.html
git commit -m "fix: open up agent preface layout"
```

