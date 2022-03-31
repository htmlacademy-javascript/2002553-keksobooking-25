
//Активное состояние
// eslint-disable-next-line no-unused-vars
const setActiveState = () => {
  const formElement = document.querySelector('.ad-form');
  formElement.classList.remove('ad-form--disabled');

  const fieldElements = document.querySelectorAll('.ad-form__element');
  fieldElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  const headerElement = document.querySelector('.ad-form-header');
  headerElement.removeAttribute('disabled');

  const mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.classList.remove('ad-form--disabled');

  const filterElements = document.querySelectorAll('.map__filter');
  filterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  const featuresElements = document.querySelectorAll('.map__features');
  featuresElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

//Неактивное состояние
// eslint-disable-next-line no-unused-vars
const setInactiveState = () => {
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
};

