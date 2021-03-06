const FILTER_TYPES = {
  YEAR: 'Year',
  DURATION: 'Duration',
  RATING: 'Rating',
  NAME: 'Name',
};

// A map of filter name to their api value
const FILTER_TYPES_MAP = {
  [FILTER_TYPES.YEAR]: 'released',
  [FILTER_TYPES.DURATION]: 'numericRuntime',
  [FILTER_TYPES.RATING]: 'numericRating',
  [FILTER_TYPES.NAME]: 'title',
};

export {
  FILTER_TYPES,
  FILTER_TYPES_MAP,
};
