import './advertisement-form.js';
import './template.js';
import './map.js';
import './api.js';
import './succes-or-error.js';
import './avatar-photo.js';
import {showSuccessMessage, showErrorMessage} from './succes-or-error.js';
import {setUserFormSubmit, sliderElement} from './advertisement-form.js';
import {map, mainPinMarker} from './map.js';
import {LAT_TOKYO, LNG_TOKYO, START_SLIDER} from './data.js';

setUserFormSubmit(() => {
  document.querySelector('.ad-form').reset();
  showSuccessMessage();
  map.closePopup();
  map.setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  }, 10);
  mainPinMarker.setLatLng({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  });
  sliderElement.noUiSlider.updateOptions({
    start: START_SLIDER,
  });
}, () => {
  showErrorMessage();
}
);


