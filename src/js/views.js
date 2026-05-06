export {
  showResults,
  showNoResults,
  showDetail,
  showNarration,
  showLoading,
  showRefusal,
  showStatus,
};

function showStatus(container, message, className = 'status-card') {
  container.classList.remove('hidden');
  container.textContent = '';

  const card = document.createElement('article');
  card.className = className;
  card.textContent = message;
  container.append(card);
}

function showLoading(container, message = 'Loading...') {
  showStatus(container, message, 'status-card status-card--loading');
}

function showNoResults(
  container,
  message = 'No matches found. Try loosening your filters!'
) {
  showStatus(container, message, 'status-card status-card--empty');
}

function showRefusal(container, reason) {
  showStatus(container, reason, 'status-card status-card--refusal');
}

function showResults(items, container) {
  container.classList.remove('hidden');
  container.textContent = '';

  for (const item of items) {
    const card = document.createElement('article');
    card.className = 'song-card';
    card.dataset.trackId = String(item.id);
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open details for ${item.title}`);

    if (item.albumCover) {
      const img = document.createElement('img');
      img.src = item.albumCover;
      img.alt = item.albumTitle
        ? `Album cover for ${item.albumTitle}`
        : `Album cover for ${item.title}`;
      img.className = 'album-cover';
      card.append(img);
    }

    if (item.albumTitle) {
      const albumDiv = document.createElement('div');
      albumDiv.className = 'album-title';
      albumDiv.textContent = item.albumTitle;
      card.append(albumDiv);
    }

    const titleDiv = document.createElement('h3');
    titleDiv.className = 'song-title';
    titleDiv.textContent = item.title;

    const artistDiv = document.createElement('p');
    artistDiv.className = 'song-artist';
    artistDiv.textContent = item.artist;

    const metaDiv = document.createElement('div');
    metaDiv.className = 'song-meta';

    if (typeof item.rank === 'number') {
      const rankSpan = document.createElement('span');
      rankSpan.className = 'song-rank';
      rankSpan.textContent = `Rank ${item.rank}`;
      metaDiv.append(rankSpan);
    }

    if (item.genre) {
      const genreSpan = document.createElement('span');
      genreSpan.textContent = item.genre;
      metaDiv.append(genreSpan);
    }

    if (item.durationSeconds) {
      const durationSpan = document.createElement('span');
      durationSpan.textContent = formatDuration(item.durationSeconds);
      metaDiv.append(durationSpan);
    }

    card.append(titleDiv, artistDiv, metaDiv);

    if (item.preview) {
      const previewWrap = document.createElement('div');
      previewWrap.className = 'song-preview';

      const previewLabel = document.createElement('span');
      previewLabel.className = 'song-preview-label';
      previewLabel.textContent = '30-second preview';

      const audio = document.createElement('audio');
      audio.controls = true;
      audio.preload = 'none';
      audio.src = item.preview;
      audio.setAttribute('aria-label', `Preview for ${item.title}`);

      previewWrap.append(previewLabel, audio);
      card.append(previewWrap);
    }

    container.append(card);
  }
}

function showNarration(container, narration, tracks = []) {
  container.classList.remove('hidden');
  container.textContent = '';

  if (!narration) {
    showStatus(container, 'No narration returned.', 'status-card');
    return;
  }

  if (narration.refused) {
    showRefusal(container, narration.refusal_reason);
    return;
  }

  const card = document.createElement('article');
  card.className = 'narration-card';

  if (narration.playlist_intro) {
    const intro = document.createElement('p');
    intro.className = 'narration-intro';
    intro.textContent = narration.playlist_intro;
    card.append(intro);
  }

  const trackLookup = new Map(tracks.map((track) => [track.id, track]));
  if (Array.isArray(narration.track_notes) && narration.track_notes.length) {
    const list = document.createElement('ol');
    list.className = 'narration-list';

    for (const note of narration.track_notes) {
      const track = trackLookup.get(note.track_id);
      const item = document.createElement('li');
      item.className = 'narration-note';

      const title = document.createElement('h3');
      title.className = 'narration-track-title';
      title.textContent = track ? track.title : `Track ${note.track_id}`;

      const why = document.createElement('p');
      why.className = 'narration-why';
      why.textContent = note.why_this_song;

      item.append(title, why);
      list.append(item);
    }

    card.append(list);
  }

  container.append(card);
}

function showDetail(item, container) {
  container.classList.remove('hidden');
  container.textContent = '';

  const detail = document.createElement('article');
  detail.className = 'song-detail';

  if (item.albumCover) {
    const img = document.createElement('img');
    img.src = item.albumCover;
    img.alt = item.albumTitle
      ? `Album cover for ${item.albumTitle}`
      : `Album cover for ${item.title}`;
    img.className = 'album-cover album-cover--detail';
    detail.append(img);
  }

  if (item.albumTitle) {
    const albumDiv = document.createElement('div');
    albumDiv.className = 'album-title';
    albumDiv.textContent = item.albumTitle;
    detail.append(albumDiv);
  }

  const titleDiv = document.createElement('h2');
  titleDiv.className = 'song-title';
  titleDiv.textContent = item.title;

  const artistDiv = document.createElement('p');
  artistDiv.className = 'song-artist';
  artistDiv.textContent = item.artist;

  const metaDiv = document.createElement('div');
  metaDiv.className = 'song-meta';

  if (typeof item.rank === 'number') {
    const rankSpan = document.createElement('span');
    rankSpan.className = 'song-rank';
    rankSpan.textContent = `Rank ${item.rank}`;
    metaDiv.append(rankSpan);
  }

  if (item.genre) {
    const genreSpan = document.createElement('span');
    genreSpan.textContent = item.genre;
    metaDiv.append(genreSpan);
  }

  if (item.durationSeconds) {
    const durationSpan = document.createElement('span');
    durationSpan.textContent = formatDuration(item.durationSeconds);
    metaDiv.append(durationSpan);
  }

  detail.append(titleDiv, artistDiv, metaDiv);

  if (item.preview) {
    const previewWrap = document.createElement('div');
    previewWrap.className = 'song-preview';

    const previewLabel = document.createElement('span');
    previewLabel.className = 'song-preview-label';
    previewLabel.textContent = 'Listen to the preview';

    const audio = document.createElement('audio');
    audio.controls = true;
    audio.preload = 'none';
    audio.src = item.preview;
    audio.setAttribute('aria-label', `Preview for ${item.title}`);

    previewWrap.append(previewLabel, audio);
    detail.append(previewWrap);
  }

  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.textContent = 'Back';
  backButton.className = 'back-btn';
  detail.append(backButton);

  container.append(detail);
}

function formatDuration(seconds) {
  if (typeof seconds !== 'number' || Number.isNaN(seconds)) {
    return '';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
