// Imports
import './css/styles.css';

import {
  activateLoginBtn,
  submitUserData,
  selectRadio,
  displayBookingInfo,
  changeCurrentBookingsView,
  switchBookingView
} from './domUpdates';

import {
  openCalendar
} from './datePicker'

import './images/junior-suite.jpg'
import './images/residential-suite.jpg'
import './images/single-room.jpg'
import './images/suite.jpg'
import './images/resort.jpg'
import './images/resort-2.jpg'
import './images/resort-3.jpg'
import './images/calendar.png'
import './images/refresh.png'
import './images/search.png'
import './images/cross.png'

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
const chooseBookingContainer = document.querySelector('.choose-booking');
const calendarIcon = document.querySelector('#calendarIcon');


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
chooseBookingList.addEventListener("keypress", function(e) {
  if (e.target.classList.contains("list-button") && e.target.classList.contains("unselected-button") && e.key === "Enter") {
    changeCurrentBookingsView(e.target.id);
  }
})
chooseBookingContainer.addEventListener("click", function(e) {
  if (e.target.classList.contains("bookings-button")) {
    switchBookingView(e.target.id)
  }
})
chooseBookingContainer.addEventListener("keypress", function(e) {
  if (e.target.classList.contains("bookings-button") && e.key === "Enter") {
    switchBookingView(e.target.id);
  }
})
calendarIcon.addEventListener("click", openCalendar);

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
  bookingListGrid,
}
