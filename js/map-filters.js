import {onFilterChange} from './map.js';
import {debounce} from './util.js';
import {MAP_FILTER, PRICE_VALUES} from './data.js';

const filters = {
  type: null,
  price: null,
  rooms: null,
  guests: null,
  features: []
};

const isMatchFilters = (offer) => {
  const checkFeatures = (features) => {
    if (filters.features.length && (!features || !features.length)) {
      return false;
    }

    if (filters.features.length) {
      const filteredFeatures = filters.features.filter((feature) => features.includes(feature));

      if (filters.features.length !== filteredFeatures.length) {
        return false;
      }
    }

    return true;
  };

  const checkPrice = (price) => {
    if (filters.price) {
      if (filters.price.min && (price < filters.price.min)
      || filters.price.max && (price > filters.price.max)) {
        return false;
      }
    }

    return true;
  };

  if ((filters.type && offer.type !== filters.type)
    || (filters.guests && offer.guests !== filters.guests)
    || (filters.rooms && offer.rooms !== filters.rooms)
    || !checkFeatures(offer.features, filters)
    || !checkPrice(offer.price, filters)) {
    return false;
  }

  return true;
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
