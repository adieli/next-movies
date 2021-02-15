import { orderBy } from 'lodash';
import MoviesService from '../services/MoviesService';
import { FILTER_TYPES, FILTER_TYPES_MAP } from '../common/consts';

const fetchMovies = async ({ commit }) => {
  const moviesList = await MoviesService.getMoviesList();
  if (moviesList && moviesList.length > 0) {
    // Order the list descending by release year
    const orderedMovies = orderBy(moviesList, ['released'], 'desc');
    commit('setMovies', orderedMovies);
  }
};
const fetchMovieDetails = async ({ commit }, movieId) => {
  const movieDetails = await MoviesService.getMovie(movieId);
  if (movieDetails) {
    commit('setMovieDetails', movieDetails);
  }
};
const setDisplayMovieDetails = async ({ commit }, movieId) => {
  commit('setSelectedMovieId', movieId);
  commit('setShowMovieDialog', true);
};
const resetDisplayMovieDetails = async ({ commit }) => {
  commit('setSelectedMovieId', null);
  commit('setShowMovieDialog', false);
};
const setFilteredMovies = async ({ commit, getters }, { filterType, filterValue }) => {
  let filteredMovies = [];
  const moviesList = getters.getMovies;
  // If I had more time, I'd implement filtering logic in a more clear way in the UI
  switch (filterType) {
    case FILTER_TYPES.NAME:
      filteredMovies = moviesList.filter((movie) => movie[FILTER_TYPES_MAP[FILTER_TYPES.NAME]]
        === filterValue);
      break;
    case FILTER_TYPES.RATING:
      // Movies which rating is higher than the one filtered for
      filteredMovies = moviesList.filter(
        (movie) => movie[FILTER_TYPES_MAP[FILTER_TYPES.RATING]]
        >= filterValue,
      );
      break;
    case FILTER_TYPES.DURATION: {
      // Movies which duration is shorter than the one filtered for
      filteredMovies = moviesList.filter(
        (movie) => movie[FILTER_TYPES_MAP[FILTER_TYPES.DURATION]] <= filterValue,
      );
      break;
    }
    case FILTER_TYPES.YEAR: {
      // Movies which publish year is later than the one filtered for
      filteredMovies = moviesList.filter(
        (movie) => movie[FILTER_TYPES_MAP[FILTER_TYPES.YEAR]] >= filterValue,
      );
      break;
    }
    default:
      break;
  }
  commit('setFilteredMovies', filteredMovies);
};
const resetFilteredMovies = async ({ commit }) => {
  commit('setFilteredMovies', []);
};

const actions = {
  fetchMovies,
  fetchMovieDetails,
  setDisplayMovieDetails,
  resetDisplayMovieDetails,
  setFilteredMovies,
  resetFilteredMovies,
};

export default actions;
