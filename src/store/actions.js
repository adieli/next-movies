import { orderBy } from 'lodash';
import MoviesService from '../services/MoviesService';
import { FILTER_TYPES, FILTER_TYPES_MAP } from '../common/consts';
import convertStringDurationToMinutes from '../common/utils';

const fetchMovies = async ({ commit }) => {
  const moviesList = await MoviesService.getMoviesList();
  if (moviesList && moviesList.length > 0) {
    // Order the list descending by release year
    const orderedMovies = orderBy(moviesList, [(movie) => parseInt(movie.released, 10)], 'desc');
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
        (movie) => parseFloat(movie[FILTER_TYPES_MAP[FILTER_TYPES.RATING]])
        >= parseFloat(filterValue),
      );
      break;
    case FILTER_TYPES.DURATION: {
      // Movies which duration is shorter than the one filtered for
      const numericFilterValue = convertStringDurationToMinutes(filterValue);
      filteredMovies = moviesList.filter(
        (movie) => convertStringDurationToMinutes(movie[FILTER_TYPES_MAP[FILTER_TYPES.DURATION]])
        <= numericFilterValue,
      );
      break;
    }
    case FILTER_TYPES.YEAR: {
      // Movies which publish year is later than the one filtered for
      const numericFilterValue = parseInt(filterValue, 10);
      filteredMovies = moviesList.filter(
        (movie) => parseInt(movie[FILTER_TYPES_MAP[FILTER_TYPES.YEAR]], 10) >= numericFilterValue,
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
