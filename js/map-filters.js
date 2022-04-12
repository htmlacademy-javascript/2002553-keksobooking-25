import {onFilterChange} from './map.js';
import {debounce} from './util.js';

const MAP_FILTER = {
  'housing-type': 'type',
  'housing-price': 'price',
  'housing-rooms': 'rooms',
  'housing-guests': 'guests',
  'features': 'features'
};

const PRICE_VALUES = {
  'low': {
    max: 10000
  },
  'middle': {
    min: 10000,
    max: 50000
  },
  'high': {
    min: 50000
  }
};

const filters = {
  features: []
};

export const initializeFilters = () => {
  const filterForm = document.querySelector('.map__filters-container');

  const onChangeEvent = (evt) => {
    if (evt.target) {
      const { name, value } = evt.target;

      if (value === 'any') {
        delete filters[MAP_FILTER[name]];
      } else {
        if (name === 'features') {
          if (filters.features.some((element) => element === value)) {
            filters.features = filters.features.filter((filterValue) => filterValue !== value);
          } else {
            filters.features.push(value);
          }
        } else {
          if (['guests', 'rooms'].includes(MAP_FILTER[name])) {
            filters[MAP_FILTER[name]] = +value;
          } else if (MAP_FILTER[name] === 'price') {
            const priceFilter = PRICE_VALUES[value];
            filters[MAP_FILTER[name]] = priceFilter;
          } else {
            filters[MAP_FILTER[name]] = value;
          }
        }
      }

      onFilterChange(filters);
    }
  };

  filterForm.addEventListener('change',   debounce(onChangeEvent, 500)
  );
};
