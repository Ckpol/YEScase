'use strict';

const MIN_PHONE_LENGTH = 11;
const MAX_PHONE_LENGTH = 12;
const PHONE_REGEXP = /[^\d | +]/;
const contactButtons = document.querySelectorAll('.contact_button');
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup_form');
const closePopupElem = popupForm.querySelector('.popup_form__close');
const popupFormPhone = popupForm.querySelector('.popup_form__phone');
let isPopupOpen = false;

const buttonsArray = Array.from(contactButtons);

document.addEventListener('keydown', isEscEvent);

buttonsArray.map(function (item) {
  item.addEventListener('click', callBackButtonClickHandler);
  item.addEventListener('keydown', callBackButtonPressHandler);
});


function isEscEvent(evt) {
  if (evt.key === 'Escape' && isPopupOpen) {
    changePopupStatus();
    checkPopupStatus();
  }
}

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

function changePopupStatus() {
  popup.classList.toggle('hidden');
  isPopupOpen = !isPopupOpen;
  console.log(isPopupOpen)
}

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

// функция отправки формы
function someFu(evt) {
  evt.preventDefault();
  changePopupStatus();
  checkPopupStatus();
  console.log('OK')
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
    // функция отправки формы
    popupForm.addEventListener('submit', someFu);
    popupFormPhone.addEventListener('focus', phoneFocusHandler);
    popupFormPhone.addEventListener('blur', phoneBlurHandler);
    popupFormPhone.addEventListener('input', phoneValidityHandler);

  } else {
    popupFormPhone.value = '';
    popupFormPhone.placeholder = "+7 ( _ _ _ ) _ _ _ - _  _ - _ _";
    closePopupElem.removeEventListener('click', popupCloseHandler);
    closePopupElem.removeEventListener('keydown', popupCloseHandler);
    popup.removeEventListener('click', popupBackgroundClickHandler);
    // функция отправки формы
    popupForm.removeEventListener('submit', someFu);
    popupFormPhone.removeEventListener('focus', phoneFocusHandler);
    popupFormPhone.removeEventListener('blur', phoneBlurHandler);
    popupFormPhone.removeEventListener('input', phoneValidityHandler);
  }
}
