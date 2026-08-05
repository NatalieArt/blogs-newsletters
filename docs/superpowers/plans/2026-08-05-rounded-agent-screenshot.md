# Rounded Agent Screenshot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all decorative framing from the Claude screenshot while retaining clean rounded corners on onboarding and the root index.

**Architecture:** Keep the existing wrappers for layout and clipping, but remove their padding, border, gradient, and shadow. Let each image fill its wrapper edge to edge with the same ten-pixel radius.

**Tech Stack:** Static HTML, CSS, Node.js built-in test runner, Chrome browser verification.

## Global Constraints

- No green border, gradient inset, wrapper padding, or decorative shadow.
- Preserve ten-pixel rounded clipping on wrapper and image.
- Apply the same finish to onboarding and the root index.
- Do not change layout, assets, result walls, copy, links, or animation behavior.

---

### Task 1: Reduce Agent screenshots to rounded images

**Files:**
- Modify: `onboarding/index.html:123-128`
- Modify: `index.html:653-665`

**Interfaces:**
- Consumes: Existing `.agent-demo-shot` and `.featured-guide-shot` wrappers.
- Produces: Borderless, edge-to-edge screenshots clipped to a `10px` radius.

- [ ] **Step 1: Capture the failing rendered contract**

In Chrome on both pages, read computed styles for the screenshot wrapper and image.

Expected before implementation: wrapper padding is `4px`, border is `1px`, background is a gradient, and shadow is not `none`.

- [ ] **Step 2: Implement the minimal CSS change**

On both screenshot wrappers, set:

```css
padding:0;
border:0;
border-radius:10px;
background:none;
box-shadow:none;
overflow:hidden;
```

On both child images, keep `border:0` and `box-shadow:none`, and set `border-radius:10px`.

- [ ] **Step 3: Run automated and rendered verification**

Run:

```bash
node --test tests/agent-preface.test.mjs
git diff --check
```

Expected: all 6 tests pass. In Chrome, verify the wrappers have `0px` padding and border, `none` background image and shadow, `10px` radius, no horizontal overflow, and no page-authored console errors or warnings.

- [ ] **Step 4: Commit the implementation**

```bash
git add onboarding/index.html index.html
git commit -m "fix: remove agent screenshot frame"
```

