const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

const onChange = (element, target, isBackground) => {
  const file = element.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    if (isBackground) {
      target.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      target.style.backgroundRepeat = 'no-repeat';
      target.style.backgroundSize = 'contain';
    } else {
      target.src = URL.createObjectURL(file);
    }
  }
};

avatarChooser.addEventListener('change', () => onChange(avatarChooser, avatarPreview));
photoChooser.addEventListener('change', () => onChange(photoChooser, photoPreview, true));
