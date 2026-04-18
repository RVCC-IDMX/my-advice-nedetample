# My code map — v2 additions

These sections were added in Week 4. Your Week 3 entries above are still valid.

---

## Serverless function

- File path: `api.mjs` (hint: `netlify/functions/api.mjs`)
- What does this function do? `fetches from my api (deezer)`
- What external API does it call? `deezer`
- What HTTP method does your function use to call the API? `fetch`

- What shape does the response have? (list the top-level properties)
  - title
  - albumCover
  - artist

---

## Environment variables

- Do you have a `.env` file in your project root? `no`
- What variable(s) are defined in it?
  -

- Are these same variables set in the Netlify UI (Site settings > Environment variables)? `___________`
- Is `.env` listed in your `.gitignore`? `___________`

---

## Data flow

How does your app get its data now compared to Week 3?

- Before (Week 3): `import { songs } from './data.js'`
- Now (Week 4): `fetch('/.netlify/functions/api')`
- Did you keep `data.js` as a fallback if the fetch fails? `no`
- Where does the fetch happen? (file and function name): `app.js, fetchSongs()`

---

## New fields from API

In Part 3A you added field(s) from the live API that your static data did not have.

- What new field(s) did you add?
  - albumCover
  - rank
  - album

- Where do they appear in your card? (what element shows them?): `albumCover= img, album title = div, rank = span`
- Did you add any CSS for the new field(s)? `yes`

---

## localStorage cache

- What key do you pass to `localStorage.setItem()`? `'songs'`
- What shape is the cached data? (array of objects, single object, etc.): `array of objectcs`
- Where is your `loadCache` function? (file and function name): `app.js, loadCache`
- Where is your `saveCache` function? (file and function name): `app.js, saveCache`
- When does your app use the cache instead of fetching? `app.js, saveCache`
