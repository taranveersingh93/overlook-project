import {
  usernameInput,
  passwordInput,
} from './scripts'

let customerUsername;
let customerPassword;
let managerPassword;
let managerUsername;

const submitCustomerData = () => {
  customerUsername = usernameInput.value;
  customerPassword = passwordInput.value;
}

const submitManagerData = () => {
  managerUsername = usernameInput.value;
  managerPassword = passwordInput.value;
}

export {
  submitCustomerData,
  submitManagerData
}
