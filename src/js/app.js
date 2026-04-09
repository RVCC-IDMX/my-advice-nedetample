// Named handler for back button in detail view
export function handleBackClick() {
  const recommendationsDiv = document.querySelector('#recommendations');
  const detailDiv = document.querySelector('#detail-view');
  if (detailDiv) detailDiv.classList.add('hidden');
  if (recommendationsDiv) recommendationsDiv.classList.remove('hidden');
  // Restore last results
  if (renderRecommendations.lastResults) {
    showResults(renderRecommendations.lastResults, recommendationsDiv);
  }
}

// Make handler available globally for views.js
window.handleBackClick = handleBackClick;
// App logic and DOM wiring for What Should I Listen To?
import { songs } from './data.js';
import { meetsAllCriteria, getMatchScore } from './matching.js';
import { showResults, showNoResults, showDetail } from './views.js';
export { matchScoreLabel };

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
    showNoResults(recommendationsDiv);
    return;
  }
  // Attach matchScore to each song and sort
  const scored = matches
    .map((song) => ({
      ...song,
      matchScore: getMatchScore(song, prefs),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
  showResults(scored, recommendationsDiv);
  // Store last results for event delegation
  renderRecommendations.lastResults = scored;
}

// Event delegation for card clicks
const detailDiv = document.querySelector('#detail-view');
recommendationsDiv.addEventListener('click', handleCardClick);

function handleCardClick(event) {
  const card = event.target.closest('.song-card');
  if (!card) return;
  const title = card.dataset.title;
  // Find the item in the last results array
  const item = renderRecommendations.lastResults?.find(
    (song) => song.title === title
  );
  if (item && detailDiv) {
    recommendationsDiv.classList.add('hidden');
    showDetail(item, detailDiv);
  }
}

function renderRandomPick(song) {
  if (!song) {
    randomPickArea.innerHTML = `<div class="random-pick-card">No matches to spin! Try loosening your filters.</div>`; //This instance of innerHTML is safe because it is hardcoded
    return;
  }
  randomPickArea.innerHTML = '';

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
  activitySpan.textContent = song.activity;

  const vibeSpan = document.createElement('span');
  vibeSpan.textContent = song.vibe;

  const genreSpan = document.createElement('span');
  genreSpan.textContent = song.genre;

  const durationSpan = document.createElement('span');
  durationSpan.textContent = formatDuration(song.durationSeconds);

  metaDiv.appendChild(activitySpan);
  metaDiv.appendChild(vibeSpan);
  metaDiv.appendChild(genreSpan);
  metaDiv.appendChild(durationSpan);

  card.appendChild(recordIcon);
  card.appendChild(titleDiv);
  card.appendChild(artistDiv);
  card.appendChild(metaDiv);

  randomPickArea.appendChild(card);
}

function getFilteredSongs(prefs) {
  return songs.filter((song) => meetsAllCriteria(song, prefs));
}

// Reacts to the form's submission, gets user preferences, filters songs, and updates recommendations.
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

// Modify all cards to have a badge with their index number
const getRecommendationsBttn = document.querySelector('#get-recs');
getRecommendationsBttn.addEventListener('click', () => {
  setTimeout(() => {
    const allOptions = document.querySelectorAll('#recommendations .song-card');
    console.log(`This page has ${allOptions.length} recommendations`);

    allOptions.forEach((card, index) => {
      card.classList.add('experiment-border');
      const badge = document.createElement('span');
      badge.textContent = `#${index + 1}`;
      badge.className = 'card-badge';
      card.prepend(badge);
    });
  }, 0);
});

// Adding a gif for style
const img = document.createElement('img');
img.src = 'src/images/spinningRecord.gif';
img.alt = 'Spinning record animation';
img.classList.add('banner-image');

const subtitle = document.querySelector('p');
if (subtitle) {
  subtitle.after(img);
}

// Create a link as a footer
let footer = document.querySelector('footer');
if (!footer) {
  footer = document.createElement('footer');
  document.body.appendChild(footer);
}
const link = document.createElement('a');
link.href = 'https://github.com/nedetample';
link.textContent = 'Visit my GitHub';
link.target = '_blank';
footer.appendChild(link);
