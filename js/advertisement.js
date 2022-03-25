import {FEATURES, PHOTOS, TYPES, TIMES, IMAGE_NUMBERS} from './data.js';
import {getRandomIntNumber, getRandomFloatNumber, getRandomValuesFromArrayNoRepeat} from './util.js';

const createAdvertisement = () => {
  const location = {
    lat: getRandomFloatNumber(35.65, 35.7, 5),
    lng: getRandomFloatNumber(139.7, 139.8, 5),
  };

  return {
    author: {
      avatar:
        `img/avatars/user${getRandomValuesFromArrayNoRepeat(IMAGE_NUMBERS, 1)[0]}.png`,
    },
    offer: {
      title: 'title',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomIntNumber(1, 10000000),
      type: TYPES[getRandomIntNumber(0, TYPES.length - 1)],
      rooms: getRandomIntNumber(1, 10),
      guests: getRandomIntNumber(1, 30),
      checkin: TIMES[getRandomIntNumber(0, TIMES.length - 1)],
      checkout: TIMES[getRandomIntNumber(0, TIMES.length - 1)],
      features: getRandomValuesFromArrayNoRepeat(FEATURES.slice(), getRandomIntNumber(1, FEATURES.length - 1)),
      description: 'description',
      photos: getRandomValuesFromArrayNoRepeat(PHOTOS.slice(), getRandomIntNumber(1, PHOTOS.length - 1)),
      location,
    },
  };
};

const createAdvertisements = () => Array.from({ length: 1 }, createAdvertisement);

export {createAdvertisements};
