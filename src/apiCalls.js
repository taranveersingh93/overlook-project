import { filterBookingsByUser } from './bookings';
import {
  username,
  showGenericLoginError,
  showLoginError,
  showDashboard,
  setDisplaySuccessMessage,
  showNewRooms
} from './domUpdates'
import {
  addPicture
} from './rooms'
import {
  makeBody
} from './helperFunctions'

const pageData = {
  currentView: "loginView"
};

const convertFetchToJSON = url => {
  return fetch(url).then(response => response.json());
}

const getAllBookings = () => {
  return convertFetchToJSON(`http://localhost:3001/api/v1/bookings`)
    .then(data => data.bookings); 
}

const setUserData = (user) => {
  pageData.currentUser = user;
  return getAllBookings()
    .then(bookings => {
      pageData.allBookings = bookings;
      pageData.userBookings = filterBookingsByUser(pageData.allBookings, pageData.currentUser);      
      pageData.bookingsOfInterest = [...pageData.userBookings];
    })
}

const prepareDashboard = user => {
  getRooms()
    .then(() => {
      setUserData(user)
        .then(() => {
          showDashboard(pageData);
        })
    })
}

const getUser = () => {
  const queryID = username.slice(8);
  convertFetchToJSON(`http://localhost:3001/api/v1/customers/${queryID}`)
    .then(user => {
      if (!user.message) {
        pageData.currentView = "myBookingsView"
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
  return convertFetchToJSON('http://localhost:3001/api/v1/rooms')
    .then(response => {
      if (!response.message) {
        const roomsInfo = response.rooms;
        pageData.allRooms = roomsInfo.map(room => addPicture(room));
      }
    })
}

const refreshBookings = (date, roomNumber) => {
  setUserData(pageData.currentUser)
    .then(() => {
      showNewRooms()
      setDisplaySuccessMessage(date, roomNumber);
    })
}

const postBooking = (userID, date, roomNumber) => {
  const body = makeBody(userID, date, roomNumber);
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.message) {
        refreshBookings(date, roomNumber);
      }
    })
}

export {
  getUser,
  pageData,
  postBooking
}

