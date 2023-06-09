import { filterBookingsByUser } from './bookings';
import {
  username,
  showGenericLoginError,
  showLoginError,
  showDashboard
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

const setUserBookings = () => {
  getAllBookings()
    .then(bookings => {
      userBookings = filterBookingsByUser(bookings, currentUser);
    })
}

const getUser = () => {
  const queryID = username.slice(8);
  convertFetchToJSON(`http://localhost:3001/api/v1/customers/${queryID}`)
    .then(data => {
      if (!data.message) {
        currentUser = data;
        setUserBookings();
        showDashboard(currentUser);
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

