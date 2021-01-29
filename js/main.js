import {checkPopupStatus} from './form.js';

const contactButtons = document.querySelectorAll('.contact_button');
const popup = document.querySelector('.popup');
const buttonsArray = Array.from(contactButtons);
let isPopupOpen = false;

buttonsArray.map(function (item) {
  item.addEventListener('click', callBackButtonClickHandler);
  item.addEventListener('keydown', callBackButtonPressHandler);
});

document.addEventListener('keydown', isEscEvent);

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
      console.log('Отмена')
      evt.preventDefault();
    }
  }
}

function changePopupStatus() {//
  popup.classList.toggle('hidden');
  isPopupOpen = !isPopupOpen;
  console.log(isPopupOpen)
}

function isEscEvent(evt) {
  if (evt.key === 'Escape' && isPopupOpen) {
    changePopupStatus();
    checkPopupStatus();
  }
}

export {isPopupOpen, changePopupStatus};
