import { filterBookingsByUser } from './bookings';
import {
  username,
  showGenericLoginError,
  showLoginError,
} from './domUpdates'
import {
  addPicture
} from './rooms'

let currentUser;
let userBookings;
let allRooms;
let allBookings;

const convertFetchToJSON = url => {
  return fetch(url).then(response => response.json());
}

const getAllBookings = () => {
  return convertFetchToJSON(`http://localhost:3001/api/v1/bookings`)
    .then(data => data.bookings); 
}

const setUserData = (user) => {
  currentUser = user;
  getRooms();
  return getAllBookings()
    .then(bookings => {
      allBookings = bookings;
      userBookings = filterBookingsByUser(allBookings, currentUser);      
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

const getRooms = () => {
  convertFetchToJSON('http://localhost:3001/api/v1/rooms')
    .then(response => {
      if (!response.message) {
        const roomsInfo = response.rooms;
        allRooms = roomsInfo.map(room => addPicture(room));
      }
    })
}

export {
  getUser,
  userBookings,
  currentUser
}

