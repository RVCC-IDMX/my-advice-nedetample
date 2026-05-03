# Final project suggestions for whatshouldilistentonow

> [!IMPORTANT]
> Before starting the final, complete and close your "Pre-final feedback" issue.

## Your Week 4 starting point (recap)

Your Week 4 was substantive — seven commits, sequential, parts in order. Your blocker fixes from Week 3 landed first (commit `bdb5ddf FIxed blockers to prepare for week 4`) before your Week 4 PR merged: that "fix-then-build" sequencing is the right rhythm and you should keep it for the final. Your serverless function fetches Deezer's `/chart/0/tracks?limit=20` and transforms each track into your songs shape with three new fields (`albumImage`, `albumTitle`, `rank`). Your `loadCache`/`saveCache` use the safe wrapper pattern with `Array.isArray` validation and self-heal `removeItem`. You also dropped two filter categories (activity, vibes) because Deezer didn't return them — exactly the kind of student-agency decision the assignment encourages. That dropped-filter reflection muscle is the same skill you will use to decide pattern choice for the final.

## How each pattern fits your project

### Pattern A — translate input to API params

Strong fit. Your existing form already collects vibe + activity + duration. Pattern A turns those into a free-text input ("upbeat songs for a Saturday morning run") and Groq translates into a Deezer search query. Deezer's search API takes a single query string, so the Groq output is simple. The bigger win is what the search query looks like — Groq can construct queries that combine genre, mood, and tempo in ways Deezer's literal search would not otherwise expose.

### Pattern B — narrate the API results

**Strongest fit in the cohort for this pattern.** Your result data is dense — track title, artist, album, duration, rank, the 30-second `preview` URL you have not yet wired up. Music commentary is a natural pattern (think of how Spotify writes "Here is why we picked this" copy on its made-for-you playlists). Adding an `<audio controls src="...">` element next to each track (the Deezer preview) compounds well with the commentary — a curated, narrated, audible recommendation.

### Pattern A+B — both, chained

Worth the two calls for music. Both ends of the loop benefit (input collapse + narrated output), and the result feels like an actual DJ recommendation. Latency is acceptable for music — listening is patient.

## What carries over (and what doesn't)

- **Your Deezer transform** — stays. The shape stays the same.
- **Your cache wrapper** — stays. See the _How the cache changes_ section in whichever pattern you pick.
- **Your views.js** — keeps `createElement` + `textContent`. Add a refusal renderer for `refused: true`. For Pattern B, add render hooks for `intro`, per-track `why_this_song`, and the `refused` branch.
- **Your dropped-filter decision** — Pattern A makes the dropped filters obsolete anyway, so your Week 4 decision was forward-looking. The reflection muscle that named the decision will be useful for the final.
- **What changes** — your form (depending on pattern). Pattern A replaces it with a single input; Pattern B keeps it.

## A sketched Pattern B schema for Deezer narration

```js
{
  "playlist_intro": string,                              // 1–2 sentence intro for the user's request
  "track_notes": [
    { "track_id": number, "why_this_song": string }      // one short note per track
  ],
  "refused": boolean,
  "refusal_reason": string
}
```

Track-keying by Deezer's stable `id` field is more reliable than title-keying (artists often have same-titled songs across albums). Pass a short summary of each track into the Groq prompt; do not pass the full Deezer response.

## My soft recommendation

If I had to pick one for you, I would pick **Pattern B**. You have the strongest Pattern B fit in the cohort — music commentary is a natural form, your data is rich, and the Deezer preview audio wiring (~10 lines) compounds with narration into a "curated DJ" UX no one else in the cohort can ship. Pattern A is a clean fallback if the Pattern B prompt design feels too uncertain to start with; you can layer A on top toward A+B if time allows.

## What to read next

- `INSTRUCTIONS.md` — the assignment overview
- `CHECKLIST.md` — concrete deliverables
- `docs/tutorials/pattern-b-narrate-output.md` — Pattern B walkthrough with Open Library; translate the schema to Deezer
- `docs/tutorials/groq-moderation-floor.md` — the four required defenses
