import { matchScoreLabel } from './app.js';
export { showResults, showNoResults, showDetail };

function showResults(items, container) {
  // Show this view
  container.classList.remove('hidden');
  // Clear previous content
  container.textContent = '';
  for (const item of items) {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.dataset.title = item.title;

    const titleDiv = document.createElement('div');
    titleDiv.className = 'song-title';
    titleDiv.textContent = item.title;

    const artistDiv = document.createElement('div');
    artistDiv.className = 'song-artist';
    artistDiv.textContent = item.artist;

    const metaDiv = document.createElement('div');
    metaDiv.className = 'song-meta';

    const activitySpan = document.createElement('span');
    activitySpan.textContent = item.activity;
    const vibeSpan = document.createElement('span');
    vibeSpan.textContent = item.vibe;
    const genreSpan = document.createElement('span');
    genreSpan.textContent = item.genre;
    const durationSpan = document.createElement('span');
    durationSpan.textContent = item.durationSeconds
      ? formatDuration(item.durationSeconds)
      : '';

    metaDiv.append(activitySpan);
    metaDiv.append(vibeSpan);
    metaDiv.append(genreSpan);
    metaDiv.append(durationSpan);

    card.append(titleDiv);
    card.append(artistDiv);
    card.append(metaDiv);
    // Add match score label if present
    if (typeof item.matchScore === 'number') {
      const scoreDiv = document.createElement('div');
      scoreDiv.className = 'match-score';
      scoreDiv.textContent = matchScoreLabel(item.matchScore);
      card.append(scoreDiv);
    }
    // No click handler here; handled in app.js
    container.append(card);
  }
}

function showNoResults(container) {
  container.classList.remove('hidden');
  container.textContent = '';
  const msg = document.createElement('div');
  msg.className = 'song-card';
  msg.textContent = 'No matches found. Try loosening your filters!';
  container.append(msg);
}

function showDetail(item, container) {
  container.classList.remove('hidden');
  container.textContent = '';
  const detail = document.createElement('div');
  detail.className = 'song-detail';

  const titleDiv = document.createElement('div');
  titleDiv.className = 'song-title';
  titleDiv.textContent = item.title;

  const artistDiv = document.createElement('div');
  artistDiv.className = 'song-artist';
  artistDiv.textContent = item.artist;

  const metaDiv = document.createElement('div');
  metaDiv.className = 'song-meta';

  const activitySpan = document.createElement('span');
  activitySpan.textContent = item.activity;
  const vibeSpan = document.createElement('span');
  vibeSpan.textContent = item.vibe;
  const genreSpan = document.createElement('span');
  genreSpan.textContent = item.genre;
  const durationSpan = document.createElement('span');
  durationSpan.textContent = item.durationSeconds
    ? formatDuration(item.durationSeconds)
    : '';

  metaDiv.append(activitySpan);
  metaDiv.append(vibeSpan);
  metaDiv.append(genreSpan);
  metaDiv.append(durationSpan);

  detail.append(titleDiv);
  detail.append(artistDiv);
  detail.append(metaDiv);

  // Add back button
  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.textContent = 'Back';
  backButton.className = 'back-btn';
  detail.append(backButton);

  container.append(detail);
}

// Helper for formatting duration (copied from app.js, or import if available, precautionary from AI agent)
function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return '';
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}
