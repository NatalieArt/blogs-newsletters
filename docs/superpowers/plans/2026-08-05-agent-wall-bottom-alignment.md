# Agent Wall Bottom Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the yellow Agent result wall meet the onboarding panel's bottom border exactly.

**Architecture:** Preserve the current screenshot and twelve native-16:9 tiles. Use the existing flex-column media panel to push `.agent-result-wall` to the bottom with auto top margin, placing any surplus height between the screenshot and wall instead of below the yellow mosaic.

**Tech Stack:** Static HTML, inline CSS, Node.js built-in test runner, Google Chrome computed-layout verification.

## Global Constraints

- Modify only the onboarding Agent media column.
- Keep the screenshot dimensions, result caption, tile dimensions, and 4-by-3 grid unchanged.
- Keep every tile at native `16:9` without stretching or cropping.
- Require the result wall's bottom edge to equal the media panel's bottom edge within one rendered pixel.

---

### Task 1: Bottom-anchor the result wall

**Files:**
- Modify: `onboarding/index.html`
- Test: `tests/agent-preface.test.mjs`

**Interfaces:**
- Consumes: `.agent-preface-media` as the existing flex column and `.agent-result-wall` as its final child.
- Produces: `.agent-result-wall{...;margin-top:auto}` and a zero-pixel rendered bottom gap.

- [ ] **Step 1: Verify the rendered regression is RED**

In Google Chrome at `/onboarding/#agent-preface-title`, calculate:

```js
Math.round(
  document.querySelector('.agent-preface-media').getBoundingClientRect().bottom -
  document.querySelector('.agent-result-wall').getBoundingClientRect().bottom
)
```

Expected before the fix: a positive value greater than one pixel.

- [ ] **Step 2: Implement the minimal CSS fix**

Change the existing declaration to:

```css
.agent-result-wall{margin-top:auto;background:#050705;border-top:1px solid var(--line)}
```

- [ ] **Step 3: Run automated and static validation**

Run `node --test tests/agent-preface.test.mjs`, parse `onboarding/index.html` and `index.html` with Nokogiri HTML5, and run `git diff --check`.

Expected: six tests pass, both documents parse, and no whitespace errors are reported.

- [ ] **Step 4: Verify the rendered result is GREEN**

Reload Google Chrome and repeat the computed bottom-gap expression.

Expected after the fix: `0` or `1`, with twelve visible tiles, four playing videos, native `1.778` tile ratios, and no horizontal overflow.

- [ ] **Step 5: Capture and commit**

Capture the corrected Agent section, leave it open in Chrome, then run:

```bash
git add onboarding/index.html
git commit -m "fix: align agent result wall to panel edge"
```
