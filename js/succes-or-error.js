export const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successElement.classList.add('hidden');
    }
  });

  document.addEventListener('click', () => {
    successElement.classList.add('hidden');
  });

  document.body.append(successElement);
};

export const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  const errorButtonlClose = errorElement.querySelector('.error__button');

  errorButtonlClose.addEventListener('click', () => {
    errorElement.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorElement.classList.add('hidden');
    }
  });

  document.addEventListener('click', () => {
    errorElement.classList.add('hidden');
  });

  document.body.append(errorElement);
};

