import { orderBy } from 'lodash';
import MoviesService from '../services/MoviesService';

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

const actions = {
  fetchMovies,
  fetchMovieDetails,
};

export default actions;
