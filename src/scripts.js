// Imports
import './css/styles.css';
import {
  activateLoginBtn,
  submitUserData 
} from './domUpdates';

// DOM elements
const loginBtn = document.querySelector('.login-button');
const customerLoginRadio = document.querySelector('#customerLogin');
const managerLoginRadio = document.querySelector('#managerLogin');
const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const radioOptions = document.querySelector('.option-container');
const userInputs = document.querySelector('.inputs');

// Event listeners
radioOptions.addEventListener("click", activateLoginBtn);
userInputs.addEventListener("keyup", activateLoginBtn);
loginBtn.addEventListener("submit", submitUserData)
// Exports
export {
  loginBtn,
  customerLoginRadio,
  managerLoginRadio,
  usernameInput,
  passwordInput,
}