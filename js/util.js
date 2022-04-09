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
  const targetElement = element.querySelector(classname);

  for (let i = 0; i < content.length; i++) {
    if (!content[i]) {
      targetElement.classList.add('hidden');
      return;
    }
    targetElement.textContent = template ? template : content;
  }

}

const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert, getRandomIntNumber, getRandomFloatNumber, getRandomValuesFromArrayNoRepeat, fillNodeTextContentOrHide};

