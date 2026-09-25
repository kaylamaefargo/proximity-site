# Proximity site — deploy to GitHub Pages

This folder is ready to publish as-is. 10 files: 8 pages + 2 images, all internal links already rewritten to relative filenames (no more claude.ai URLs).

## One-time setup

1. Create a free GitHub account at github.com if you don't have one.
2. Create a new repository — name doesn't matter (e.g. `proximity-site`). Public is fine and free; Private also works on GitHub Pages now.
3. Upload every file in this folder into the repository root (drag-and-drop works on github.com — click "Add file" → "Upload files").
4. In the repo, go to **Settings → Pages**.
5. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
6. GitHub gives you a URL like `https://<username>.github.io/proximity-site/` — wait a minute or two, then open it to confirm the site works.

## Pointing byproximity.com at it

Once the `github.io` URL works, go to wherever `byproximity.com`'s DNS is managed (currently Squarespace, under Domains → DNS Settings) and add:

- An **A record** for the root domain (`@`) pointing to GitHub Pages' IP addresses:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- A **CNAME record** for `www` pointing to `<username>.github.io`

Then, back in the GitHub repo's **Settings → Pages**, enter `byproximity.com` as the **Custom domain** and save — GitHub creates a `CNAME` file in the repo automatically. Check "Enforce HTTPS" once it becomes available (can take a few hours after DNS propagates).

DNS changes can take anywhere from a few minutes to 24 hours to fully propagate.

## What was changed from the Artifact versions

- `home.html` → renamed `index.html` (GitHub Pages serves this as the homepage automatically)
- Every internal nav/footer/CTA link (previously `https://claude.ai/code/artifact/...` or `https://claude.ai/artifact/...`) rewritten to plain relative filenames: `index.html`, `fractional.html`, `teardown.html`, `about.html`, `contact.html`, `roadmap.html`, `roadmap-terms.html`
- Nothing else changed — no CSS, copy, or structure edits. External links (Reclaim booking, Stripe, LinkedIn, TikTok, the intake Google Form, Google Fonts) are untouched.

## Still-open items carried over from the Artifact build (not fixed here)

- `kayla@byproximity.com` is a placeholder email on Contact, About, and roadmap-next — swap in your real inbox before going live.
- Teardown page's "half of the $10,000 is credited toward follow-on work" — a placeholder number, not a confirmed policy.
- `roadmap.html`'s "Why me" section still says "15 years in B2B marketing" — this conflicts with the corrected "thirteen years" figure used everywhere else on the site (from your resume). Since that page's copy was treated as final from your handoff brief, it wasn't changed here — flagging so you can decide whether to update it before this goes live.
