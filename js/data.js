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

const maxCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const maxCapacityErrorMessage = {
  '1': 'for 1 guest',
  '2': 'for 1-2 guests',
  '3': 'for 1-3 guests',
  '100': 'not for guests'
};

const housingPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const MAX_PRICE = 100000;
const START_SLIDER = 0;
const MESSAGE_ON_FAIL = 'Не удалось отправить форму. Попробуйте ещё раз';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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

const SIMILAR_ADVERTISEMENT_COUNT = 10;
const LAT_TOKYO = 35.67969;
const LNG_TOKYO = 139.76851;

export {
  PROPERTY_NAMES,
  FEATURES_ICONS,
  MESSAGE_ON_FAIL,
  FILE_TYPES,
  MAP_FILTER,
  PRICE_VALUES,
  LNG_TOKYO,
  LAT_TOKYO,
  SIMILAR_ADVERTISEMENT_COUNT,
  maxCapacity,
  maxCapacityErrorMessage,
  housingPrices,
  MAX_PRICE,
  START_SLIDER
};


