// Imports
import './css/styles.css';

import {
  activateLoginBtn,
  submitUserData,
  selectRadio,
  displayInfo,
  changeCurrentBookingsView,
  switchBookingView,
  actOnSearchIcon,
  changeFilterValue,
  showNewRooms,
  refreshFilter
} from './domUpdates';

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
const roomSearchContainer = document.querySelector('#roomSearchContainer');
const roomGrid = document.querySelector('.room-grid');
const newBookingsDisplay = document.querySelector('.new-bookings-display');
const filterType = document.querySelector('#filterType');
const filterValues = document.querySelector('#filterValues');
const filterSearchIcon = document.querySelector('#filterSearchIcon');
const filterRefreshIcon = document.querySelector('#filterRefreshIcon');

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
    displayInfo(e.target.closest(".current-booking-card").id)
  }
});
bookingListGrid.addEventListener("keypress", function(e) {
  if (e.target.closest(".current-booking-card") && e.key ==="Enter") {
    displayInfo(e.target.closest(".current-booking-card").id)
  }
});
roomGrid.addEventListener("click", function(e) {
  if (e.target.closest(".room-card")) {
    displayInfo(e.target.closest(".room-card").id)
  }
});
roomGrid.addEventListener("keypress", function(e) {
  if (e.target.closest(".room-card") && e.key === "Enter") {
    displayInfo(e.target.closest(".room-card").id)
  }
});
chooseBookingList.addEventListener("click", function(e) {
  if (e.target.classList.contains("list-button") && e.target.classList.contains("unselected-button")) {
    changeCurrentBookingsView(e.target.id);
  }
});
chooseBookingList.addEventListener("keypress", function(e) {
  if (e.target.classList.contains("list-button") && e.target.classList.contains("unselected-button") && e.key === "Enter") {
    changeCurrentBookingsView(e.target.id);
  }
});
chooseBookingContainer.addEventListener("click", function(e) {
  if (e.target.classList.contains("bookings-button")) {
    switchBookingView(e.target.id)
  }
});
chooseBookingContainer.addEventListener("keypress", function(e) {
  if (e.target.classList.contains("bookings-button") && e.key === "Enter") {
    switchBookingView(e.target.id);
  }
});
roomSearchContainer.addEventListener("click", function(e) {
  actOnSearchIcon(e.target);
});
roomSearchContainer.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    actOnSearchIcon(e.target);
  }
});
filterType.addEventListener("change", changeFilterValue);
filterSearchIcon.addEventListener("click", showNewRooms);
filterSearchIcon.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    showNewRooms();
  }
});
filterRefreshIcon.addEventListener("click", refreshFilter);
filterRefreshIcon.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    refreshFilter();
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
  bookingListGrid,
  roomGrid,
  newBookingsDisplay,
  filterValues,
  filterType
}
