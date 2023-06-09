// Imports
import './css/styles.css';

import {
  activateLoginBtn,
  submitUserData,
  selectRadio
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
})

// Exports
export {
  loginBtn,
  customerLoginRadio,
  managerLoginRadio,
  usernameInput,
  passwordInput,
  loginFeedback
}
