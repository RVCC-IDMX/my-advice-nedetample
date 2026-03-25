// Matching logic for What Should I Listen To?
// Exports: matchesVibe, matchesActivity, matchesGenre, fitsTimeAvailable, meetsAllCriteria, getMatchScore

/**
 * Returns true if the song matches the selected vibe, or if no vibe is selected.
 */
export function matchesVibe(song, vibe) {
  return !vibe || song.vibe === vibe;
}

/**
 * Returns true if the song matches the selected activity, or if no activity is selected.
 */
export function matchesActivity(song, activity) {
  return !activity || song.activity === activity;
}

/**
 * Returns true if the song matches the selected genre, or if no genre is selected.
 */
export function matchesGenre(song, genre) {
  return !genre || song.genre === genre;
}

/**
 * Returns true if the song fits within the selected time (in seconds), or if no time is selected.
 */
export function fitsTimeAvailable(song, maxSeconds) {
  return !maxSeconds || song.durationSeconds <= Number(maxSeconds);
}

/**
 * Returns true if the song matches all selected criteria.
 */
export function meetsAllCriteria(song, prefs) {
  return (
    matchesVibe(song, prefs.vibe) &&
    matchesActivity(song, prefs.activity) &&
    matchesGenre(song, prefs.genre) &&
    fitsTimeAvailable(song, prefs.time)
  );
}

/**
 * Returns a match score (0-4) for how many criteria the song matches.
 */
export function getMatchScore(song, prefs) {
  let score = 0;
  if (matchesVibe(song, prefs.vibe)) score++;
  if (matchesActivity(song, prefs.activity)) score++;
  if (matchesGenre(song, prefs.genre)) score++;
  if (fitsTimeAvailable(song, prefs.time)) score++;
  return score;
}
