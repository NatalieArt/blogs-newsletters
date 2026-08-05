# Align Agent Heading Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the onboarding Agent heading with the top of the Claude screenshot and remove the screenshot frame's square outer corners.

**Architecture:** Move the existing eyebrow label outside the two-column grid so the heading and screenshot share the grid's first row. Change only onboarding markup and CSS; retain the current responsive ordering, copy, media wall, and root-index feature.

**Tech Stack:** Static HTML, CSS, Node.js built-in test runner, Chrome browser verification.

## Global Constraints

- Keep the eyebrow text unchanged and display it above the entire two-column layout.
- Align the desktop heading and Claude screenshot at their top edges.
- Keep the four-pixel screenshot inset, one-pixel mint image border, and restrained shadow.
- Clip the screenshot wrapper with rounded corners so no square background corners remain.
- Do not change the result wall, root-index feature, assets, links, copy behavior, or mobile media-first order.

---

### Task 1: Align and round the onboarding Agent header

**Files:**
- Modify: `onboarding/index.html:97-135,1260-1266`

**Interfaces:**
- Consumes: Existing `.agent-preface-label`, `.agent-preface-grid`, `.agent-preface-copy`, and `.agent-demo-shot` elements.
- Produces: A section-level eyebrow followed by a top-aligned two-column grid and a rounded, clipped screenshot wrapper.

- [ ] **Step 1: Capture the failing rendered contract in Chrome**

Open the onboarding page in Chrome and evaluate the actual layout:

```js
const heading = document.querySelector('#agent-preface-title');
const shot = document.querySelector('.agent-demo-shot');
const eyebrow = document.querySelector('.agent-preface-label');
({
  eyebrowParent: eyebrow.parentElement.className,
  topDifference: Math.abs(heading.getBoundingClientRect().top - shot.getBoundingClientRect().top),
  wrapperRadius: getComputedStyle(shot).borderRadius,
});
```

Expected before implementation: the contract is RED because `eyebrowParent` is `agent-preface-copy`, `topDifference` is greater than `1`, and `wrapperRadius` is `0px`.

- [ ] **Step 2: Implement the minimal markup and CSS change**

Move the existing eyebrow immediately inside `.agent-preface`, before `.agent-preface-grid`. Change the relevant CSS declarations to:

```css
.agent-preface-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(400px,1.1fr);align-items:start;gap:32px;min-height:0}
.agent-preface-copy{display:flex;flex-direction:column;justify-content:flex-start;padding:0}
.agent-preface-label{display:block;margin:0 0 16px;color:var(--accent);font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}
.agent-demo-shot{position:relative;padding:4px;border-radius:10px;background:linear-gradient(135deg,rgba(0,255,157,.18),#0b100c 44%,#202836);overflow:hidden}
```

- [ ] **Step 3: Run regression tests and browser QA**

Run:

```bash
node --test tests/agent-preface.test.mjs
git diff --check
```

Expected: all 6 tests pass. In Chrome, run the Step 1 evaluation again and verify `eyebrowParent` is `agent-preface`, the heading and screenshot top edges differ by no more than `1px`, the wrapper radius is `10px`, horizontal overflow is `0`, and the mobile media remains above the copy.

- [ ] **Step 4: Commit the implementation**

```bash
git add onboarding/index.html
git commit -m "fix: align agent heading with screenshot"
```
