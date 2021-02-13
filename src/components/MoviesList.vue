<template>
  <v-container ref="listContainer" class="grey lighten-5">
    <v-row>
      <v-col
        v-for="movie in paginatedMoviesList"
        :key="movie.id"
        cols="12"
        sm="4"
      >
        <div class="movies-list">
          <movie-card :releaseYear="movie.released"
                      :movieName="movie.title"
                      :duration="movie.runtime"
                      :imageUrl="movie.image"></movie-card>
        </div>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-pagination v-model="pageNumber" :length="this.pagesNumber" @input="onNextPageClick"/>
  </v-container>
</template>

<script>
import Vuex from 'vuex';
import movieCard from './MovieCard.vue';

const { mapActions, mapGetters } = Vuex;

export default {
  name: 'MovieList',
  components: {
    movieCard,
  },
  data: () => ({
    pageNumber: 1,
    moviesPerPage: 12,
  }),
  computed: {
    ...mapGetters({
      moviesList: 'getMovies',
      movieDetails: 'getMovieDetails',
    }),
    pagesNumber() {
      // We divide the total amount of movies returned from server by amount of movies per page
      return Math.ceil(this.moviesList.length / this.moviesPerPage);
    },
    paginatedMoviesList() {
      const start = (this.pageNumber * this.moviesPerPage) - this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.moviesList.slice(start, end);
    },
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    ...mapActions({
      fetchMovies: 'fetchMovies',
    }),
    onNextPageClick(clickedPageNumber) {
      this.pageNumber = clickedPageNumber;
      this.scrollToListTop();
    },
    // After switching pages, scroll to top of the list
    scrollToListTop() {
      this.$refs.listContainer.scrollTop = 0;
    },
  },
};
</script>
