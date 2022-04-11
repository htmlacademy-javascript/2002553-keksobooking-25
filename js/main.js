import './advertisement-form.js';
import './template.js';
import './map.js';
import './api.js';
import './succes-or-error.js';
import {showSuccessMessage, showErrorMessage} from './succes-or-error.js';
import {setUserFormSubmit, START_SLIDER, sliderElement} from './advertisement-form.js';
import {map, LAT_TOKYO, LNG_TOKYO} from './map.js';

setUserFormSubmit(() => {
  document.querySelector('.ad-form').reset();
  showSuccessMessage();
  map.closePopup();
  map.setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  }, 10);
  sliderElement.noUiSlider.updateOptions({
    start: START_SLIDER,
  });
}, () => {
  showErrorMessage();
}
);


