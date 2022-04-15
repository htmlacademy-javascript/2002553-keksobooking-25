import {sendData} from './api.js';
import {map, mainPinMarker, showMapResults} from './map.js';
import {maxCapacity, maxCapacityErrorMessage, housingPrices, MAX_PRICE, START_SLIDER, LAT_TOKYO, LNG_TOKYO} from './data.js';

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
const submitButton = advertisementForm.querySelector('.ad-form__submit');
const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');

//валидация количества гостей и комнат
const validateCapacity = (value) => maxCapacity[roomNumberField.value].includes(value);

const getCapacityErrorMessage = () => `${maxCapacityErrorMessage[roomNumberField.value]}`;

pristine.addValidator(
  capacityField,
  validateCapacity,
  getCapacityErrorMessage
);

const onRoomNumberChange = () => {
  pristine.validate(capacityField);
};

roomNumberField.addEventListener('change', onRoomNumberChange);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};


const setUserFormSubmit = (onSuccess, onFail) => {
  advertisementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onFail();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};


//синхронизация заезда и выезда
timeinField.addEventListener('change', (evt) => {
  timeoutField.value = evt.target.value;
});
timeoutField.addEventListener('change', (evt) => {
  timeinField.value = evt.target.value;
});

//плейсхолдер+минимальная цена от типа жилья
const validateMinPrice = (value) => housingPrices[typeField.value] <= value;

const getMinPriceErrorMessage = () => `min price is ${housingPrices[typeField.value]}`;

pristine.addValidator(
  priceField,
  validateMinPrice,
  getMinPriceErrorMessage
);

typeField.addEventListener('change', () => {
  priceField.placeholder = housingPrices[typeField.value];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: housingPrices[typeField.value],
      max: MAX_PRICE
    },
    start: START_SLIDER,
  });
  pristine.validate(priceField);
});

noUiSlider.create(sliderElement, {
  range: {
    min: housingPrices[typeField.value],
    max: MAX_PRICE,
  },
  start: START_SLIDER,
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

//кнопка сбросить
const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', () => {
  document.querySelector('.map__filters').reset();
  sliderElement.noUiSlider.updateOptions({
    start: START_SLIDER,
  });
  map.closePopup();
  mainPinMarker.setLatLng({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  });
  map.setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  }, 10);

  showMapResults();
});


export {setUserFormSubmit, START_SLIDER, sliderElement};
