const STATE_KEYS = {
  MOVIES: 'movies',
  MOVIE_DETAILS: 'movieDetails',
  SHOW_MOVIE_DIALOG: 'showMovieDialog',
  SELECTED_MOVIE_ID: 'selectedMovieId',
  FILTERED_MOVIES: 'filteredMovies',
};

const state = {
  [STATE_KEYS.MOVIES]: [],
  [STATE_KEYS.FILTERED_MOVIES]: [],
  [STATE_KEYS.MOVIE_DETAILS]: {},
  [STATE_KEYS.SHOW_MOVIE_DIALOG]: false,
  [STATE_KEYS.SELECTED_MOVIE_ID]: null,
};

export {
  state,
  STATE_KEYS,
};
