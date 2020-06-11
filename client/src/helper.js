const searchParams = new URLSearchParams(window.location.search);
export const accessToken = searchParams.get("access_token");

const headers = {
  Authorization: "Bearer " + accessToken,
  "Content-Type": "application.json",
};

export const fetchTopArtists = async () => {
  let response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
    { headers }
  );
  return await response.json();
};

export const fetchTopTracks = async () => {
  let response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
    { headers }
  );
  return await response.json();
};

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
