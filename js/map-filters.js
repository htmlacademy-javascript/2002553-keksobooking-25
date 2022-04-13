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

const isMatchFilters = (offer) => {
  const checkType = (type) => {
    if (filters.type && type !== filters.type) {
      return false;
    }

    return true;
  };

  const checkGuests = (guests) => {
    if (filters.guests && guests !== filters.guests) {
      return false;
    }

    return true;
  };

  const checkRooms = (rooms) => {
    if (filters.rooms && rooms !== filters.rooms) {
      return false;
    }

    return true;
  };

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

  if (!checkType(offer.type, filters)
    || !checkGuests(offer.guests, filters)
    || !checkRooms(offer.rooms, filters)
    || !checkFeatures(offer.features, filters)
    || !checkPrice(offer.price, filters)) {
    return false;
  }

  return true;
};

const addTypeFilter = (name, type) => {
  if (name !== 'type') {
    return;
  }

  filters[name] = type;
};

const addFeaturesFilter = (name, feature) => {
  if (name !== 'features') {
    return;
  }

  if (filters.features.some((element) => element === feature)) {
    filters.features = filters.features.filter((filterValue) => filterValue !== feature);
  } else {
    filters.features.push(feature);
  }

};

const addPriceFilter = (name, price) => {
  if (name !== 'price') {
    return;
  }

  const priceFilter = PRICE_VALUES[price];
  filters.price = priceFilter;
};

const addNumberFilter = (name, value) => {
  if (!['guests', 'rooms'].includes(name)) {
    return;
  }

  filters[name] = +value;
};

const initializeFilters = () => {
  const filterForm = document.querySelector('.map__filters-container');

  const onChangeEvent = (evt) => {
    if (evt.target) {
      const { name, value } = evt.target;
      const filterName = MAP_FILTER[name];

      if (value === 'any') {
        delete filters[filterName];
      } else {
        addTypeFilter(filterName, value);
        addFeaturesFilter(filterName, value);
        addNumberFilter(filterName, value);
        addPriceFilter(filterName, value);
      }

      onFilterChange();
    }
  };

  filterForm.addEventListener('change',   debounce(onChangeEvent, 500)
  );
};

export {initializeFilters, isMatchFilters};
