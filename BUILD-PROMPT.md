# What Should I Listen To? — Rebuild Spec & Prompt

You are an AI coding assistant (e.g., GitHub Copilot Chat) helping me rebuild a small web app in a **brand-new repo**. Use this file as the source of truth for what to build.

---

## 1. Overview

- **Project name:** What Should I Listen To?
- **Domain:** Music recommendations
- **Core question:** "What should I listen to right now?"
- **High-level behavior:**
  - I choose preferences in a form (vibe, activity, genre, time available).
  - The app filters a dataset of songs and shows matching recommendations.
  - I can also click a **Random Pick** button to get a single suggestion.

This is a **front-end only** project: one HTML page, one CSS file, and one or more JS files. No backend.

---

## 2. Tech & Constraints

- **HTML/CSS/JS only** (vanilla). No frameworks like React, Vue, or CSS frameworks like Bootstrap.
- Prefer **plain code first**:
  - Do not add external libraries unless I explicitly ask for them.
- Organize with **separate files**:
  - `index.html` — structure and content
  - `styles.css` — all styling
  - `data.js` (or similar) — song data
  - `matching.js` — matching / filtering logic
  - `app.js` — DOM wiring and behaviors
- Use semantic HTML as much as possible (e.g., `header`, `main`, `section`, `button`).

When in doubt, keep things simple and readable.

---

## 3. Data Model

Use a JavaScript file that defines a list of song objects.

- **Minimum required properties per song:**
  - `title` (string) — song title
  - `artist` (string) — artist name
  - `activity` (string) — what I might be doing (e.g., `driving`, `studying`, `workout`, `sleeping`, `party`, `relaxing`)
  - `vibe` (string) — how the song feels (e.g., `chill`, `hyped`, `focused`, `upbeat`)
  - `genre` (string) — e.g., `rock`, `rap`, `pop`, `jazz`, `classical`, `indie`
  - `durationSeconds` (number) — duration in seconds

- **Data requirements:**
  - Create at least **15–20 songs** to make recommendations feel meaningful.
  - Values for `activity`, `vibe`, and `genre` should line up with the options in the form.

Implementation hint: expose the data as a global `songs` array or a `data` object with an `options` array, similar to my original project.

---

## 4. Features & Behavior

### 4.1 Form → Recommendations flow

- A form where I can choose:
  - **Vibe** (dropdown: `Any vibe`, `Chill`, `Hyped`, `Focused`, `Upbeat`)
  - **Time available** (dropdown: `Any amount`, `3 minutes or less`, `5 minutes or less`, `8 minutes or less`, `15 minutes or less`)
  - **Genre** (dropdown: `Any genre` + options that match the data)
  - **Activity** (dropdown: `Any activity` + options that match the data)
- A **"Get Recommendations"** button that:
  - Reads the form values.
  - Converts time into a numeric limit in minutes/seconds as needed.
  - Filters the song dataset using matching functions.
  - Displays a list of matching songs.

If there are **no matches**, show a friendly, encouraging message (not just "No results").

### 4.2 Random Pick button

Add a **Random Pick** feature with this behavior:

- A separate button labeled something like **"Surprise Me"** or **"Spin the Record"**.
- When clicked:
  - If there are **current filters selected**, choose **one random song from the filtered matches**.
  - If **no filters** are selected, choose one random song from the full dataset.
- Display the random pick in a visually distinct way (e.g., a highlighted card, a small badge, or a "Now Playing" area).

If there are **no matches** under the current filters, show a playful message suggesting the user loosen the filters.

### 4.3 Matching logic

Implement matching functions similar to my original project:

- Single-criterion matchers like `matchesVibe`, `matchesActivity`, `matchesGenre`.
- A range/time check like `fitsTimeAvailable`.
- A combined function `meetsAllCriteria(item, preferences)` that returns `true` only if all selected criteria match.
- Handle **empty / no preference** cases by treating them as "match anything" for that field.

Optionally, create a simple **match score** (e.g., 0–4) and an associated message like "Perfect match", "Great match", etc., to display on each card.

---

## 5. UI & Layout

### 5.1 Page sections

Layout the page into clear sections:

- **Header / hero area**
  - App title: "What Should I Listen To?"
  - A short subtitle that explains the idea in a friendly way.
- **Preferences section**
  - Contains the form in a card-like box.
- **Results section**
  - A heading (e.g., "Recommendations").
  - An area where recommendation cards are rendered.
  - A dedicated area or styling for the Random Pick song.

Use a single-column layout that works well on mobile and desktop.

### 5.2 Recommendation cards

For each recommended song, show at least:

- Title
- Artist
- Activity
- Vibe
- Genre
- Duration (formatted in minutes and seconds if possible)

Style each card consistently and make them feel like **little record sleeves or playlist tiles**.

---

## 6. Visual Style — Cozy Retro Records

The visual design should feel **cozy, retro, and record-inspired**, with a calm and playful vibe.

- **Color palette:**
  - Warm, muted tones (e.g., creams, soft browns, muted oranges, dusty pinks, desaturated teal).
  - Avoid harsh pure white/black; prefer off-whites and deep, soft darks.
- **Typography:**
  - Use system fonts but combine a slightly bolder display style for headings with a clean, readable body font.
  - Headings can feel a bit retro (rounded corners, letter spacing, or subtle text-shadow) without going overboard.
- **Shapes and motifs:**
  - Rounded corners, subtle shadows.
  - Optional subtle references to vinyl records (e.g., circular accents, thin concentric borders, or a small record icon by the Random Pick section).
- **States and feedback:**
  - Smooth hover states for buttons (color change, slight scale).
  - Clear focus styles for accessibility.

Overall, it should feel like a cozy, vintage listening corner, not a loud nightclub.

---

## 7. Implementation Notes

- Keep JavaScript **modular and readable**:
  - Separate pure matching logic from DOM manipulation.
  - Use clear function names and, when helpful, brief comments or JSDoc-style annotations.
- Avoid global variables except where necessary for data.
- No network calls or external APIs are required; all data is local.

Error handling / edge cases:

- If the data array is empty, show a friendly "no songs available" message.
- If the user clicks **Random Pick** before any songs are loaded (shouldn’t happen in this simple setup), fail gracefully with a message instead of throwing errors.

---

## 8. Non-goals (for now)

- No user authentication or accounts.
- No saving favorites to local storage (unless I explicitly ask to add it later).
- No audio playback; this is a **recommendation UI only**.
- No backend or database.

---

## 9. How to Use This Prompt

When I paste this file into a new repo and ask you (the AI assistant) to help me build the site:

1. Read this entire spec.
2. Confirm the overall plan with me briefly.
3. Scaffold the basic files and structure.
4. Implement the data model, matching logic, and UI.
5. Style the page with the cozy retro aesthetic described above.
6. Wire up the Random Pick feature.
7. Then iterate with me on polish and small enhancements.

Always treat this markdown as the **single source of truth** for the app’s intended behavior and style, unless I tell you otherwise.
