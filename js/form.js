
//Активное состояние
// eslint-disable-next-line no-unused-vars
const toActiveState = () => {
  const disabledForms = document.querySelectorAll('.ad-form--disabled');
  const disabledFields = document.querySelectorAll(':disabled');

  disabledForms.forEach((element) => {
    element.classList.remove('ad-form--disabled');
  });

  disabledFields.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

//Неактивное состояние
const formElement = document.querySelector('.ad-form');
formElement.classList.add('ad-form--disabled');

const fieldElements = document.querySelectorAll('.ad-form__element');
fieldElements.forEach((element) => {
  element.setAttribute('disabled', 'disabled');
});

const headerElement = document.querySelector('.ad-form-header');
headerElement.setAttribute('disabled', 'disabled');

const mapFiltersElement = document.querySelector('.map__filters');
mapFiltersElement.classList.add('ad-form--disabled');

const filterElements = document.querySelectorAll('.map__filter');
filterElements.forEach((element) => {
  element.setAttribute('disabled', 'disabled');
});

const featuresElements = document.querySelectorAll('.map__features');
featuresElements.forEach((element) => {
  element.setAttribute('disabled', 'disabled');
});
