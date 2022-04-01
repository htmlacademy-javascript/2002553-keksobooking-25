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
