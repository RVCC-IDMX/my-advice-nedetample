import {
  showDetail,
  showLoading,
  showNoResults,
  showNarration,
  showRefusal,
  showResults,
  showStatus,
} from './views.js';

let songs = [];

const form = document.querySelector('#preferences-form');
const randomPickBtn = document.querySelector('#random-pick');
const randomPickArea = document.querySelector('#random-pick-area');
const recommendationsDiv = document.querySelector('#recommendations');
const narrationDiv = document.querySelector('#narration');
const detailDiv = document.querySelector('#detail-view');
const requestInput = document.querySelector('#request');

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
    // Ignore localStorage errors.
  }
}

function formatDuration(seconds) {
  if (typeof seconds !== 'number' || Number.isNaN(seconds)) {
    return '';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getPreferences() {
  return {
    request: requestInput?.value.trim() ?? '',
    time: form.time.value,
    genre: form.genre.value,
    rank: form.rank.value,
  };
}

function buildUserInput(prefs) {
  return [
    `Request: ${prefs.request || 'top tracks'}`,
    `Genre: ${prefs.genre || 'any'}`,
    `Time limit: ${prefs.time || 'any'}`,
    `Popularity: ${prefs.rank || 'any'}`,
  ].join('\n');
}

function buildCacheKey(prefs) {
  return `songs:${encodeURIComponent(JSON.stringify(prefs))}`;
}

function showError(container, message) {
  showStatus(container, message, 'status-card status-card--error');
}

function getCurrentSong(itemId) {
  return songs.find((song) => String(song.id) === String(itemId));
}

function renderRandomPick(song) {
  randomPickArea.textContent = '';

  if (!song) {
    showNoResults(
      randomPickArea,
      'No tracks are loaded yet. Submit the form first.'
    );
    return;
  }

  const card = document.createElement('article');
  card.className = 'random-pick-card';

  const recordIcon = document.createElement('span');
  recordIcon.className = 'record-icon';
  recordIcon.setAttribute('aria-hidden', 'true');
  recordIcon.textContent = '🎵';

  const title = document.createElement('h3');
  title.className = 'song-title';
  title.textContent = song.title;

  const artist = document.createElement('p');
  artist.className = 'song-artist';
  artist.textContent = song.artist;

  const meta = document.createElement('div');
  meta.className = 'song-meta';

  if (song.genre) {
    const genre = document.createElement('span');
    genre.textContent = song.genre;
    meta.append(genre);
  }

  if (typeof song.rank === 'number') {
    const rank = document.createElement('span');
    rank.textContent = `Rank ${song.rank}`;
    meta.append(rank);
  }

  if (song.durationSeconds) {
    const duration = document.createElement('span');
    duration.textContent = formatDuration(song.durationSeconds);
    meta.append(duration);
  }

  card.append(recordIcon, title, artist, meta);

  if (song.preview) {
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.preload = 'none';
    audio.src = song.preview;
    audio.setAttribute('aria-label', `Preview for ${song.title}`);
    card.append(audio);
  }

  randomPickArea.append(card);
}

function handleBackClick() {
  detailDiv.classList.add('hidden');
  recommendationsDiv.classList.remove('hidden');
}

function handleTrackActivation(event) {
  if (event.target.closest('audio, button, a, input, select, textarea')) {
    return;
  }

  const card = event.target.closest('.song-card');
  if (!card) return;

  const item = getCurrentSong(card.dataset.trackId);
  if (!item) return;

  recommendationsDiv.classList.add('hidden');
  showDetail(item, detailDiv);
}

function handleTrackKeydown(event) {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  const card = event.target.closest('.song-card');
  if (!card) return;

  event.preventDefault();
  const item = getCurrentSong(card.dataset.trackId);
  if (!item) return;

  recommendationsDiv.classList.add('hidden');
  showDetail(item, detailDiv);
}

async function loadRecommendations() {
  const prefs = getPreferences();
  const userInput = buildUserInput(prefs);

  if (userInput.length > 500) {
    songs = [];
    recommendationsDiv.textContent = '';
    showRefusal(narrationDiv, 'Please keep the request under 500 characters.');
    showNoResults(recommendationsDiv, 'No tracks were loaded.');
    return;
  }

  const cacheKey = buildCacheKey(prefs);
  const cachedSongs = loadCache(cacheKey);
  const hasCachedSongs = Array.isArray(cachedSongs);

  if (hasCachedSongs) {
    songs = cachedSongs;
    showResults(songs, recommendationsDiv);
  } else {
    showLoading(recommendationsDiv, 'Loading Deezer tracks...');
  }

  showLoading(narrationDiv, 'Asking Groq for a short note...');

  try {
    const response = await fetch('/.netlify/functions/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prefs,
        userInput,
        cachedSongs: hasCachedSongs ? cachedSongs : undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.songs) || !data.narration) {
      throw new Error('Invalid data format from API');
    }

    songs = data.songs;
    saveCache(cacheKey, songs);

    if (data.narration.refused) {
      songs = [];
      recommendationsDiv.textContent = '';
      showRefusal(narrationDiv, data.narration.refusal_reason);
      showNoResults(recommendationsDiv, 'No recommendations were rendered.');
      return;
    }

    if (songs.length) {
      showResults(songs, recommendationsDiv);
    } else {
      showNoResults(recommendationsDiv);
    }

    showNarration(narrationDiv, data.narration, songs);
  } catch (error) {
    if (!hasCachedSongs) {
      songs = [];
      showNoResults(recommendationsDiv, 'No tracks could be loaded right now.');
    }
    showError(
      narrationDiv,
      `Could not load the latest narration. ${error.message}`
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    randomPickArea.textContent = '';
    await loadRecommendations();
  });

  randomPickBtn.addEventListener('click', async () => {
    if (!songs.length) {
      await loadRecommendations();
    }

    if (!songs.length) {
      renderRandomPick(null);
      return;
    }

    const pick = songs[Math.floor(Math.random() * songs.length)];
    renderRandomPick(pick);
  });

  recommendationsDiv.addEventListener('click', handleTrackActivation);
  recommendationsDiv.addEventListener('keydown', handleTrackKeydown);

  detailDiv.addEventListener('click', (event) => {
    if (event.target.closest('.back-btn')) {
      handleBackClick();
    }
  });

  void loadRecommendations();
});
