# Single Agent Screenshot Frame Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the double Claude screenshot treatment with one clean outer frame on both onboarding and the root index.

**Architecture:** Move border, rounding, clipping, and shadow ownership from the child image to its wrapper. Keep the four-pixel gradient inset inside that boundary and give the image only a smaller concentric radius.

**Tech Stack:** Static HTML, CSS, Node.js built-in test runner, Chrome browser verification.

## Global Constraints

- Use one visible outer contour; no decorative layer may extend outside it.
- Preserve the four-pixel gradient inset inside the frame.
- Apply the same finish to `.agent-demo-shot` and `.featured-guide-shot`.
- Do not alter screenshot assets, result walls, copy, links, responsive order, or animation behavior.

---

### Task 1: Consolidate the Claude screenshot frame

**Files:**
- Modify: `tests/agent-preface.test.mjs`
- Modify: `onboarding/index.html:123-126`
- Modify: `index.html:653-665`

**Interfaces:**
- Consumes: Existing screenshot wrappers and child images on onboarding and the root index.
- Produces: One wrapper-owned border, radius, clipping boundary, and shadow with a borderless child image.

- [ ] **Step 1: Update the frame regression test**

Replace the current screenshot-frame assertions in `tests/agent-preface.test.mjs` so they require the one-frame contract:

```js
test('secondary route is text-only and Agent screenshots use one outer frame', () => {
  assert.match(onboardingHtml, /\.agent-preface-actions \.agent-secondary\{min-height:0;border:0;border-radius:0;background:transparent/);
  assert.match(onboardingHtml, /\.agent-demo-shot\{[^}]*padding:4px[^}]*border:1px solid rgba\(0,255,157,\.3\)[^}]*border-radius:10px[^}]*box-shadow:/);
  assert.match(onboardingHtml, /\.agent-demo-shot img\{[^}]*border:0[^}]*border-radius:6px[^}]*box-shadow:none/);
  assert.match(indexHtml, /\.featured-guide-shot\s*\{[^}]*padding:4px;[^}]*border:1px solid rgba\(0,255,157,\.3\);[^}]*border-radius:10px;[^}]*box-shadow:/);
  assert.match(indexHtml, /\.featured-guide-shot img\s*\{[^}]*border:0;[^}]*border-radius:6px;[^}]*box-shadow:none/);
});
```

- [ ] **Step 2: Verify the test fails for the current double frame**

Run:

```bash
node --test --test-name-pattern="one outer frame" tests/agent-preface.test.mjs
```

Expected: FAIL because the wrapper has no border or shadow and the child image still owns both.

- [ ] **Step 3: Implement the single-frame CSS**

Use the following ownership pattern on both pages:

```css
/* wrapper */
padding:4px;
border:1px solid rgba(0,255,157,.3);
border-radius:10px;
box-shadow:0 14px 34px rgba(0,0,0,.32);
overflow:hidden;

/* child image */
border:0;
border-radius:6px;
box-shadow:none;
```

Retain each wrapper's existing layout declarations and gradient background.

- [ ] **Step 4: Run automated and rendered verification**

Run:

```bash
node --test tests/agent-preface.test.mjs
git diff --check
```

Expected: all 6 tests pass. In Chrome on both `/onboarding/` and `/`, verify that the wrapper owns a `1px` border and shadow, the child image owns neither, all corners are clipped, horizontal overflow is `0`, and the browser console has no page-authored errors or warnings.

- [ ] **Step 5: Commit the implementation**

```bash
git add tests/agent-preface.test.mjs onboarding/index.html index.html
git commit -m "fix: unify agent screenshot frame"
```

