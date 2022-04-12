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
  const filterNames = Object.keys(filters);
  const filteredAdvertisements = [];

  for (let i = 0; i < allAdvertisements.length; i++) {
    let currentAdvertisement = allAdvertisements[i];

    for (let j = 0; j < filterNames.length; j++) {
      if (!currentAdvertisement) {
        break;
      }
      const currentFilterName = filterNames[j];
      const filterValue = filters[currentFilterName];
      const offerValue = currentAdvertisement.offer[currentFilterName];

      if (currentFilterName === 'features') {
        for (let m = 0; m < filterValue.length; m++) {
          if (!offerValue || !offerValue.includes(filterValue[m])) {
            currentAdvertisement = null;
          }
        }
      } else if (currentFilterName === 'price') {
        if (filterValue.min && (offerValue < filterValue.min)
          || filterValue.max && (offerValue > filterValue.max)) {
          currentAdvertisement = null;
        }
      } else {
        if (offerValue !== filterValue) {
          currentAdvertisement = null;
        }
      }
    }

    if (currentAdvertisement) {
      filteredAdvertisements.push(currentAdvertisement);
    }
  }

  showMapResults(filteredAdvertisements.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
};

export {map, LAT_TOKYO, LNG_TOKYO, mainPinMarker, onFilterChange, showMapResults};
