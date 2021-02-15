<template>
  <v-card
    class="mx-auto"
    outlined
    tile
    :max-width="cardMaxWidth"
  >
    <v-img
      :src="imageUrl"
      :max-height="imageHeight"
      :max-width="imageWidth"
      :contain="true"
      position="center"
    ></v-img>

    <v-card-title v-html="movieName">
    </v-card-title>

    <v-card-subtitle>
      Year: {{ releaseYear }}
    </v-card-subtitle>

    <v-card-text>
      Duration: {{ duration }}
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        @click="onCardButtonClick()"
      >
        Explore
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import Vuex from 'vuex';

const { mapActions } = Vuex;

export default {
  name: 'MovieCard',
  data: () => ({
    cardMaxWidth: 344,
    imageHeight: '250px',
    imageWidth: '344px',
    displayMovieDialog: false,
  }),
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    movieName: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      setDisplayMovieDetails: 'setDisplayMovieDetails',
    }),
    onCardButtonClick() {
      this.setDisplayMovieDetails(this.movieId);
    },
  },
};
</script>
