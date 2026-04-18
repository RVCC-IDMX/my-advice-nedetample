// Imports
import { meetsAllCriteria, getMatchScore } from './matching.js';
import { showResults, showNoResults, showDetail } from './views.js';

// Global variables and DOM element queries
let songs = [];
const recommendationsDiv = document.querySelector('#recommendations');
const form = document.querySelector('#preferences-form');
const randomPickBtn = document.querySelector('#random-pick');
const randomPickArea = document.querySelector('#random-pick-area');
const detailDiv = document.querySelector('#detail-view');
const getRecommendationsBttn = document.querySelector('#get-recs');

// Utility Functions
export function loadCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export function saveCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore localStorage errors
  }
}

export function matchScoreLabel(score) {
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
      return '';
  }
}

function formatDuration(seconds) {
  if (typeof seconds !== 'number' || Number.isNaN(seconds)) {
    return '';
  }
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

// Data Fetching
async function fetchSongs() {
  recommendationsDiv.textContent = '';
  const loading = document.createElement('div');
  loading.className = 'song-card';
  loading.textContent = 'Loading...';
  recommendationsDiv.append(loading);
  try {
    const response = await fetch('/.netlify/functions/api');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format from API');
    }
    songs = data;
    saveCache('songs', data);
  } catch (error) {
    recommendationsDiv.textContent = '';
    const message = document.createElement('div');
    message.className = 'song-card';
    message.textContent = `Error loading songs: ${error.message}`;
    recommendationsDiv.append(message);
    songs = [];
  }
}

// Filtering and Preferences
function getPreferences() {
  const time = form.time.value;
  const genre = form.genre.value;
  const activity = form.activity ? form.activity.value : '';
  const rank = form.rank ? form.rank.value : '';
  return { time, genre, activity, rank };
}

function getFilteredSongs(prefs) {
  return songs.filter((song) => meetsAllCriteria(song, prefs));
}

// Rendering Functions
function renderRecommendations(matches, prefs) {
  recommendationsDiv.textContent = '';
  if (!songs.length) {
    const message = document.createElement('div');
    message.className = 'song-card';
    message.textContent = 'No songs available. Try again later!';
    recommendationsDiv.append(message);
    return;
  }
  if (!matches.length) {
    showNoResults(recommendationsDiv);
    return;
  }
  const scored = matches
    .map((song) => ({
      ...song,
      matchScore: getMatchScore(song, prefs),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 20);
  showResults(scored, recommendationsDiv);
  renderRecommendations.lastResults = scored;
}

function renderRandomPick(song) {
  randomPickArea.textContent = '';
  if (!song) {
    const message = document.createElement('div');
    message.className = 'random-pick-card';
    message.textContent = 'No matches to spin! Try loosening your filters.';
    randomPickArea.append(message);
    return;
  }

  const card = document.createElement('div');
  card.className = 'random-pick-card';

  const recordIcon = document.createElement('span');
  recordIcon.className = 'record-icon';
  recordIcon.setAttribute('aria-label', 'vinyl record');
  recordIcon.setAttribute('role', 'img');
  recordIcon.textContent = '🎵';

  const titleDiv = document.createElement('div');
  titleDiv.className = 'song-title';
  titleDiv.textContent = song.title;

  const artistDiv = document.createElement('div');
  artistDiv.className = 'song-artist';
  artistDiv.textContent = song.artist;

  const metaDiv = document.createElement('div');
  metaDiv.className = 'song-meta';

  const activitySpan = document.createElement('span');
  if (song.activity) activitySpan.textContent = song.activity;

  const vibeSpan = document.createElement('span');
  if (song.vibe) vibeSpan.textContent = song.vibe;

  const genreSpan = document.createElement('span');
  if (song.genre) genreSpan.textContent = song.genre;

  const durationSpan = document.createElement('span');
  durationSpan.textContent = formatDuration(song.durationSeconds);

  metaDiv.append(activitySpan, vibeSpan, genreSpan, durationSpan);
  card.append(recordIcon, titleDiv, artistDiv, metaDiv);
  randomPickArea.append(card);
}

// Event Handlers
function handleBackClick() {
  if (detailDiv) detailDiv.classList.add('hidden');
  if (recommendationsDiv) recommendationsDiv.classList.remove('hidden');
  if (renderRecommendations.lastResults) {
    showResults(renderRecommendations.lastResults, recommendationsDiv);
  }
}

function handleCardClick(event) {
  const backButton = event.target.closest('.back-btn');
  if (backButton) {
    handleBackClick();
    return;
  }

  const card = event.target.closest('.song-card');
  if (!card) return;
  const title = card.dataset.title;
  const item = renderRecommendations.lastResults?.find(
    (song) => song.title === title
  );
  if (item && detailDiv) {
    recommendationsDiv.classList.add('hidden');
    showDetail(item, detailDiv);
  }
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Attach Event Listeners
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    randomPickArea.textContent = '';
    if (!songs.length) {
      await fetchSongs();
    }
    const prefs = getPreferences();
    const matches = getFilteredSongs(prefs);
    renderRecommendations(matches, prefs);
  });

  randomPickBtn.addEventListener('click', async () => {
    if (!songs.length) {
      await fetchSongs();
    }
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

  recommendationsDiv.addEventListener('click', handleCardClick);

  getRecommendationsBttn.addEventListener('click', () => {
    setTimeout(() => {
      const allOptions = document.querySelectorAll(
        '#recommendations .song-card'
      );
      for (const [index, card] of allOptions.entries()) {
        if (card.querySelector('.card-badge')) continue; // Don't add twice
        card.classList.add('experiment-border');
        const badge = document.createElement('span');
        badge.textContent = `#${index + 1}`;
        badge.className = 'card-badge';
        card.prepend(badge);
      }
    }, 0);
  });

  // Initial Load
  (async () => {
    const cached = loadCache('songs');
    if (cached && Array.isArray(cached) && cached.length > 0) {
      songs = cached;
      renderRecommendations(songs.slice(0, 20), {});
    } else {
      await fetchSongs();
      renderRecommendations(songs.slice(0, 20), {});
    }
  })();

  // Style/UI additions
  const img = document.createElement('img');
  img.src = 'src/images/spinningRecord.gif';
  img.alt = 'Spinning record animation';
  img.classList.add('banner-image');
  const subtitle = document.querySelector('p.subtitle');
  if (subtitle) {
    subtitle.after(img);
  }

  let footer = document.querySelector('footer');
  if (!footer) {
    footer = document.createElement('footer');
    document.body.append(footer);
  }
  const link = document.createElement('a');
  link.href = 'https://github.com/nedetample';
  link.textContent = 'Visit my GitHub';
  link.target = '_blank';
  footer.append(link);
});
