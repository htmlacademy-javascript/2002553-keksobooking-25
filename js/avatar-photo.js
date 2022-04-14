const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const photoChooser = document.querySelector('.ad-form__upload input');
const photoPreview = document.querySelector('.ad-form__photo');

const checkIfValid = (element) => {
  const file = element.files[0];
  const fileName = file.name.toLowerCase();
  if (FILE_TYPES.some((it) => fileName.endsWith(it))) {
    return file;
  }

  return null;
};

avatarChooser.addEventListener('change', () => {
  const file = checkIfValid(avatarChooser);

  if (file) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

photoChooser.addEventListener('change', () => {
  const file = checkIfValid(photoChooser);

  if (file) {
    photoPreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }
});
