# 3D Flight Sim — Project Overview

A 3D flight simulator game: procedural terrain with a flyable plane, packaged as a **single static HTML file** and hosted on GitHub Pages. No build step, no external assets, no server.

## What this project is

A browser-based WebGL game. The player flies a plane over infinitely generated procedural terrain — mountains, valleys, forests. Controls are keyboard/mouse based, HUD shows altitude, airspeed, and heading.

## Key design decisions

- **Single file** — everything inline in `index.html` (CSS, JS, GLSL shaders, procedural terrain generator). Must work when opened from `file://` or served statically.
- **No external dependencies** — no Three.js, no CDN imports. Raw WebGL 2 (or Canvas 2D fallback) to keep it dependency-free and reliable.
- **Procedural terrain** — generated on the fly from a seeded noise function; terrain follows the plane so it is effectively infinite.
- **GitHub Pages hosting** — the repo root is served; `index.html` is the entry point. Site URL: `https://arczewski.github.io/3d-flight-sim/`

## Project files

| File | Purpose |
|------|---------|
| `index.html` | The entire game — markup, styles, game engine, terrain, plane |
| `.pi/SYSTEM.md` | Custom system prompt for this project |
| `.pi/AGENTS.md` | This file — project context for the agent |
| `README.md` | User-facing docs with controls and live link |

## Publishing

- Remote: `https://github.com/arczewski/3d-flight-sim.git` (GitHub, not Forgejo)
- Auth: `gh` CLI authenticated as `arczewski` via `GITHUB_TOKEN` env var
- Push: `git push origin main` — no PR workflow needed for this single-main project unless conflicts arise
- Pages: serve from the repo root (branch `main`, path `/`). Enable via `gh api -X POST repos/arczewski/3d-flight-sim/pages -f source[branch]=main -f source[path]=/` if not already on
- Verify live: `curl -sI https://arczewski.github.io/3d-flight-sim/` must return HTTP 200 before notifying the user

## Environment variables

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | GitHub PAT for `gh` CLI and git push (repo: arczewski) |
| `PUSHOVER_TOKEN` / `PUSHOVER_USER` | Pushover notification when the hosted game goes live |

## Controls (planned)

- `W` / `Up` — pitch down, `S` / `Down` — pitch up
- `A` / `D` — roll / yaw
- `Shift` — boost, `Space` — brakes
- `Esc` — pause/menu
