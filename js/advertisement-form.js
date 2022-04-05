const advertisementForm = document.querySelector('.ad-form');
const pristine = new Pristine(advertisementForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

const capacityField = advertisementForm.querySelector('#capacity');
const roomNumberField = advertisementForm.querySelector('#room_number');
const timeinField = advertisementForm.querySelector('#timein');
const timeoutField = advertisementForm.querySelector('#timeout');
const typeField = advertisementForm.querySelector('#type');
const priceField = advertisementForm.querySelector('#price');

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

//валидация количества гостей и комнат
function validateCapacity (value) {
  return maxCapacity[roomNumberField.value].includes(value);
}

function getCapacityErrorMessage () {
  return `${maxCapacityErrorMessage[roomNumberField.value]}`;
}

pristine.addValidator(
  capacityField,
  validateCapacity,
  getCapacityErrorMessage
);

function onRoomNumberChange () {
  pristine.validate(capacityField);
}

roomNumberField.addEventListener('change', onRoomNumberChange);

advertisementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    advertisementForm.submit();
  }
});

//синхронизация заезда и выезда
timeinField.addEventListener('change', (evt) => {
  timeoutField.value = evt.target.value;
});
timeoutField.addEventListener('change', (evt) => {
  timeinField.value = evt.target.value;
});

//плейсхолдер+минимальная цена от типа жилья
function validateMinPrice (value) {
  return housingPrices[typeField.value] <= value;
}

function getMinPriceErrorMessage () {
  return `min price is ${housingPrices[typeField.value]}`;
}

pristine.addValidator(
  priceField,
  validateMinPrice,
  getMinPriceErrorMessage
);

typeField.addEventListener('change', () => {
  priceField.placeholder = housingPrices[typeField.value];
  pristine.validate(priceField);
});

//слайдер для цены
const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');

valueElement.value = 5000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

