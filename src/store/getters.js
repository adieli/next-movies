import { STATE_KEYS } from './state';

const getMovies = (state) => state[STATE_KEYS.MOVIES];
const getMovieDetails = (state) => (movieId) => state[STATE_KEYS.MOVIE_DETAILS][movieId];

const getters = {
  getMovies,
  getMovieDetails,
};

export default getters;
