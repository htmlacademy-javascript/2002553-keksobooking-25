// import {createAdvertisements} from './advertisement.js';
import {fillNodeTextContentOrHide} from './util.js';
import {PROPERTY_NAMES, FEATURES_ICONS} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
// const cards = createAdvertisements();

const getCardNode = (offer, author) => {
  const cardElement = cardTemplate.cloneNode(true);
  const popupFeatures = cardElement.querySelector('.popup__features');

  fillNodeTextContentOrHide(cardElement, '.popup__title', [offer.title]);
  fillNodeTextContentOrHide(cardElement, '.popup__text--address', [offer.address]);
  fillNodeTextContentOrHide(cardElement, '.popup__text--price', [offer.price], `${offer.price} ₽/ночь`);
  fillNodeTextContentOrHide(cardElement, '.popup__type', [PROPERTY_NAMES[offer.type]]);
  fillNodeTextContentOrHide(cardElement, '.popup__text--capacity', [offer.rooms, offer.guests], `${offer.rooms} комнаты для ${offer.guests} гостей`);
  fillNodeTextContentOrHide(cardElement, '.popup__text--time', [offer.checkin, offer.checkout],`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  fillNodeTextContentOrHide(cardElement, '.popup__description', [offer.description]);
  fillNodeTextContentOrHide(cardElement, '.popup__avatar', [author.avatar]);

  const featureElements = cardElement.querySelectorAll('.popup__feature');
  for(let i = 0; i < featureElements.length; i++) {
    featureElements[i].classList.add('hidden');
  }

  if (offer.features) {
    offer.features.forEach((feature) => {
      const li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add(FEATURES_ICONS[feature]);
      popupFeatures.appendChild(li);
    });
  }

  const photoBlock = cardElement.querySelector('.popup__photos');
  const photoElement = cardElement.querySelector('.popup__photo');

  offer.photos.forEach((photo) => {
    const newPhotoElement = photoElement.cloneNode(true);
    newPhotoElement.setAttribute('src', photo);
    photoBlock.appendChild(newPhotoElement);
  });
  photoElement.classList.add('hidden');

  return cardElement;
};

export {getCardNode};
