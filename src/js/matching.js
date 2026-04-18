/**
 * Returns true if the song matches the selected rank category, or if no rank is selected, or if the song has no rank.
 * Rank categories:
 *   - very-popular: rank >= 500000
 *   - somewhat-popular: 100000 <= rank < 500000
 *   - niche: 10000 <= rank < 100000
 *   - unheard: rank < 10000
 */
export function matchesRank(song, rankCategory) {
  if (!rankCategory) return true;
  if (typeof song.rank !== 'number') return true;
  if (rankCategory === 'very-popular') return song.rank >= 500000;
  if (rankCategory === 'somewhat-popular')
    return song.rank >= 100000 && song.rank < 500000;
  if (rankCategory === 'niche') return song.rank >= 10000 && song.rank < 100000;
  if (rankCategory === 'unheard') return song.rank < 10000;
  return true;
}
// Matching logic for What Should I Listen To?
// Exports: matchesVibe, matchesActivity, matchesGenre, fitsTimeAvailable, meetsAllCriteria, getMatchScore

/**
 * Returns true if the song matches the selected vibe, or if no vibe is selected.
 */
export function matchesVibe(song, vibe) {
  return !vibe || song.vibe === vibe;
}

/**
 * Returns true if the song matches the selected genre, or if no genre is selected, or if the song has no genre.
 */
export function matchesGenre(song, genre) {
  if (!genre) return true;
  if (!song.genre) return true;
  return song.genre.toLowerCase() === genre.toLowerCase();
}

/**
 * Returns true if the song fits within the selected time (in seconds), or if no time is selected.
 */
export function fitsTimeAvailable(song, maxSeconds) {
  if (!maxSeconds) return true;
  if (
    typeof song.durationSeconds !== 'number' ||
    Number.isNaN(song.durationSeconds)
  )
    return false;
  return song.durationSeconds <= Number(maxSeconds);
}

/**
 * Returns true if the song matches all selected criteria (ignores genre/activity if missing).
 */
export function matchesActivity(song, activity) {
  if (!activity) return true;
  if (!song.activity) return true;
  return song.activity === activity;
}

export function meetsAllCriteria(song, prefs) {
  return (
    matchesGenre(song, prefs.genre) &&
    matchesActivity(song, prefs.activity) &&
    matchesRank(song, prefs.rank) &&
    fitsTimeAvailable(song, prefs.time)
  );
}

/**
 * Returns a match score (0-3) for how many criteria the song matches (genre, activity, time).
 */
export function getMatchScore(song, prefs) {
  let score = 0;
  if (matchesGenre(song, prefs.genre)) score++;
  if (matchesActivity(song, prefs.activity)) score++;
  if (matchesRank(song, prefs.rank)) score++;
  if (fitsTimeAvailable(song, prefs.time)) score++;
  return score;
}
