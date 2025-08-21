# Project Plan — liatrio-copilot-catalyst-ui

This plan outlines an iterative path to: (1) fix and modernize Docker/Docker Compose so the app runs reliably, (2) refresh the UI to current branding, and (3) ensure unit tests still pass with CI-friendly validation.

## Goals
- [ ] Reliable local/dev container experience using Docker and Compose.
- [ ] UI aligned with current Liatrio branding (logo, colors, typography, spacing).
- [ ] Green test suite with typecheck and lint gates.

## Checklist
- [ ] Phase 1: Docker/Compose refresh runs `docker compose up` successfully.
- [ ] Phase 2: UI branding refresh aligns visuals and assets.
- [ ] Phase 3: Tests and quality gates pass consistently (CI-ready).

---

## Phase 1 — Docker/Compose refresh

What we have now
- [ ] Dockerfile: multi-stage build (builder -> runner) using Node 20 Alpine; runs `validateBuild` then `npm prune --production`; `npm start` in runner.
- [ ] Compose: `image: ${APP_NAME}:${SHA_TAG}` and `container_name: ${APP_NAME}` with ports `${APP_PORT}:3000`; expects env vars (APP_NAME, SHA_TAG, APP_PORT). Networks `frontend` and `backend` defined.
- [ ] `.env.template` includes `APP_NAME`, `APP_PORT`, `DKS_API_BASE_URL` but not `SHA_TAG`.

Issues to address
- [ ] Missing defaults break `docker compose up` when env vars aren’t defined (notably `SHA_TAG`).
- [ ] API base URL must be set inside the container (use `host.docker.internal:8080` for local Mac).
- [ ] Compose should reference a default `.env` and/or inline environment with sensible fallbacks.

Planned changes
1. Add `.env` (git-ignored) based on `.env.template` with:
   - [ ] `SHA_TAG=local`
   - [ ] `DKS_API_BASE_URL=http://host.docker.internal:8080`
   - [ ] Optionally `ENABLE_IMAGE_URL=false`
2. Update `docker-compose.yml` to be friendlier:
   - [ ] Use fallbacks in image tag: `${SHA_TAG:-local}`
   - [ ] Provide `env_file: .env` or explicit `environment:` including `DKS_API_BASE_URL` and flags.
   - [ ] Keep port mapping `${APP_PORT:-3000}:3000` as safe default.
3. Optional niceties:
   - [ ] Add simple `healthcheck` on `http://localhost:3000`.
   - [ ] Add `profiles` (e.g., `dev`) if needed later.

Acceptance
- [ ] Running `docker compose up --build` serves the app on `http://localhost:3000` without setting manual env variables.

---

## Phase 2 — UI branding refresh

Scope
- [ ] Replace/update logo and color palette.
- [ ] Introduce CSS variables for theme tokens in `src/styles/globals.css`.
- [ ] Update `Layout` header/footer (typography, spacing, contrast, and responsive behavior).
- [ ] Ensure feature-flagged content (ENABLE_IMAGE_URL) still behaves.

Tasks
1. Assets
   - [ ] Swap `public/liatrio.png` with current branding asset (retain filename or update references in `Layout`).
   - [ ] Validate favicons and social preview images (optional refresh).
2. Theme tokens
   - [ ] Define `--color-primary`, `--color-surface`, `--color-text`, etc. in `globals.css`.
   - [ ] Migrate key components (`Layout`, `SubmitButton`, `LabeledInput`, `Table`) to tokens.
3. Typography
   - [ ] Confirm Roboto/Roboto Condensed usage; set base sizes/line-heights; ensure good contrast.
4. Accessibility
   - [ ] Button/link focus states; aria labels on inputs; color contrast ≥ WCAG AA where practical.
5. Visual QA
   - [ ] Cross-browser smoke (Chromium/Safari/Firefox) and responsive checks.

Acceptance
- [ ] Consistent branding across header, primary buttons, and key UI surfaces.
- [ ] No regressions in layout or interaction; Lighthouse a11y checks pass basic thresholds.

---

## Phase 3 — Tests and quality gates

What exists
- [ ] Jest setup targeting `src/`, jsdom env, coverage HTML/LCOV.
- [ ] TypeScript 5.x, Next 14.x, ESLint (next/core-web-vitals), stylelint.

Planned work
1. Baseline
    - [ ] Run `npm run validateBuild` and `npm test`:
       - [x] Locally
       - [ ] In container
       - [ ] Fix any flakes if present
2. Add tests as needed
   - [ ] Components updated for branding: add minimal render tests and a11y assertions (e.g., roles/labels).
   - [ ] API route tests already exist; extend for error paths if gaps appear.
3. Enforce gates
   - [ ] Keep `validateBuild` (types + lint + build) green.
   - [ ] Maintain or modestly improve coverage while avoiding brittle snapshots.

Acceptance
- [ ] `npm run validateBuild` and `npm test` pass locally and under Docker.
- [ ] Coverage report generates without failures; critical paths covered.

---

## Optional — CI and docs
- [ ] Add a GitHub Actions workflow to run `validateBuild` + `test` and publish coverage artifact.
- [ ] Update `README.md` with Docker/Compose quickstart and `.env` guidance.
- [ ] If using MkDocs/TechDocs, add a “Runbook” page linking these steps and troubleshooting.

---

## Risks & assumptions
- [ ] Assumes API is reachable on `http://host.docker.internal:8080` in local dev; override via `DKS_API_BASE_URL` if different.
- [ ] Next.js/sharp on Alpine typically works, but if issues arise we can switch to Debian-slim base.
- [ ] Compose networks are simple; if integrating with other stacks, we may need additional services or reverse proxy.

## Execution order (iterative)
1) [ ] Phase 1 Docker/Compose (small PR)
2) [ ] Phase 2 UI branding (small PRs per component or per theme token)
3) [ ] Phase 3 tests/gates tightening (follow-up PR)

## Try it (after Phase 1)
- [ ] Create `.env` from `.env.template` and add `SHA_TAG=local`.
- [ ] Run: `docker compose up --build`.
- [ ] Open: `http://localhost:3000`.

---

## Implementation notes (for future PRs)
- [ ] `docker-compose.yml` candidate edits:
   - [ ] `image: ${APP_NAME}:${SHA_TAG:-local}`
   - [ ] `ports: ["${APP_PORT:-3000}:3000"]`
   - [ ] `env_file: .env` or `environment:` including `DKS_API_BASE_URL`
- [ ] UI tokens: define variables in `src/styles/globals.css` and consume in components; keep changes incremental.
- [ ] Keep PRs small and testable; run `npm run test` and confirm coverage HTML in `/coverage`.
