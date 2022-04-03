const searchForm = document.querySelector('.ad-form');
const pristine = new Pristine(searchForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

const capacityField = searchForm.querySelector('#capacity');
const roomNumberField = searchForm.querySelector('#room_number');

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

searchForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    searchForm.submit();
  } else {
    // eslint-disable-next-line no-console
    console.log('Форма невалидна');
  }
});

//синхронизация заезда и выезда
searchForm.querySelector('#timein').addEventListener('change', (evt) => {
  searchForm.querySelector('#timeout').value = evt.target.value;
});
searchForm.querySelector('#timeout').addEventListener('change', (evt) => {
  searchForm.querySelector('#timein').value = evt.target.value;
});

//плейсхолдер+минимальная цена от типа жилья
const typeField = searchForm.querySelector('#type');
const priceField = searchForm.querySelector('#price');

const typesHousing = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function validateMinPrice (value) {
  return typesHousing[typeField.value] <= value;
}

function getMinPriceErrorMessage () {
  return `min price is ${typesHousing[typeField.value]}`;
}

pristine.addValidator(
  priceField,
  validateMinPrice,
  getMinPriceErrorMessage
);

typeField.addEventListener('change', () => {
  priceField.placeholder = typesHousing[typeField.value];
  pristine.validate(priceField);
});

