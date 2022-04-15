const fillNodeTextContentOrHide = (element, classname, content = [], template = '') => {
  const targetElement = element.querySelector(classname);

  for (let i = 0; i < content.length; i++) {
    if (!content[i]) {
      targetElement.classList.add('hidden');
      return;
    }
    targetElement.textContent = template ? template : content;
  }
};

const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
};

export {fillNodeTextContentOrHide, debounce};

