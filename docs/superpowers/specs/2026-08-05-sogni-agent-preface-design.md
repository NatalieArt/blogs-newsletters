# Sogni Agent-first onboarding preface

## Goal

Make the onboarding guide steer experienced agent users toward the Sogni Creative Agent Skill before the existing “First, which Sogni should you use?” section, while preserving the web-app walkthrough for everyone else. Surface the updated onboarding guide prominently on the root index at the same time.

## Onboarding preface

- Insert a self-contained feature block immediately after the table of contents and before `<h2 id="s0">First, which Sogni should you use?</h2>`.
- Lead with the message that people who already use Claude, Codex, Hermes, or another capable personal agent should start with the Creative Agent Skill.
- Describe the Skill as the fastest and most powerful way to create images, video, and music with Sogni because the user can ask in plain English while the agent plans, generates, and delivers the media.
- Show the exact installation command `npx setup-sogni-agent-skill` in a copyable command component.
- Link the primary call to action to `https://www.sogni.ai/agent` in a new tab.
- End the preface with a clear handoff: readers without a personal agent should continue into the existing guide below.
- Keep the existing Creative Agent row in the application comparison table so the reference remains complete.

## Visual treatment

- Use the existing Sogni dark editorial palette, mint accent, panel borders, rounded corners, and typography.
- Build a wide two-column feature block: copy and command on the left, a compact campaign mosaic on the right.
- Create one optimized static contact-sheet image from selected 16:9 campaign stills in `/Users/Natalie/Desktop/SOGNI AND REMOTION/`. The mosaic should communicate “many coherent assets in moments” without loading many full-resolution source images.
- Use small edge-to-edge tiles with subtle variation in size, a dark overlay, and a short label about generating a complete campaign quickly.
- On narrow screens, stack copy above the mosaic, keep the command readable, and make both calls to action full width.
- Respect the existing page’s reduced-motion behavior; the new block does not require animation.

## Root index

- Add the onboarding guide as a wide featured article directly above the existing three-card blog grid.
- Reuse the optimized campaign mosaic as its visual so the index and article have one recognizable visual identity.
- Use copy focused on the complete getting-started guide and the agent-first route.
- Preserve the three existing article cards and their current numbering.
- Keep the featured card responsive: split visual and copy on desktop, stacked on mobile.

## Assets and performance

- Store the optimized mosaic under `onboarding/assets/` and a separately optimized index copy under `assets/` so each page uses a simple local relative URL.
- Use a descriptive filename and alt text.
- Keep each delivered image appropriately compressed for the displayed size and avoid adding the full-resolution campaign source images to the repository.

## Interaction and accessibility

- The install control must work with keyboard input and expose a clear accessible label.
- Copy success should be visible and should gracefully fall back when the Clipboard API is unavailable.
- Links must have meaningful text, visible focus behavior inherited from the existing design, and `rel="noopener"` when opened in a new tab.
- The mosaic is illustrative; its alt text should explain the batch of varied campaign visuals without enumerating every tile.

## Validation

- Serve the static site locally and verify `/onboarding/` and `/` at desktop and mobile widths.
- Confirm the new preface appears before `#s0`, the install command copies correctly, and the continuation link reaches the existing section.
- Confirm the root index feature links to `/onboarding/` and the existing cards remain intact.
- Validate the HTML, local asset paths, responsive overflow, browser console, and reduced-motion behavior.

## Out of scope

- Rewriting the existing application comparison table or the rest of the onboarding tutorial.
- Changing the hero, social metadata, navigation, or deployment configuration.
- Modifying the source files in the Desktop folders.
