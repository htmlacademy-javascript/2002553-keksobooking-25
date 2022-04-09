import './advertisement-form.js';
import './template.js';
import './advertisement.js';
import './map.js';
import './api.js';
import './succes-or-error.js';
import {showSuccessMessage, showErrorMessage} from './succes-or-error.js';
import {setUserFormSubmit} from './advertisement-form.js';

setUserFormSubmit(() => {
  document.querySelector('.ad-form').reset();
  showSuccessMessage();

  const bindPopupClose = document.querySelector('.leaflet-popup');
  bindPopupClose.classList.add('hidden');
}, () => {
  showErrorMessage();
}
);


