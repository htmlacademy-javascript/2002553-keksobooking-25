import {createAdvertisements} from './main.js';
import {fillNodeTextContentOrHide} from './util.js';

const mapElement = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const cards = createAdvertisements();

const mapFragment = document.createDocumentFragment();

const PROPERTY_NAMES = {
  'flat' : 'Квартира',
  'bungalow' : 'Бунгало',
  'house' : 'Дом',
  'palace' : 'Дворец',
  'hotel' : 'Отель',
};

const FEATURES_ICONS = {
  'wifi' : 'popup__feature--wifi',
  'dishwasher' : 'popup__feature--dishwasher',
  'parking' : 'popup__feature--parking',
  'washer' : 'popup__feature--washer',
  'elevator' : 'popup__feature--elevator',
  'conditioner' : 'popup__feature--conditioner',
};

cards.forEach(({offer, author}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const popupFeatures = cardElement.querySelector('.popup__features');

  fillNodeTextContentOrHide(cardElement, '.popup__title', offer.title);
  fillNodeTextContentOrHide(cardElement, '.popup__text--address', offer.address);
  fillNodeTextContentOrHide(cardElement, '.popup__text--price', offer.price, `${offer.price} ₽/ночь`);
  fillNodeTextContentOrHide(cardElement, '.popup__type', PROPERTY_NAMES[offer.type]);
  fillNodeTextContentOrHide(cardElement, '.popup__text--capacity', [offer.rooms, offer.guests], `${offer.rooms} комнаты для ${offer.guests} гостей`);
  fillNodeTextContentOrHide(cardElement, '.popup__text--time', [offer.checkin, offer.checkout],`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  fillNodeTextContentOrHide(cardElement, '.popup__description', offer.description);
  // cardElement.querySelector('.popup__text--address').textContent = offer.address;
  // cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  // cardElement.querySelector('.popup__type').textContent = PROPERTY_NAMES[offer.type];
  // cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  // cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  // cardElement.querySelector('.popup__description').textContent = offer.description;


  const featureElements = cardElement.querySelectorAll('.popup__feature');
  for(let i = 0; i < featureElements.length; i++) {
    featureElements[i].classList.add('hidden');
  }

  offer.features.forEach((feature) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add(FEATURES_ICONS[feature]);
    popupFeatures.appendChild(li);
  });

  const photoBlock = cardElement.querySelector('.popup__photos');
  const photoElement = cardElement.querySelector('.popup__photo');

  offer.photos.forEach((photo) => {
    const newPhotoElement = photoElement.cloneNode(true);
    newPhotoElement.setAttribute('src', photo);
    photoBlock.appendChild(newPhotoElement);
  });
  photoElement.classList.add('hidden');

  cardElement.querySelector('.popup__avatar').src = author.avatar;

  mapFragment.appendChild(cardElement);
});

mapElement.appendChild(mapFragment);
