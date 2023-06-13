import { 
  filterBookingsByUser,
  sortBookingsByDateBooked
} from './bookings';
import {
  username,
  showGenericLoginError,
  showLoginError,
  showDashboard,
  setDisplaySuccessMessage,
  showNewRooms,
  setDisplayFailMessage
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
    .then(data => {
      if (data.bookings) {
        return data.bookings;
      }
    })
    .catch(err => console.error(err)); 
}

const setUserData = (user) => {
  pageData.currentUser = user;
  return getAllBookings()
    .then(bookings => {
      pageData.allBookings = sortBookingsByDateBooked(bookings);
      pageData.userBookings = filterBookingsByUser(pageData.allBookings, pageData.currentUser);      
      pageData.bookingsOfInterest = [...pageData.userBookings];
    })
    .catch(err => {
      showGenericLoginError();
      console.error(err);
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
    .catch(err => {
      showGenericLoginError();
      console.error(err);
    })
}

const getUser = () => {
  const queryID = username.slice(8);
  convertFetchToJSON(`http://localhost:3001/api/v1/customers/${queryID}`)
    .then(user => {
      if (user.id) {
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
      if (response.rooms) {
        const roomsInfo = response.rooms;
        pageData.allRooms = roomsInfo.map(room => addPicture(room));
      } else {
        showGenericLoginError();
      }
    })
    .catch((err) => {
      showGenericLoginError();
      console.error(err)
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
    .then(data => data.json())
    .then(response => {
      if (response.message.includes("successfully posted")) {
        refreshBookings(date, roomNumber);
      } else {
        setDisplayFailMessage();
      }
    })
    .catch(err => {
      setDisplayFailMessage();
      console.error(err);
    })
}

export {
  getUser,
  pageData,
  postBooking
}

