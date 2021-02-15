import { get } from 'lodash';
import convertStringDurationToMinutes from '../common/utils';

const transformMovieObject = (movieObject) => {
  const {
    id, title, image, synopsis, rating, released, runtime, largeimage,
  } = movieObject;
  const transformedMovie = {
    id,
    title,
    image,
    synopsis,
    rating,
    // Current handling for NAN is 0
    numericRating: parseFloat(rating) || 0,
    released: parseInt(released, 10),
    runtime,
    // Current handling for NAN is 0
    numericRuntime: convertStringDurationToMinutes(runtime) || 0,
    largeimage,
  };
  return transformedMovie;
};

const transformMovies = (response) => {
  const moviesArray = get(response, 'data', []);
  const transformedMovies = [];
  moviesArray.forEach((movieObj) => transformedMovies.push(transformMovieObject(movieObj)));
  return transformedMovies;
};

const transformMovie = (response) => {
  const transformedMoviesArray = transformMovies(response);
  return transformedMoviesArray.length > 0 ? transformedMoviesArray[0] : {};
};

export {
  transformMovies,
  transformMovie,
};
