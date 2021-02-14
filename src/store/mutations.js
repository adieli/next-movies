import Vue from 'vue';
import { STATE_KEYS } from './state';

const setMovies = (state, movies) => {
  state[STATE_KEYS.MOVIES] = movies;
};
const setFilteredMovies = (state, filteredMovies) => {
  state[STATE_KEYS.FILTERED_MOVIES] = filteredMovies;
};
const setMovieDetails = (state, movieDetails) => {
  Vue.set(state[STATE_KEYS.MOVIE_DETAILS], movieDetails.id, movieDetails);
};
const setShowMovieDialog = (state, showMovieDialog) => {
  state[STATE_KEYS.SHOW_MOVIE_DIALOG] = showMovieDialog;
};
const setSelectedMovieId = (state, movieId) => {
  state[STATE_KEYS.SELECTED_MOVIE_ID] = movieId;
};

const mutations = {
  setMovies,
  setMovieDetails,
  setShowMovieDialog,
  setSelectedMovieId,
  setFilteredMovies,
};

export default mutations;
