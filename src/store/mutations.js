import { STATE_KEYS } from './state';

const setMovies = (state, movies) => {
  state[STATE_KEYS.MOVIES] = movies;
};
const setMovieDetails = (state, movieDetails) => {
  state[STATE_KEYS.MOVIE_DETAILS][movieDetails.id] = movieDetails;
};

const mutations = {
  setMovies,
  setMovieDetails,
};

export default mutations;
