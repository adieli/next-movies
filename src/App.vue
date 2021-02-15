<template>
  <v-app>
    <movie-dialog v-if="showMovieDialog">
    </movie-dialog>
    <filter-bar></filter-bar>
    <v-main>
      <movies-list/>
    </v-main>
  </v-app>
</template>

<script>
import Vuex from 'vuex';
import moviesList from './components/MoviesList.vue';
import filterBar from './components/FilterBar.vue';

/* eslint-disable global-require */
const movieDialog = (r) => require.ensure([], () => r(require('./components/MovieDialog.vue')), 'movieDialog');
/* eslint-enable global-require */

const { mapGetters } = Vuex;

export default {
  name: 'App',
  components: {
    moviesList,
    movieDialog,
    filterBar,
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      showMovieDialog: 'getShowMovieDialog',
    }),
  },
};
</script>
