// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntNumber(min, max) {
  if (min < 0 || max < 0 || max <= min) {
    return 0;
  }

  return Math.floor(Math.random() * (max - min)) + min;
}

getRandomIntNumber(67, 132);

function getRandomNumber(min, max, accuracy) {
  if (min < 0 || max < 0 || max <= min) {
    return 0;
  }

  const randomNumber = Math.random() * (max - min) + min;

  return randomNumber.toFixed(accuracy);
}

getRandomNumber(87, 398, 6);
