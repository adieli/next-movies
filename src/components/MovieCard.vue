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

    <v-card-title>
      {{ movieName }}
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
      >
        Explore
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'MovieCard',
  data: () => ({
    cardMaxWidth: 344,
    imageHeight: '250px',
    imageWidth: '344px',
  }),
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: String,
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
  },
};
</script>
