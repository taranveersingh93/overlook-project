import { checkIfUpcoming, filterBookingsByUser } from './bookings';
import {
  username,
  showGenericLoginError,
  showLoginError,
} from './domUpdates'

let currentUser;
let userBookings;

const convertFetchToJSON = url => {
  return fetch(url).then(response => response.json());
}

const getAllBookings = () => {
  return convertFetchToJSON(`http://localhost:3001/api/v1/bookings`)
    .then(data => data.bookings);    
}

const setUserData = (user) => {
  currentUser = user;
  return getAllBookings()
    .then(bookings => {
      userBookings = filterBookingsByUser(bookings, currentUser);
    })
}

const prepareDashboard = user => {
  setUserData(user)
    .then(() => {
      goToDashboard();
    })
}

const getUser = () => {
  const queryID = username.slice(8);
  convertFetchToJSON(`http://localhost:3001/api/v1/customers/${queryID}`)
    .then(user => {
      if (!user.message) {
        prepareDashboard(user)
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
  getUser,
  userBookings,
  currentUser
}

