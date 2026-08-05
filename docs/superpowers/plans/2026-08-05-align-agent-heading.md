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
- Modify: `tests/agent-preface.test.mjs`
- Modify: `onboarding/index.html:97-135,1260-1266`

**Interfaces:**
- Consumes: Existing `.agent-preface-label`, `.agent-preface-grid`, `.agent-preface-copy`, and `.agent-demo-shot` elements.
- Produces: A section-level eyebrow followed by a top-aligned two-column grid and a rounded, clipped screenshot wrapper.

- [ ] **Step 1: Add the failing regression test**

Append this test to `tests/agent-preface.test.mjs`:

```js
test('agent heading aligns with a fully rounded Claude screenshot', () => {
  const eyebrowPosition = onboardingHtml.indexOf('class="agent-preface-label"');
  const gridPosition = onboardingHtml.indexOf('class="agent-preface-grid"');
  const copyPosition = onboardingHtml.indexOf('class="agent-preface-copy"');

  assert.ok(eyebrowPosition < gridPosition, 'eyebrow must sit above the two-column grid');
  assert.ok(gridPosition < copyPosition, 'copy must remain inside the grid');
  assert.match(onboardingHtml, /\.agent-preface-grid\{[^}]*align-items:start/);
  assert.match(onboardingHtml, /\.agent-demo-shot\{[^}]*border-radius:10px[^}]*overflow:hidden/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --test --test-name-pattern="agent heading aligns" tests/agent-preface.test.mjs
```

Expected: FAIL because the eyebrow is inside the grid, the grid uses `align-items:center`, and the screenshot wrapper has no border radius.

- [ ] **Step 3: Implement the minimal markup and CSS change**

Move the existing eyebrow immediately inside `.agent-preface`, before `.agent-preface-grid`. Change the relevant CSS declarations to:

```css
.agent-preface-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(400px,1.1fr);align-items:start;gap:32px;min-height:0}
.agent-preface-copy{display:flex;flex-direction:column;justify-content:flex-start;padding:0}
.agent-preface-label{display:block;margin:0 0 16px;color:var(--accent);font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}
.agent-demo-shot{position:relative;padding:4px;border-radius:10px;background:linear-gradient(135deg,rgba(0,255,157,.18),#0b100c 44%,#202836);overflow:hidden}
```

- [ ] **Step 4: Run regression tests and browser QA**

Run:

```bash
node --test tests/agent-preface.test.mjs
git diff --check
```

Expected: all 7 tests pass. In Chrome, verify the heading and screenshot top edges differ by no more than `1px`, the wrapper radius is `10px`, horizontal overflow is `0`, and the mobile media remains above the copy.

- [ ] **Step 5: Commit the implementation**

```bash
git add tests/agent-preface.test.mjs onboarding/index.html
git commit -m "fix: align agent heading with screenshot"
```

