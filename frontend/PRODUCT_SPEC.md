Real Time Accessibility Auditor — Frontend Product Specification

This document summarizes the frontend-specific responsibilities, UX surfaces, and deliverables required to implement the product described in `PRODUCT_SPEC.md`.

1. Key responsibilities

- Provide public landing page and scan submission UI.
- Display scan progress and real-time updates.
- Render screenshot viewer with overlays and an accessible UI for issue details.
- Provide DOM inspector, issue list, filtering and exports.
- Provide SDK/snippet (`injector.js`) integration instructions for customers.

2. Pages & components

- **Landing**: URL input, CTA, demo media and feature highlights.
- **Scan progress**: stepper with per-step progress and cancel control.
- **Results dashboard**: screenshot viewer, overlay layer controls, issue list, DOM inspector, export panel.
- **History** (optional): list of past scans, comparison view and simple charts.
- **Settings** (optional): UI preferences, privacy and retention toggles.

3. Important UI behaviors

- Overlays must be keyboard accessible and reachable via a single shortcut.
- All interactive controls follow accessible patterns and are screen-reader friendly.
- Snapshot viewer supports pan, zoom, tooltips, and keyboard navigation between issues.

4. Integration contracts

- `POST /api/v1/scans` — submit scan (returns `scanId`).
- `POST /api/v1/uploads` — request presigned URL for image uploads.
- `GET /ws/scans/{scanId}` — stream incremental findings.

5. Developer ergonomics

- Expose copyable code snippets for suggested fixes (React, CSS, plain HTML).
- Storybook for UI components and visual regression tests for overlay rendering.

6. Local dev

- Provide `docker-compose` to run FastAPI, Redis, Postgres and MinIO for local testing.
- Provide sample pages for integration tests.

---

Place this file under `frontend/` to guide frontend engineering work.
