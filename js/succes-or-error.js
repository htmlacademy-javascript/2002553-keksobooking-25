const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);

const errorButtonlClose = errorElement.querySelector('.error__button');

const onEscClickSuccess = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    successElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscClickSuccess);
  }
};

const onEscClickFail = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    errorElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscClickFail);
  }
};

const onOuterClickSuccess = () => {
  successElement.classList.add('hidden');
  document.removeEventListener('click', onOuterClickSuccess);
};

const onOuterClickFail = () => {
  errorElement.classList.add('hidden');
  document.removeEventListener('click', onOuterClickFail);
};

const onErrorButtonClick = () => {
  errorElement.classList.add('hidden');
  errorButtonlClose.removeEventListener('click', onErrorButtonClick);
};

export const showSuccessMessage = () => {
  document.addEventListener('keydown', onEscClickSuccess);
  document.addEventListener('click', onOuterClickSuccess);

  document.body.append(successElement);
};

export const showErrorMessage = () => {
  errorButtonlClose.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onEscClickFail);
  document.addEventListener('click', onOuterClickFail);

  document.body.append(errorElement);
};

