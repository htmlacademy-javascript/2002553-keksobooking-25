// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntNumber(min, max) {
  if (min < 0 || max < 0 || max <= min) {
    return null;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntNumber(67, 132);

function getRandomFloatNumber(min, max, accuracy) {
  if (min < 0 || max < 0 || max <= min) {
    return null;
  }

  const randomNumber = Math.random() * (max - min) + min;

  return parseFloat(randomNumber.toFixed(accuracy));
}

getRandomFloatNumber(87, 398, 6);
