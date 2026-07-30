# Onboarding article publication

## Goal

Publish the existing Sogni Create step-by-step article as a public GitHub Pages page at:

`https://natalieart.github.io/blogs-newsletters/onboarding/`

The page must preserve the current article and assets, use its hero banner for social-link previews, and work cleanly on desktop and mobile.

## Scope

- Copy only the contents of `blogs/sogni-create-step-by-step/` from the source checkout into a new top-level `onboarding/` directory.
- Keep the original source checkout unchanged.
- Do not include unrelated local changes from the private Sogni repository.
- Update page metadata for the public GitHub Pages URL.
- Improve responsive behavior where rendered QA finds clipping, overflow, unreadable controls, or poor hero cropping.
- Publish directly to the `main` branch of `NatalieArt/blogs-newsletters`, whose GitHub Pages source is the repository root.

## Page and metadata

- Canonical and `og:url`: `https://natalieart.github.io/blogs-newsletters/onboarding/`
- `og:image` and `twitter:image`: `https://natalieart.github.io/blogs-newsletters/onboarding/assets/hero.jpg`
- Add the hero image width, height, and descriptive alt metadata.
- Use `summary_large_image` for Twitter/X.
- Remove the temporary `noindex` directive so the public page can be indexed.
- Use the file-based hero image in the rendered banner instead of an embedded duplicate where practical, reducing HTML weight without changing the visual.

## Responsive behavior

- Preserve the wide editorial layout on desktop.
- At mobile widths, keep the header navigation usable without horizontal overflow.
- Reduce page gutters and hero height, keep the headline legible, and retain a useful crop of the banner.
- Make wide tables horizontally scrollable within the viewport.
- Stack multi-column content and keep buttons, prompt boxes, figures, captions, and footer content inside the viewport.

## Validation

- Serve the repository locally and test the exact `/onboarding/` route.
- Verify one desktop viewport and at least one mobile viewport.
- Confirm page identity, meaningful content, no framework error state, no relevant console errors, screenshot evidence, and at least one navigation or interactive control.
- Inspect the final HTML metadata and asset URLs.
- Push only the intended onboarding files and this design document.
- Wait for GitHub Pages deployment and verify the public URL returns the finished page.

## Failure handling

- If the source copy or metadata validation fails, do not push.
- If GitHub Pages deployment fails, inspect the deployment run and fix only publication-related issues.
- If social previews cache an older image, use a version query parameter while retaining the same banner asset.
