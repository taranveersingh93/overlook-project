// Imports
import './css/styles.css';
import './images/turing-logo.png'

// DOM elements
const loginBtn = document.querySelector('.login-button');
const customerLoginRadio = document.querySelector('#customerLogin');
const managerLoginRadio = document.querySelector('#managerLogin');
const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');

// Event listeners

// Exports
export {
  loginBtn,
  customerLoginRadio,
  managerLoginRadio,
  usernameInput,
  passwordInput
}