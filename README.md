# 3D Flight Simulator

A browser-based 3D flight simulator with infinite procedural terrain and a flyable plane.

**Live:** [https://arczewski.github.io/3d-flight-sim/](https://arczewski.github.io/3d-flight-sim/)

## How it works

Everything runs from a single static `index.html` - no external dependencies, no build step.
Raw WebGL renders a procedurally generated world from a seeded noise function:

- **Infinite terrain** - mountains, valleys, lakes, forests generated on the fly, following the plane
- **Flight physics** - pitch/roll/yaw with auto-stabilization, coordinated turns, and stall behavior
- **Clouds, fog, and dynamic HUD** - airspeed, altitude, heading, pitch, roll, throttle

## Controls

| Key | Action |
|-----|--------|
| `W` / `Up` | Pitch down (dive) |
| `S` / `Down` | Pitch up (climb) |
| `A` / `Left` | Bank left |
| `D` / `Right` | Bank right |
| `Q` / `E` | Yaw left / right |
| `Shift` | Increase throttle |
| `Ctrl` | Decrease throttle |
| `Space` | Brakes |
| `C` | Toggle camera (chase / cockpit) |
| `R` | Restart |
| `Esc` | Pause |

## Run locally

Serve the directory and open `index.html`, or just open the file directly - it needs no server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish

Push to `main` on GitHub - GitHub Pages serves the repo root, so `index.html` is the site entry point.
