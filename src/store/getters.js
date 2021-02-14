import { STATE_KEYS } from './state';

const getMovies = (state) => state[STATE_KEYS.MOVIES];
const getFilteredMovies = (state) => state[STATE_KEYS.FILTERED_MOVIES];
const getFilteredMoviesForDisplay = (state) => (state[STATE_KEYS.FILTERED_MOVIES].length > 0
  ? state[STATE_KEYS.FILTERED_MOVIES] : getMovies(state));
const getMovieDetails = (state) => state[STATE_KEYS.MOVIE_DETAILS];
const getShowMovieDialog = (state) => state[STATE_KEYS.SHOW_MOVIE_DIALOG];
const getSelectedMovieId = (state) => state[STATE_KEYS.SELECTED_MOVIE_ID];

const getters = {
  getMovies,
  getFilteredMovies,
  getMovieDetails,
  getShowMovieDialog,
  getSelectedMovieId,
  getFilteredMoviesForDisplay,
};

export default getters;
