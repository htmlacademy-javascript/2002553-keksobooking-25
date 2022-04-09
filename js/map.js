import {setActiveState, setInactiveState} from './form.js';
import {getCardNode} from './template.js';
import {getData} from './api.js';

const SIMILAR_ADVERTISEMENT_COUNT = 10;

const LAT_TOKYO = 35.67969;
const LNG_TOKYO = 139.76851;

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

getData((advertisements) => {
  const activeAdvertisiments = advertisements.slice(0, SIMILAR_ADVERTISEMENT_COUNT);

  activeAdvertisiments.forEach(({offer, author, location}) => {
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
  });
});
