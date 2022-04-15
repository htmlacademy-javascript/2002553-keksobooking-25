import {onFilterChange} from './map.js';
import {debounce, isNumber} from './util.js';
import {MAP_FILTER, PRICE_VALUES} from './data.js';

const filters = {
  type: null,
  price: null,
  rooms: null,
  guests: null,
  features: []
};

const isMatchFilters = (offer) => {
  const isFeaturesValidForFilter =
  offer.features &&
  filters.features.filter((feature) => offer.features.includes(feature))
    .length === filters.features.length;

  const isPriceValidForFilter =
  filters.price &&
  ((!filters.price.min || offer.price > filters.price.min) &&
    (!filters.price.max || offer.price < filters.price.max));

  return (
    (!filters.type || offer.type === filters.type) &&
    ((!filters.guests && !isNumber(filters.guests))  || offer.guests === filters.guests) &&
    ((!filters.rooms && !isNumber(filters.rooms)) || offer.rooms === filters.rooms) &&
    (!filters.features.length || isFeaturesValidForFilter) &&
    (!filters.price || isPriceValidForFilter)
  );
};

const addFeaturesFilter = (feature) => {
  if (filters.features.some((element) => element === feature)) {
    filters.features = filters.features.filter((filterValue) => filterValue !== feature);
  } else {
    filters.features.push(feature);
  }
};

const initializeFilters = () => {
  const filterForm = document.querySelector('.map__filters-container');

  const onChangeEvent = (evt) => {
    if (evt.target) {
      const { name, value } = evt.target;
      const filterName = MAP_FILTER[name];

      if (value === 'any') {
        filters[filterName] = null;
      } else {
        switch (filterName) {
          case 'type':
            filters.type = value;
            break;

          case 'guests':
            filters.guests = +value;
            break;

          case 'rooms':
            filters.rooms = +value;
            break;

          case 'price':
            filters.price = PRICE_VALUES[value];
            break;

          case 'features':
            addFeaturesFilter(value);
            break;

          default:
            break;
        }
      }

      onFilterChange();
    }
  };

  filterForm.addEventListener('change',   debounce(onChangeEvent, 500)
  );
};

export {initializeFilters, isMatchFilters};
