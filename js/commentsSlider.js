import {
  DELAY,
  ADDITONAL_DELAY,
  COMMETNS_QUANTITY
 } from './util.js';

const slider = document.querySelector('.commets_container');
const sliderMoveElement = slider.querySelector('.slider_element');
const sliderList = slider.querySelector('.comments_list');
const sliderMoveElementProp = getComputedStyle(sliderMoveElement, null);
const elemPropWidth = parseInt(sliderMoveElementProp.width, 10);
const sliderProp = getComputedStyle(slider, null);
const sliderPropWidth = parseInt(sliderProp.width, 10);
const maxCoordX = sliderPropWidth - elemPropWidth;
const minCoordX = 0;

const sliderListPropWidth = sliderPropWidth * (COMMETNS_QUANTITY - 1);
const commentsAndMoveElemLengthDiff = sliderListPropWidth /  maxCoordX;
let timerId = setInterval(changeComment, DELAY);
let currentComment = 1;
let currentCommentPosition = 0;
let sliderMoveElementPosition = 0;

function changeComment() {
  sliderList.classList.add('animated');
  sliderMoveElement.classList.add('animated');
  sliderMoveElementPosition = maxCoordX / (COMMETNS_QUANTITY - 1) * currentComment;
  currentCommentPosition = sliderPropWidth * currentComment;
  sliderList.style.transform = `translateX(${-currentCommentPosition + `px`})`;
  sliderMoveElement.style.transform = `translateX(${sliderMoveElementPosition + `px`})`;
  currentComment++;

  if (currentComment === COMMETNS_QUANTITY) {
    currentComment = 0;
  }
}

function commentsClickHandler(evt) {
  evt.preventDefault();
  clearInterval(timerId);
  sliderList.classList.remove('animated');
  sliderMoveElement.classList.remove('animated');

  let startCoords = {
    x: evt.clientX,
  };

  function commentsMoveHandler(moveEvt) {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.x,
    };

    currentCommentPosition = currentCommentPosition + shift.x;

    if (currentCommentPosition > sliderListPropWidth) {
      currentCommentPosition = sliderListPropWidth;
    } else if (currentCommentPosition < minCoordX) {
      currentCommentPosition = minCoordX;
    }

    sliderMoveElementPosition = sliderMoveElementPosition + shift.x  / commentsAndMoveElemLengthDiff;

    if (sliderMoveElementPosition > maxCoordX) {
      sliderMoveElementPosition = maxCoordX;
    } else if (sliderMoveElementPosition < minCoordX) {
      sliderMoveElementPosition = minCoordX;
    }

    sliderMoveElement.style.transform = `translateX(${sliderMoveElementPosition + `px`})`;
    sliderList.style.transform = `translateX(${-currentCommentPosition + `px`})`;
  }

  function commentsMouseUpHandler(upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', commentsMoveHandler);
    document.removeEventListener('mouseup', commentsMouseUpHandler);
    timerId = setInterval(changeComment, ADDITONAL_DELAY);
  }

  document.addEventListener('mousemove', commentsMoveHandler);
  document.addEventListener('mouseup', commentsMouseUpHandler);
}

export {commentsClickHandler, sliderMoveElement, sliderList};
