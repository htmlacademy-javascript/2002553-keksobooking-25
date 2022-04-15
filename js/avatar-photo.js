import {FILE_TYPES} from './data.js';

const avatarChooser = document.querySelector('.ad-form__field input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const photoChooser = document.querySelector('.ad-form__upload input');
const photoPreview = document.querySelector('.ad-form__photo');

const isValid = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];

  if (isValid(file)) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];

  if (isValid(file)) {
    photoPreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }
});
