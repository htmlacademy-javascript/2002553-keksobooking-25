import {setActiveState, unblockFilters, setInactiveState} from './form.js';
import {getCardNode} from './template.js';
import {getData} from './api.js';
import {initializeFilters} from './map-filters.js';

const SIMILAR_ADVERTISEMENT_COUNT = 10;

const LAT_TOKYO = 35.67969;
const LNG_TOKYO = 139.76851;

const mapMarkers = [];

let allAdvertisements = [];

setInactiveState();

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })
  .setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

const addressField = document.querySelector('.ad-form').querySelector('#address');

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressField.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

const simplePinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const removeSecondaryPins = () => {
  for (let i = 0; i < mapMarkers.length; i++) {
    map.removeLayer(mapMarkers[i]);
  }
};

const showMapResults = (advertisements) => {
  const selectedAdvertisements = advertisements || allAdvertisements.slice(0, SIMILAR_ADVERTISEMENT_COUNT);

  removeSecondaryPins();

  selectedAdvertisements.forEach(({offer, author, location}) => {
    const {lat, lng} = location;
    const cardNode = getCardNode(offer, author);

    const marker = L.marker({
      lat,
      lng
    },
    {
      icon: simplePinIcon
    });

    marker
      .addTo(map)
      .bindPopup(cardNode);

    marker.on('click', (evt) => {
      const coordinates = evt.target.getLatLng();
      addressField.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
    });

    mapMarkers.push(marker);
  });
};

getData((advertisements) => {
  allAdvertisements = advertisements;

  unblockFilters();
  initializeFilters();
  showMapResults();
});

const onFilterChange = (filters) => {
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

  const filteredAdvertisements = allAdvertisements.filter(({ offer }) => {
    if (!checkType(offer.type)
      || !checkGuests(offer.guests)
      || !checkRooms(offer.rooms)
      || !checkFeatures(offer.features)
      || !checkPrice(offer.price)) {
      return false;
    }

    return true;
  });

  showMapResults(filteredAdvertisements.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
};

export {map, LAT_TOKYO, LNG_TOKYO, mainPinMarker, onFilterChange, showMapResults};
