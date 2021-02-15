<template>
    <v-dialog
      v-model="showMovieDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="onBackButtonClick"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title v-html="movieTitle"></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="onBackButtonClick"
            >
              Back
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-img
          class="mx-auto movie-image"
          :src="movieImageUrl"
          :max-height="imageHeight"
          :max-width="imageWidth"
          :contain="true"
          position="center"
        ></v-img>
        <v-list
          three-line
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle class="movie-attribute" v-html="movieSummary">
              </v-list-item-subtitle>
              <v-list-item-subtitle class="movie-attribute" v-if="movieRating">
                {{ movieRating }}
              </v-list-item-subtitle >
              <v-list-item-subtitle class="movie-attribute">
                {{ releaseYear }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="movie-attribute">
                {{ duration }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

    </v-dialog>
</template>

<script>
import Vuex from 'vuex';
import { get } from 'lodash';

const { mapActions, mapGetters } = Vuex;

export default {
  name: 'MovieDialog',
  data() {
    return {
      imageHeight: '450px',
      imageWidth: '600px',
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  computed: {
    ...mapGetters({
      getMovieDetails: 'getMovieDetails',
      movieId: 'getSelectedMovieId',
      showMovieDialog: 'getShowMovieDialog',
    }),
    movieDetails() {
      return this.getMovieDetails[this.movieId];
    },
    movieTitle() {
      return get(this.movieDetails, 'title');
    },
    movieImageUrl() {
      return get(this.movieDetails, 'largeimage');
    },
    movieSummary() {
      return get(this.movieDetails, 'synopsis');
    },
    movieRating() {
      const rating = get(this.movieDetails, 'rating');
      return rating ? `Rating: ${rating}` : '';
    },
    releaseYear() {
      const year = get(this.movieDetails, 'released');
      return `Release year: ${year}`;
    },
    duration() {
      const movieDuration = get(this.movieDetails, 'runtime');
      return `Duration: ${movieDuration}`;
    },
  },
  watch: {
    movieId: {
      async handler(newValue, previousValue) {
        if (newValue && newValue !== previousValue) {
          if (!this.getMovieDetails[newValue]) {
            await this.fetchMovie(newValue);
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      fetchMovieDetails: 'fetchMovieDetails',
      resetDisplayMovieDetails: 'resetDisplayMovieDetails',
    }),
    onBackButtonClick() {
      this.resetDisplayMovieDetails();
    },
    fetchMovie() {
      this.fetchMovieDetails(this.movieId);
    },
  },
};
</script>

<style lang="scss" scoped>
  .movie-image {
    margin-top: 15px;
  }
  .movie-attribute {
    line-height: inherit;
  }
</style>
