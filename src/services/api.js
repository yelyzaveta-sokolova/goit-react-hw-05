import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmQ3OTc2Y2EzMTMxOWNlN2U5YjlhNmJjZGQ2ZWU2YSIsIm5iZiI6MTczMDM4MzM1NC4yOTUwNzE4LCJzdWIiOiI2NzIzOGJkZjFkZjcwZjc5MjBmZWY5NzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kVfPv9nD2angwh-MF0RSrLASOX5MU8xO5XepstauNoQ`;

const fetchData = async (url, params = {}) => {
  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getTrendingMovies = async () => {
  const data = await fetchData("trending/movie/day");
  return data.results;
};

const getMoviesBySearchQuery = async (query) => {
  const data = await fetchData("search/movie", { query });
  return data.results;
};

const getMovieDetailsById = async (movieId) => {
  const data = await fetchData(`movie/${movieId}`);
  return data;
};

const getMovieCastById = async (movieId) => {
  const data = await fetchData(`movie/${movieId}/credits`);
  return data.cast;
};

const getMovieReviewsById = async (movieId) => {
  const data = await fetchData(`movie/${movieId}/reviews`);
  return data.results;
};

export {
  getTrendingMovies,
  getMoviesBySearchQuery,
  getMovieDetailsById,
  getMovieCastById,
  getMovieReviewsById,
};