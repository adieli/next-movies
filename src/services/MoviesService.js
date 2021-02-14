import axios from 'axios';
import { get } from 'lodash';

// In real project I's add also apiResources file and clients for each service
const MOVIES_URL = 'http://localhost:3000/movies';

class MoviesService {
  constructor() {
    this.name = 'MoviesService';
  }

  async getMoviesList() {
    let moviesList;
    try {
      const response = await axios.get(MOVIES_URL);
      moviesList = get(response, 'data');
    } catch (error) {
      moviesList = Promise.reject(error);
      console.log(`${this.name}: Error fetching Movies list: ${error}`);
    }
    return moviesList;
  }

  async getMovie(movieId) {
    let movieDetails;
    try {
      const response = await axios.get(`${MOVIES_URL}/${movieId}`);
      movieDetails = get(response, 'data[0]');
    } catch (error) {
      console.log(`${this.name}: Error fetching Movie details for ${movieId}: ${error}`);
    }
    return movieDetails;
  }
}

const moviesService = new MoviesService();

export default moviesService;
