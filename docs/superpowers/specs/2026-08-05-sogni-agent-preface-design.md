# Sogni Agent-first onboarding preface

## Goal

Make the onboarding guide steer experienced agent users toward the Sogni Creative Agent Skill before the existing “First, which Sogni should you use?” section, while preserving the web-app walkthrough for everyone else. Surface the updated onboarding guide prominently on the root index at the same time.

## Onboarding preface

- Insert a self-contained feature block immediately after the table of contents and before `<h2 id="s0">First, which Sogni should you use?</h2>`.
- Lead with the message that people who already use Claude, Codex, Hermes, or another capable personal agent should start with the Creative Agent Skill.
- Describe the Skill as the fastest and most powerful way to create images, video, and music with Sogni because the user can ask in plain English while the agent plans, generates, and delivers the media.
- Show the exact installation command `npx setup-sogni-agent-skill` in a copyable command component.
- Link the primary call to action to `https://www.sogni.ai/agent` in a new tab.
- End the preface with a clear handoff: readers without a personal agent should continue into the existing guide below. Present this secondary route as a plain text link with no border, background, rounded container, or button-height treatment.
- Keep the existing Creative Agent row in the application comparison table so the reference remains complete.

## Visual treatment

- Use the existing Sogni dark editorial palette, mint accent, panel borders, rounded corners, and typography.
- Build a wide two-column feature block: copy and command on the left, a readable Creative Agent workflow on the right.
- Show one optimized screenshot of Claude invoking the Sogni Creative Agent Skill so the agent workflow is immediately recognizable.
- Finish the Agent screenshot with a four-pixel dark inset, a one-pixel translucent mint frame, and a restrained shadow. Apply the same finish on the root-index feature for visual continuity.
- Follow the screenshot with a dense wall of twelve native 16:9 results: eight optimized still images mixed with four short looping videos. Keep every tile at its source aspect ratio so none of the artwork is cropped.
- Label the result wall `1 prompt · 30 assets generated in moments` to communicate batch scale and speed without adding explanatory copy.
- Use a 4-by-3 result grid in the onboarding preface and a compact 6-by-2 grid on the root index. On narrow screens, place the media above the copy and use a readable 3- or 4-column grid based on available width.
- Respect the existing page’s reduced-motion behavior by keeping all twelve tiles visible while replacing motion with the corresponding static frames when reduced motion is requested.

## Root index

- Add the onboarding guide as a wide featured article directly above the existing three-card blog grid.
- Reuse the Agent screenshot and the same mixed twelve-result wall so the index and article have one recognizable visual identity.
- Use copy focused on the complete getting-started guide and the agent-first route.
- Preserve the three existing article cards and their current numbering.
- Keep the featured card responsive: split visual and copy on desktop, stacked on mobile.

## Assets and performance

- Store the optimized shared screenshot, eight stills, and four video files under `assets/agent/`, referenced from both pages.
- Use descriptive filenames, alt text, and labels for the moving results.
- Keep the screenshot compressed and transcode the short loops to lightweight web MP4 files; avoid adding full-resolution source media to the repository.

## Interaction and accessibility

- The install control must work with keyboard input and expose a clear accessible label.
- Copy success should be visible and should gracefully fall back when the Clipboard API is unavailable.
- Links must have meaningful text, visible focus behavior inherited from the existing design, and `rel="noopener"` when opened in a new tab.
- The screenshot alt text should explain the visible Agent workflow. Each result tile should expose a concise accessible label, with videos accompanied by matching poster images.

## Validation

- Serve the static site locally and verify `/onboarding/` and `/` at desktop and mobile widths.
- Confirm the new preface appears before `#s0`, the install command copies correctly, and the continuation link reaches the existing section.
- Confirm the root index feature links to `/onboarding/` and the existing cards remain intact.
- Validate the HTML, local asset paths, responsive overflow, browser console, and reduced-motion behavior.

## Out of scope

- Rewriting the existing application comparison table or the rest of the onboarding tutorial.
- Changing the hero, social metadata, navigation, or deployment configuration.
- Modifying the source files in the Desktop folders.
