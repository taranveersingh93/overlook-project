import {
  getUser
} from './apiCalls';

import {
  loginBtn,
  customerLoginRadio,
  managerLoginRadio,
  usernameInput,
  passwordInput,
  loginFeedback
} from './scripts'

let username;
let password;

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

const showGenericLoginError = () => {
  loginFeedback.innerText = "Something went wrong";
  loginFeedback.classList.remove('invisible');
}

const showLoginError = () => {
  loginFeedback.innerText = "Incorrect credentials"
  loginFeedback.classList.remove('invisible');
}

const hideLoginError = () => {
  loginFeedback.classList.add('invisible');
}

const submitUserData = () => {
  const userInput = usernameInput.value;
  password = passwordInput.value;
  const ID = Number(userInput.slice(8))
  const IDcheck = ID > 0 && ID < 51 && userInput.startsWith("customer");
  const passwordCheck = password === "overlook2021";
  if (passwordCheck && IDcheck) {
    hideLoginError();
    username = usernameInput.value;
    getUser();
  } else {
    showLoginError();
  }
}

const selectRadio = (e) => {
  if (e.key === "Enter") {
    document.getElementById(e.target.id).checked = !document.getElementById(e.target.id).checked;
  }
}

export {
  activateLoginBtn,
  username,
  password,
  selectRadio,
  submitUserData,
  showGenericLoginError,
  showLoginError,
}
