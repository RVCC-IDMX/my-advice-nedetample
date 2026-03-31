// App logic and DOM wiring for What Should I Listen To?
import { songs } from './data.js';
import { meetsAllCriteria, getMatchScore } from './matching.js';

const form = document.querySelector('#preferences-form');
const recommendationsDiv = document.querySelector('#recommendations');
const randomPickBtn = document.querySelector('#random-pick');
const randomPickArea = document.querySelector('#random-pick-area');

function getPreferences() {
  const vibe = form.vibe.value;
  const time = form.time.value;
  const genre = form.genre.value;
  const activity = form.activity.value;
  return { vibe, time, genre, activity };
}

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

function matchScoreLabel(score) {
  switch (score) {
    case 4:
      return 'Perfect match';
    case 3:
      return 'Great match';
    case 2:
      return 'Good match';
    case 1:
      return 'Partial match';
    default:
      return 'No match';
  }
}

function renderRecommendations(matches, prefs) {
  recommendationsDiv.innerHTML = '';
  if (!songs.length) {
    recommendationsDiv.innerHTML = `<div class="song-card">No songs available. Try again later!</div>`;
    return;
  }
  if (!matches.length) {
    recommendationsDiv.innerHTML = `<div class="song-card">No matches found. Try loosening your filters or spinning the record!</div>`;
    return;
  }
  matches.forEach((song) => {
    const score = getMatchScore(song, prefs);
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
      <div class="song-title">${song.title}</div>
      <div class="song-artist">${song.artist}</div>
      <div class="song-meta">
        <span>${song.activity}</span>
        <span>${song.vibe}</span>
        <span>${song.genre}</span>
        <span>${formatDuration(song.durationSeconds)}</span>
      </div>
      <div class="match-score">${matchScoreLabel(score)}</div>
    `;
    recommendationsDiv.appendChild(card);
  });
}

function renderRandomPick(song) {
  if (!song) {
    randomPickArea.innerHTML = `<div class="random-pick-card">No matches to spin! Try loosening your filters.</div>`;
    return;
  }
  randomPickArea.innerHTML = `
    <div class="random-pick-card">
      <span class="record-icon" aria-label="vinyl record" role="img">&#127925;</span>
      <div class="song-title">${song.title}</div>
      <div class="song-artist">${song.artist}</div>
      <div class="song-meta">
        <span>${song.activity}</span>
        <span>${song.vibe}</span>
        <span>${song.genre}</span>
        <span>${formatDuration(song.durationSeconds)}</span>
      </div>
    </div>
  `;
}

function getFilteredSongs(prefs) {
  return songs.filter((song) => meetsAllCriteria(song, prefs));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  randomPickArea.innerHTML = '';
  const prefs = getPreferences();
  const matches = getFilteredSongs(prefs);
  renderRecommendations(matches, prefs);
});

randomPickBtn.addEventListener('click', () => {
  const prefs = getPreferences();
  const matches = getFilteredSongs(prefs);
  let pick = null;
  if (matches.length) {
    pick = matches[Math.floor(Math.random() * matches.length)];
  } else if (songs.length) {
    pick = songs[Math.floor(Math.random() * songs.length)];
  }
  renderRandomPick(pick);
});

// Initial render
renderRecommendations(songs, getPreferences());
