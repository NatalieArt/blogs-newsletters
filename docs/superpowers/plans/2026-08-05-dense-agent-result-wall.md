# Dense Agent Result Wall Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four large Agent-result videos with a dense mixed wall of eight still images and four short videos, and raise the onboarding hero crop so the model's mouth is visible.

**Architecture:** Keep the shared `assets/agent/` media directory and static HTML architecture. Each page renders the same twelve native-16:9 result tiles in a page-specific responsive grid; video tiles contain a matching poster image that replaces motion for reduced-motion users. The hero adjustment is a CSS-only `object-position` change.

**Tech Stack:** Static HTML, inline CSS, native `<video>`, Node.js built-in test runner, FFmpeg, Nokogiri HTML5 parser, local HTTP preview in Google Chrome.

## Global Constraints

- Keep the large Claude/Sogni Creative Agent screenshot above the result wall.
- Render exactly twelve result tiles: eight still images and four looping, muted videos.
- Preserve every result at native `16:9` without cropping.
- Use `1 prompt · 30 assets generated in moments` as the batch-speed label.
- Use a `4x3` onboarding grid and `6x2` root-index grid on desktop, with three columns on narrow screens.
- Keep all twelve results visible under reduced motion by replacing each video with its matching poster image.
- Set the onboarding hero image to `object-position:center 68%` so the mouth moves into the visible crop.
- Preserve the install command, both Agent CTAs, the comparison table, and the three existing index cards.

---

### Task 1: Mixed-media contract and optimized still assets

**Files:**
- Modify: `tests/agent-preface.test.mjs`
- Create: `assets/agent/agent-still-dog-crown.jpg`
- Create: `assets/agent/agent-still-tv-popcorn.jpg`
- Create: `assets/agent/agent-still-mermaid-gym.jpg`
- Create: `assets/agent/agent-still-horse-selfie.jpg`
- Create: `assets/agent/agent-still-popcorn-cannonball.jpg`
- Create: `assets/agent/agent-still-breakdancer.jpg`
- Create: `assets/agent/agent-still-pigeon-chess.jpg`
- Create: `assets/agent/agent-still-chef-donuts.jpg`
- Create: `assets/agent/agent-poster-shark-ceo.jpg`
- Create: `assets/agent/agent-poster-sumo-chihuahua.jpg`
- Create: `assets/agent/agent-poster-rollerskate-nun.jpg`
- Create: `assets/agent/agent-poster-boxing-ballerina.jpg`

**Interfaces:**
- Consumes: the existing four `assets/agent/agent-result-*.mp4` files and matching PNG sources in `/Users/Natalie/Desktop/SOGNI AND REMOTION/remotion ready numbered/`.
- Produces: twelve optimized `480x270` JPEG still/poster files and a static contract for both HTML pages.

- [ ] **Step 1: Write the failing mixed-wall test**

Update `tests/agent-preface.test.mjs` to assert for each HTML document:

```js
assert.equal((html.match(/class="agent-result-tile/g) || []).length, 12);
assert.equal((html.match(/class="agent-result-image"/g) || []).length, 8);
assert.equal((html.match(/class="agent-result-video"/g) || []).length, 4);
assert.equal((html.match(/class="agent-result-poster"/g) || []).length, 4);
assert.match(html, /1 prompt &middot; 30 assets generated in moments/);
```

Also assert `onboarding/index.html` contains `object-position:center 68%` and that every JPEG path listed above exists and is non-empty.

- [ ] **Step 2: Run the test to verify RED**

Run: `node --test tests/agent-preface.test.mjs`

Expected: FAIL because the twelve-tile markup, speed label, raised hero crop, and optimized still/poster assets are missing.

- [ ] **Step 3: Create the optimized images**

Use FFmpeg to scale each named PNG source to `480x270`, preserving 16:9, and encode each destination JPEG with `-q:v 4`. Use these source-to-destination mappings:

```text
spot20-dog-crown-16x9.png -> agent-still-dog-crown.jpg
spot47-tv-popcorn-16x9.png -> agent-still-tv-popcorn.jpg
sogni-ad-19-mermaid-gym.png -> agent-still-mermaid-gym.jpg
sogni-ad-29-horse-selfie.png -> agent-still-horse-selfie.jpg
sogni-ad-30-popcorn-cannonball.png -> agent-still-popcorn-cannonball.jpg
spot16-breakdancer-16x9.png -> agent-still-breakdancer.jpg
sogni-ad-16-pigeon-chess.png -> agent-still-pigeon-chess.jpg
spot24-chef-donuts-16x9.png -> agent-still-chef-donuts.jpg
sogni-ad-01-shark-ceo.png -> agent-poster-shark-ceo.jpg
sogni-ad-11-sumo-chihuahua.png -> agent-poster-sumo-chihuahua.jpg
sogni-ad-12-rollerskate-nun.png -> agent-poster-rollerskate-nun.jpg
sogni-ad-17-boxing-ballerina.png -> agent-poster-boxing-ballerina.jpg
```

- [ ] **Step 4: Verify asset dimensions and size**

Run `sips -g pixelWidth -g pixelHeight assets/agent/agent-{still,poster}-*.jpg` and `du -ch assets/agent/agent-{still,poster}-*.jpg`.

Expected: all twelve files are `480x270`, readable, and collectively remain lightweight enough for the static page.

- [ ] **Step 5: Commit the red test and optimized assets**

```bash
git add tests/agent-preface.test.mjs assets/agent/agent-still-*.jpg assets/agent/agent-poster-*.jpg
git commit -m "test: define dense agent result wall"
```

### Task 2: Twelve-tile onboarding wall and raised banner crop

**Files:**
- Modify: `onboarding/index.html`
- Test: `tests/agent-preface.test.mjs`

**Interfaces:**
- Consumes: the twelve new JPEG assets plus the existing four optimized MP4 loops.
- Produces: `.agent-result-wall`, `.agent-result-caption`, twelve `.agent-result-tile` elements, and the corrected `.hero-banner img` crop.

- [ ] **Step 1: Implement responsive wall CSS**

Replace the two-column video grid with a four-column `.agent-result-grid`. Give each `.agent-result-tile`, `.agent-result-image`, `.agent-result-video`, and `.agent-result-poster` `aspect-ratio:16/9`; use `object-fit:contain`; use three grid columns below `520px`. Hide `.agent-result-poster` normally, then hide the video and show the poster inside `@media(prefers-reduced-motion:reduce)`.

- [ ] **Step 2: Implement the interleaved twelve-tile markup**

Add the batch label and use this tile order:

```text
dog crown image, shark CEO video, TV popcorn image, sumo/chihuahua video,
mermaid gym image, horse selfie image, roller-skating nun video,
popcorn cannonball image, breakdancer image, boxing ballerina video,
pigeon chess image, chef donuts image
```

Each video tile contains its `<video>` plus the matching `.agent-result-poster` `<img>`.

- [ ] **Step 3: Raise the hero image crop**

Change both desktop and mobile `.hero-banner img` declarations from `object-position:center 42%` to `object-position:center 68%`.

- [ ] **Step 4: Run the contract test**

Run: `node --test tests/agent-preface.test.mjs`

Expected: onboarding assertions pass; index mixed-wall assertions still fail until Task 3.

- [ ] **Step 5: Commit the onboarding implementation**

```bash
git add onboarding/index.html
git commit -m "feat: add dense agent result wall to onboarding"
```

### Task 3: Root-index wall and rendered verification

**Files:**
- Modify: `index.html`
- Test: `tests/agent-preface.test.mjs`

**Interfaces:**
- Consumes: the same twelve image/poster assets and four MP4 loops.
- Produces: a six-column desktop `.featured-guide-clips` wall that reflows to three columns on mobile.

- [ ] **Step 1: Implement the root-index mixed wall**

Add the same batch label and interleaved twelve tiles beneath `.featured-guide-shot`. Use six columns on desktop and three columns below `720px`; mirror the onboarding reduced-motion poster behavior.

- [ ] **Step 2: Run GREEN verification**

Run: `node --test tests/agent-preface.test.mjs`

Expected: all tests pass with exactly twelve tiles, eight images, four videos, and four reduced-motion posters on each page.

- [ ] **Step 3: Run static validation**

Run: `ruby -e 'require "nokogiri"; ARGV.each { |path| Nokogiri::HTML5(File.read(path)); puts "valid #{path}" }' onboarding/index.html index.html` and `git diff --check`.

Expected: both HTML documents parse and no whitespace errors are reported.

- [ ] **Step 4: Run Google Chrome QA**

Serve the repository at `http://127.0.0.1:8000`. Verify `/onboarding/` and `/#blogs`: correct page identity, meaningful DOM, twelve visible result tiles, four playing videos, native 16:9 display ratios, no horizontal overflow, no relevant console errors, and screenshots showing the raised hero crop plus both mixed-media walls. Exercise the install-copy interaction and confirm the button changes to `Copied`.

- [ ] **Step 5: Commit the completed change**

```bash
git add index.html tests/agent-preface.test.mjs
git commit -m "feat: show full agent batch across blog entry points"
```
