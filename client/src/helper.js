const searchParams = new URLSearchParams(window.location.search);
export const accessToken = searchParams.get("access_token");

export const genres = [
  "acoustic",
  "alternative",
  "ambient",
  "blues",
  "dance",
  "electronic",
  "folk",
  "funk",
  "hip-hop",
  "house",
  "metal",
  "party",
  "pop",
  "punk",
  "reggae",
  "rock",
  "sleep",
  "soul",
  "study",
  "techno",
];

const headers = {
  Authorization: "Bearer " + accessToken,
  Accept: "application/json",
  "Content-Type": "application.json",
};

export const fetchTopArtists = async () => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
    { headers }
  );
  return await response.json();
};

export const fetchTopTracks = async () => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
    { headers }
  );
  return await response.json();
};

export const fetchRecommendations = async (type, id) => {
  // type can be "tracks", "artists" or "genres"
  const response = await fetch(
    `https://api.spotify.com/v1/recommendations?limit=100&seed_${type}=${id}&min_energy=0.4&min_popularity=50`,
    { headers }
  );
  return await response.json();
};

export const getTrackPreview = async (id) => {
  if (accessToken) {
    const response = await fetch("https://api.spotify.com/v1/tracks/" + id, {
      headers,
    });
    const json = await response.json();
    return await json.preview_url;
  }
};

export const likeTrack = (id) => {
  console.log("You added a song to your Liked Songs, of id: " + id);
  fetch("https://api.spotify.com/v1/me/tracks?ids=" + id, {
    method: "PUT",
    headers,
  });
};

// capitalising that pesky second "h" in Hip-Hop
export const convertGenreToProperNoun = (genre) => {
  return genre === "hip-hop"
    ? "Hip-Hop"
    : genre.charAt(0).toUpperCase() + genre.slice(1);
};
