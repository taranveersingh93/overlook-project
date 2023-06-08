import {
  username,
  showGenericLoginError,
  showLoginError
} from './domUpdates'

let currentUser;

const getUser = () => {
  const queryID = username.slice(8);
  fetch(`http://localhost:3001/api/v1/customers/${queryID}`)
    .then(response => response.json())
    .then(data => {
      if (!data.message) {
        currentUser = data
        console.log(currentUser)
      } else {
        console.log(data.message)
        showLoginError();
      }
    })
    .catch(err => {
      showGenericLoginError()
      console.error(err)
    })
}

export {
  getUser
}

