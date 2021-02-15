<template>
  <v-app-bar
    app
    color="primary"
    dark
    :height="barHeight"
  >
    <div class="d-flex align-center filter-bar">
      <span class="filter-header-label"> Filter options: </span>
      <v-autocomplete
        class="filter-type"
        :items="filterTypes"
        :filter="applyFilterType"
        color="white"
        item-text="name"
        clearable
        label="Filter By"
        @change="onFilterTypeSelected"
        @click:clear="onFilterTypeClear"
      ></v-autocomplete>

      <v-autocomplete
        class="filter-value"
        :items="filterValues"
        :filter="applyFilterValue"
        color="white"
        item-text="name"
        :disabled="!filterByType"
        clearable
        label="Filter value"
        @change="onFilterValueSelected"
        @click:clear="onFilterValueClear"
      ></v-autocomplete>

      <v-btn
        class="filter-button"
        color="orange lighten-3"
        text
        :disabled="!filterByType || !filterByValue"
        @click="onFilterButtonClick"
      >
        Filter
      </v-btn>

      <v-btn
        class="reset-button"
        color="orange lighten-3"
        text
        :disabled="filteredMoviesList.length === 0"
        @click="onResetButtonClick"
      >
        Reset
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import Vuex from 'vuex';
import { orderBy } from 'lodash';
import { FILTER_TYPES, FILTER_TYPES_MAP } from '../common/consts';

const { mapActions, mapGetters } = Vuex;

export default {
  name: 'FilterBar',
  data() {
    return {
      barHeight: '70px',
      filterTypes: [
        { name: FILTER_TYPES.YEAR, id: FILTER_TYPES_MAP[FILTER_TYPES.YEAR] },
        { name: FILTER_TYPES.DURATION, id: FILTER_TYPES_MAP[FILTER_TYPES.DURATION] },
        { name: FILTER_TYPES.RATING, id: FILTER_TYPES_MAP[FILTER_TYPES.RATING] },
        { name: FILTER_TYPES.NAME, id: FILTER_TYPES_MAP[FILTER_TYPES.NAME] }],
      filterValues: [],
      filterByValue: '',
      filterByType: '',
    };
  },
  computed: {
    ...mapGetters({
      moviesList: 'getMovies',
      filteredMoviesList: 'getFilteredMovies',
    }),
  },
  methods: {
    ...mapActions({
      setFilteredMovies: 'setFilteredMovies',
      resetFilteredMovies: 'resetFilteredMovies',
    }),
    applyFilterType(item, queryText) {
      const itemName = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();
      return itemName.indexOf(searchText) > -1;
    },
    applyFilterValue(item, queryText) {
      const isNumericType = this.filterByType !== FILTER_TYPES.NAME;
      const itemName = isNumericType ? item : item.toLowerCase();
      const searchText = isNumericType ? queryText : queryText.toLowerCase();
      return itemName.indexOf(searchText) > -1;
    },
    onFilterTypeSelected(selectedValue) {
      // The if handles a case of reset
      if (selectedValue) {
        // Locate the id of the filter
        const filterId = this.filterTypes.find(({ name }) => name === selectedValue).id;
        this.filterValues = this.moviesList.map((movie) => movie[filterId]);
        this.filterValues = orderBy(this.filterValues, [FILTER_TYPES_MAP[this.filterByType]], 'desc');
        this.filterByType = selectedValue;
      }
    },
    onFilterTypeClear() {
      this.filterByType = '';
      this.onFilterValueClear();
    },
    onFilterValueSelected(selectedValue) {
      this.filterByValue = selectedValue;
    },
    onFilterValueClear() {
      this.filterByValue = '';
    },
    onFilterButtonClick() {
      this.setFilteredMovies({ filterType: this.filterByType, filterValue: this.filterByValue });
    },
    onResetButtonClick() {
      this.resetFilteredMovies();
    },
  },
};
</script>

<style lang="scss" scoped>
  .filter-bar {
    margin-top: 20px;
    .filter-type, .filter-value {
      margin-left: 20px;
      margin-top: 20px;
    }
    .filter-button, .reset-button {
      margin-left: 20px;
    }
    .filter-header-label {
      margin-bottom: 5px;
    }
  }
</style>
