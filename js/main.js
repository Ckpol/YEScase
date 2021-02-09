import {checkPopupStatus} from './form.js';
import {commentsClickHandler} from './commentsSlider.js';
import {sliderMoveElement} from './commentsSlider.js';
import {sliderList} from './commentsSlider.js';

const contactButtons = document.querySelectorAll('.contact_button');
const popup = document.querySelector('.popup');
const buttonsArray = Array.from(contactButtons);

let isPopupOpen = false;

buttonsArray.map(function (item) {
  item.addEventListener('click', callBackButtonClickHandler);
  item.addEventListener('keydown', callBackButtonPressHandler);
});

document.addEventListener('keydown', isEscEvent);
sliderMoveElement.addEventListener('mousedown',commentsClickHandler);
sliderList.addEventListener('mousedown', commentsClickHandler);

function callBackButtonClickHandler() {
  changePopupStatus();
  checkPopupStatus();
}

function callBackButtonPressHandler(evt) {
  if (evt.key === 'Enter') {

    if (!isPopupOpen) {
      changePopupStatus();
      checkPopupStatus();
      evt.preventDefault();
    } else {
      evt.preventDefault();
    }
  }
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
