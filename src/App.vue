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
import movieDialog from './components/MovieDialog.vue';
import filterBar from './components/FilterBar.vue';

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
