import {isPopupOpen} from './main.js';
import {changePopupStatus} from './main.js';
import {sendData} from './upload.js';
import {myUrl} from './upload.js';
import {MIN_PHONE_LENGTH, MAX_PHONE_LENGTH, PHONE_REGEXP} from './util.js';

const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup_form');
const closePopupElem = popupForm.querySelector('.popup_form__close');
const popupFormPhone = popupForm.querySelector('.popup_form__phone');

function popupCloseHandler(evt) {
  if(evt.key === 'Enter' || evt.type === 'click') {
    changePopupStatus();
    checkPopupStatus();
  }
}

function popupBackgroundClickHandler(evt) {
  const target = evt.target;
  if (target.classList.contains('popup')) {
    changePopupStatus();
    checkPopupStatus();
  }
}

function formSubmitHandler(evt) {
  sendData(myUrl, new FormData(popupForm))
  .then(() => {
    popupForm.reset();
  })
  .catch((err) => {
    console.log(err);
  });

  evt.preventDefault();
  changePopupStatus();
  checkPopupStatus();
}

function phoneFocusHandler(evt) {
  evt.target.style.boxShadow = "0px 10px 18px 0px rgba(168, 9, 33, 0.55)";
  evt.target.placeholder = "";
}

function phoneBlurHandler(evt) {
  evt.target.style.boxShadow = "";
  evt.target.placeholder = "+7 ( _ _ _ ) _ _ _ - _  _ - _ _";
}

function phoneValidityHandler() {
  const valueLength = popupFormPhone.value.length;
  if (popupFormPhone.value.match(PHONE_REGEXP)) {
    popupFormPhone.setCustomValidity(`Только +7 ( _ _ _ ) _ _ _ -  _ _ - _ _`);
  } else if(valueLength < MIN_PHONE_LENGTH) {
    popupFormPhone.setCustomValidity(`Ещё ${MIN_PHONE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_PHONE_LENGTH) {
    popupFormPhone.setCustomValidity(`Удалите лишнее ${valueLength - MAX_PHONE_LENGTH} симв.`)
  } else {
    popupFormPhone.setCustomValidity('');
  }
}

function checkPopupStatus() {
  if (isPopupOpen) {
    closePopupElem.addEventListener('click', popupCloseHandler);
    closePopupElem.addEventListener('keydown', popupCloseHandler);
    popup.addEventListener('click', popupBackgroundClickHandler);
    popupForm.addEventListener('submit', formSubmitHandler);
    popupFormPhone.addEventListener('focus', phoneFocusHandler);
    popupFormPhone.addEventListener('blur', phoneBlurHandler);
    popupFormPhone.addEventListener('input', phoneValidityHandler);
  } else {
    popupFormPhone.value = '';
    popupFormPhone.placeholder = "+7 ( _ _ _ ) _ _ _ - _  _ - _ _";
    closePopupElem.removeEventListener('click', popupCloseHandler);
    closePopupElem.removeEventListener('keydown', popupCloseHandler);
    popup.removeEventListener('click', popupBackgroundClickHandler);
    popupForm.removeEventListener('submit', formSubmitHandler);
    popupFormPhone.removeEventListener('focus', phoneFocusHandler);
    popupFormPhone.removeEventListener('blur', phoneBlurHandler);
    popupFormPhone.removeEventListener('input', phoneValidityHandler);
  }
}

export {checkPopupStatus};
