const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);

const errorButtonlClose = errorElement.querySelector('.error__button');

function onEscClickSuccess (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    successElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscClickSuccess);
    document.removeEventListener('click', onOuterClickSuccess);
  }
}

function onEscClickFail (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    errorElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscClickFail);
    document.removeEventListener('click', onOuterClickFail);
  }
}

function onOuterClickSuccess () {
  successElement.classList.add('hidden');
  document.removeEventListener('click', onOuterClickSuccess);
  document.removeEventListener('keydown', onEscClickSuccess);
}

function onOuterClickFail () {
  errorElement.classList.add('hidden');
  document.removeEventListener('click', onOuterClickFail);
  document.removeEventListener('keydown', onEscClickFail);
}

const onErrorButtonClick = () => {
  errorElement.classList.add('hidden');
  errorButtonlClose.removeEventListener('click', onErrorButtonClick);
};

export const showSuccessMessage = () => {
  successElement.classList.remove('hidden');
  document.addEventListener('keydown', onEscClickSuccess);
  document.addEventListener('click', onOuterClickSuccess);

  document.body.append(successElement);
};

export const showErrorMessage = () => {
  errorElement.classList.remove('hidden');
  errorButtonlClose.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onEscClickFail);
  document.addEventListener('click', onOuterClickFail);

  document.body.append(errorElement);
};

