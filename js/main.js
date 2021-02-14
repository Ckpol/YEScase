import {checkPopupStatus} from './form.js';
import {commentsClickHandler} from './commentsSlider.js';
import {sliderMoveElement} from './commentsSlider.js';
import {sliderList} from './commentsSlider.js';

const popup = document.querySelector('.popup');
let isPopupOpen = false;

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('contact_button')) {
    callBackButtonClickHandler(evt);
  }
});

document.addEventListener('keydown', (evt) => {
  isEscEvent(evt);
  if (evt.target.classList.contains('contact_button')) {
    callBackButtonPressHandler(evt);
  }
});

sliderMoveElement.addEventListener('mousedown', commentsClickHandler);
sliderList.addEventListener('mousedown', commentsClickHandler);

function callBackButtonClickHandler() {
  changePopupStatus();
  checkPopupStatus();
}

function callBackButtonPressHandler(evt) {
  if (evt.key !== 'Enter') {
    return;
  }

  if (!isPopupOpen) {
    changePopupStatus();
    checkPopupStatus();
  }
  evt.preventDefault();
}

function changePopupStatus() {
  popup.classList.toggle('hidden');
  isPopupOpen = !isPopupOpen;
}

function isEscEvent(evt) {
  if (evt.key === 'Escape' && isPopupOpen) {
    changePopupStatus();
    checkPopupStatus();
  }
}

export {isPopupOpen, changePopupStatus};
