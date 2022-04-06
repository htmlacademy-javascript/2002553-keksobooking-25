import {FEATURES, PHOTOS, TYPES, TIMES, IMAGE_NUMBERS, LATITUDE_FROM, LATITUDE_UNTIL, PRICE_MAX, LONGITUDE_FROM, LONGITUDE_UNTIL, ROOMS_MAX_COUNT, GUESTS_MAX_COUNT} from './data.js';
import {getRandomIntNumber, getRandomFloatNumber, getRandomValuesFromArrayNoRepeat} from './util.js';

const createAdvertisement = () => {
  const location = {
    lat: getRandomFloatNumber(LATITUDE_FROM, LATITUDE_UNTIL, 5),
    lng: getRandomFloatNumber(LONGITUDE_FROM, LONGITUDE_UNTIL, 5),
  };

  return {
    author: {
      avatar:
        `img/avatars/user${getRandomValuesFromArrayNoRepeat(IMAGE_NUMBERS, 1)[0]}.png`,
    },
    offer: {
      title: 'title',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomIntNumber(1, PRICE_MAX),
      type: TYPES[getRandomIntNumber(0, TYPES.length - 1)],
      rooms: getRandomIntNumber(1, ROOMS_MAX_COUNT),
      guests: getRandomIntNumber(1, GUESTS_MAX_COUNT),
      checkin: TIMES[getRandomIntNumber(0, TIMES.length - 1)],
      checkout: TIMES[getRandomIntNumber(0, TIMES.length - 1)],
      features: getRandomValuesFromArrayNoRepeat(FEATURES.slice(), getRandomIntNumber(1, FEATURES.length - 1)),
      description: 'description',
      photos: getRandomValuesFromArrayNoRepeat(PHOTOS.slice(), getRandomIntNumber(1, PHOTOS.length - 1)),
      location,
    },
  };
};

const createAdvertisements = () => Array.from({ length: 10 }, createAdvertisement);

export {createAdvertisements};
