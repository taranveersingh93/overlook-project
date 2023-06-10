// Imports
import './css/styles.css';

import {
  activateLoginBtn,
  submitUserData,
  selectRadio,
  displayBookingInfo,
  changeCurrentBookingsView
} from './domUpdates';

import './images/junior-suite.jpg'
import './images/residential-suite.jpg'
import './images/single-room.jpg'
import './images/suite.jpg'
import './images/resort.jpg'
import './images/resort-2.jpg'

// DOM elements
const loginBtn = document.querySelector('.login-button');
const customerLoginRadio = document.querySelector('#customerLogin');
const managerLoginRadio = document.querySelector('#managerLogin');
const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const radioOptions = document.querySelector('.option-container');
const userInputs = document.querySelector('.inputs');
const form = document.querySelector('form');
const radioButtons = document.querySelectorAll('.login-radio');
const loginFeedback = document.querySelector('.login-feedback');
const loginView = document.querySelector('.login-view');
const websiteView = document.querySelector('.website-view');
const bookingListGrid = document.querySelector('.booking-list-grid');
const chooseBookingList = document.querySelector('.choose-booking-list');

// Event listeners
radioOptions.addEventListener("click", activateLoginBtn);
userInputs.addEventListener("keyup", activateLoginBtn);
form.addEventListener("submit", function(e) {
  e.preventDefault();
  submitUserData();
});
radioButtons.forEach(button => {
  button.addEventListener("keydown", function(e) {
    selectRadio(e);
  })
});
bookingListGrid.addEventListener("click", function(e) {
  if (e.target.closest(".current-booking-card")) {
    displayBookingInfo(e.target.closest(".current-booking-card").id)
  }
});
bookingListGrid.addEventListener("keypress", function(e) {
  if (e.target.closest(".current-booking-card") && e.key ==="Enter") {
    displayBookingInfo(e.target.closest(".current-booking-card").id)
  }
});
chooseBookingList.addEventListener("click", function(e) {
  if (e.target.classList.contains("list-button") && e.target.classList.contains("unselected-button")) {
    changeCurrentBookingsView(e.target.id);
  }
})

// Exports
export {
  loginBtn,
  customerLoginRadio,
  managerLoginRadio,
  usernameInput,
  passwordInput,
  loginFeedback,
  loginView,
  websiteView,
  bookingListGrid
}
