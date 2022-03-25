function getRandomIntNumber(min, max) {
  if (min < 0 || max < 0 || max <= min) {
    return null;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloatNumber(min, max, accuracy) {
  if (min < 0 || max < 0 || max <= min) {
    return null;
  }

  const randomNumber = Math.random() * (max - min) + min;

  return parseFloat(randomNumber.toFixed(accuracy));
}

function getRandomValuesFromArrayNoRepeat(source, quantity) {
  const randomValues = [];

  if (source.length < quantity) {
    return null;
  }

  for (let i = 0; i < quantity; i++) {
    const elements = source.splice(getRandomIntNumber(0, source.length - 1), 1);
    randomValues.push(elements[0]);
  }

  return randomValues;
}

function fillNodeTextContentOrHide(element, classname, content = [], template = '') {
  let isValid = true;
  const targetElement = element.querySelector(classname);

  for (let i = 0; i < content.length; i++) {
    if (!content[i]) {
      isValid = false;

      return;
    }
  }

  if (isValid) {
    targetElement.textContent = template ? template : content;
  } else {
    targetElement.classList.add('hidden');
  }

}

export {getRandomIntNumber, getRandomFloatNumber, getRandomValuesFromArrayNoRepeat, fillNodeTextContentOrHide};

