import {
  submitCustomerData,
  submitManagerData
} from './apiCalls';

import {
  loginBtn,
  customerLoginRadio,
  managerLoginRadio,
  usernameInput,
  passwordInput
} from './scripts'

const activateLoginBtn = () => {
  const userTypeSelected = customerLoginRadio.checked || managerLoginRadio.checked;
  const userInputEntered = usernameInput.value && passwordInput.value;
  if (userTypeSelected && userInputEntered) {
    loginBtn.disabled = false;
    loginBtn.classList.add('active-login');
  } else {
    loginBtn.disabled = true;
    loginBtn.classList.remove('active-login');
  } 
}

const submitUserData = () => {
  if (customerLoginRadio.checked) {
    submitCustomerData()
  } else {
    submitManagerData()
  }
}

export {
  activateLoginBtn,
  submitUserData
}