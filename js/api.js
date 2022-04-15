import {MESSAGE_ON_FAIL} from './data.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((advertisements) => {
      onSuccess(advertisements);
    })
    .catch(() => {
      const errorRequest = document.querySelector('.error-request');
      errorRequest.classList.remove('visually-hidden');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(MESSAGE_ON_FAIL);
      }
    })
    .catch(() => {
      onFail(MESSAGE_ON_FAIL);
    });
};

export {getData, sendData};

