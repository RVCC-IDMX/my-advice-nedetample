/**
 * Serverless API proxy — starter function
 *
 * This function works right now. Run `netlify dev` and visit:
 *   http://localhost:8888/.netlify/functions/api
 *
 * You will see JSON data in the browser — three dog breeds from the
 * Dog API (the same API you used in hap-fetch). The data is hardcoded
 * so you can see the full serverless function lifecycle without needing
 * an external API yet.
 *
 * Your job in Part 1: Replace the hardcoded data below with a real
 * fetch call to your project's API. See docs/tutorials/your-first-serverless-function.md
 * for a walkthrough.
 */

export default async () => {
  // Static Deezer genre ID to name map
  const genreMap = {
    132: 'Pop',
    116: 'Rap/Hip Hop',
    152: 'Rock',
    113: 'Dance',
    165: 'R&B',
    85: 'Alternative',
    106: 'Electro',
    466: 'Folk',
    144: 'Reggae',
    129: 'Jazz',
    98: 'Classical',
    173: 'Films/Games',
    464: 'Metal',
    169: 'Soul & Funk',
    153: 'Blues',
    65: 'Country',
    95: 'Kids',
    197: 'Latino',
  };
  try {
    // Use a default query or get from query params (for now, use 'eminem' as example)
    const query = 'eminem';
    const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Deezer API request failed' }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    const json = await response.json();
    // Transform Deezer tracks to match the shape your views expect
    const mapped = Array.isArray(json.data)
      ? json.data.map((track) => {
          // Try to get genre_id from track or album
          let genreId = null;
          if (track.genre_id) {
            genreId = track.genre_id;
          } else if (track.album && track.album.genre_id) {
            genreId = track.album.genre_id;
          }
          const genreName =
            genreId && genreMap[genreId]
              ? genreMap[genreId]
              : track.genre_id || (track.album && track.album.genre_id) || '';
          return {
            title: track.title || '',
            artist: track.artist && track.artist.name ? track.artist.name : '',
            activity: '', // No activity from Deezer, left blank for now
            rank: typeof track.rank === 'number' ? track.rank : null,
            genre: genreName,
            durationSeconds: !isNaN(Number(track.duration))
              ? Number(track.duration)
              : null,
            albumCover:
              (track.album &&
                (track.album.cover_medium ||
                  track.album.cover_big ||
                  track.album.cover)) ||
              '',
            albumTitle:
              track.album && track.album.title ? track.album.title : '',
          };
        })
      : [];
    return new Response(JSON.stringify(mapped), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
