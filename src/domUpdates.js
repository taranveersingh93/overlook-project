import {
  getUser,
  pageData
} from './apiCalls';

import {
  loginBtn,
  customerLoginRadio,
  managerLoginRadio,
  usernameInput,
  passwordInput,
  loginFeedback,
  loginView,
  websiteView,
  bookingListGrid
} from './scripts'

import {
  showElement,
  hideElement,
  generateCurrentDate
} from './helperFunctions'
import { findRoomFromBooking } from './rooms';
import {calculateCost, setBookingsOfInterest} from './bookings'
let username;
let password;

let timerID; 
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

const makeBookingsColumnData = bookings => {

  const mappedBookings = bookings.map((booking, index) => {
    let columns = 4;
    if (window.innerWidth < 1000) {
      columns = 1;
    } else if (window.innerWidth < 1300) {
      columns = 2;
    } else if (window.innerWidth < 1600) {
      columns = 3;
    }
    
    const room = findRoomFromBooking(pageData.allRooms, booking);

    return {
      column: (index+1) % columns,
      date: booking.date,
      roomNumber: booking.roomNumber,
      cost: room.costPerNight,
      numBeds: room.numBeds,
      bedSize: room.bedSize,
      roomType: room.roomType,
      picture: room.picture,
      id: booking.id
    }
  })

  const firstColumn = mappedBookings.filter(booking => booking.column === 1);
  const secondColumn = mappedBookings.filter(booking => booking.column === 2);
  const thirdColumn = mappedBookings.filter(booking => booking.column === 3);
  const fourthColumn = mappedBookings.filter(booking => booking.column === 0);
  const allColumns = [firstColumn, secondColumn, thirdColumn, fourthColumn];
  const filteredColumns = allColumns.filter(column => column.length);

  return filteredColumns;
}

const createSingleBookingHtml = booking => {
  let htmlCode = '';
  htmlCode += `
  <div class="current-booking-card" tabindex="0" role="button" id="${booking.id}">
    <div class="card-img-container">
      <img class="current-booking-card-img" src="${booking.picture}">
      <section class="card-info">
        <p>Room type: ${booking.roomType}</p>
        <p>Bed size: ${booking.bedSize}</p>
        <p>Number of beds: ${booking.numBeds}</p>
        <p>Cost: $${booking.cost}</p>
      </section>
    </div>
    <section class="current-booking-card-text">
      <p class="card-room-text">Room ${booking.roomNumber}</p>
      <p class="card-date-text">Date: ${booking.date}</p>
    </section>
  </div>
  `;
  return htmlCode
}

const createColumnHTML = column => {
  let htmlCode = '';
  htmlCode += '<div class="booking-column">'
  column.forEach(booking => {
    htmlCode += createSingleBookingHtml(booking);
  });
  htmlCode += '</div>';
  return htmlCode;
}

const createGridHTML = allColumns => {
  let htmlCode = '';
  allColumns.forEach(column => {
    htmlCode += createColumnHTML(column);
  });
  return htmlCode;
}

const renderTotal = bookings => {
  clearTimeout(timerID);
  const totalElement = document.querySelector('.amount');
  totalElement.innerText = 0;
  const speed = 200;
  const target = calculateCost(pageData.allRooms, bookings);
  const animateCount = () => {
    const count = Number(totalElement.innerText);
    const increment = Math.floor(target/speed);
    if (count < target) {
      totalElement.innerText = count + increment;
      timerID = setTimeout(animateCount, 1);
    } else {
      totalElement.innerText = target;
    }
  }
  animateCount();
}

const renderName = name => {
  const username = document.querySelector('.welcome-text');
  username.innerText = `Welcome ${name}`;
}

const renderDashboard = data => {
  const gridData = makeBookingsColumnData(data.bookingsOfInterest);
  bookingListGrid.innerHTML = '';
  bookingListGrid.innerHTML = createGridHTML(gridData);
  renderName(data.currentUser.name);
  renderTotal(data.bookingsOfInterest);
}

const showDashboard = (data) => {
  hideElement(loginView);
  showElement(websiteView);
  renderDashboard(data);
}

const goToNewBookings = () => {

}
const flipViews = views => {
  views.forEach(view => {
    view.classList.toggle('hidden');
  });
}

const toggleViewButtons = buttons => {
  buttons.forEach(button => {
    button.classList.toggle('selected-booking');
    button.classList.toggle('unselected-booking')
  })
}

const changeBackground = view => {
  const map = {
    "myBookings": "url('.././images/resort-2.jpg')",
    "newBookings": "url('.././images/resort-3.jpg')"
  }
  const websiteView = document.querySelector('.website-view');
  websiteView.style.backgroundImage = map[view];
}

const switchBookingView = clickedView => {
  const mainViews = document.querySelectorAll('.main-view');
  const bookingButtons = document.querySelectorAll('.bookings-button');
  flipViews(mainViews)
  toggleViewButtons(bookingButtons);
  changeBackground(clickedView);
  const map = {
    "myBookings": loadMyBookings(pageData.currentUser),
    "newBookings": loadNewBookings()
  }
  map[clickedView]();
}

const displayBookingInfo = cardID => {
  document.getElementById(cardID).querySelector(".card-info").classList.toggle("display-info");
}

const toggleCurrentBookingButtons = viewID => {
  const allButtons = document.querySelectorAll('.list-button');
  allButtons.forEach(button => {
    button.classList.remove("selected-button");
    button.classList.add("unselected-button");
  });
  document.getElementById(viewID).classList.add("selected-button");
  document.getElementById(viewID).classList.remove("unselected-button")
}

const filterCurrentBookings = viewID => {
  pageData.bookingsOfInterest = setBookingsOfInterest(viewID, pageData.userBookings, generateCurrentDate());
  renderDashboard(pageData);
}

const changeCurrentBookingsView = viewID => {
  filterCurrentBookings(viewID);
  toggleCurrentBookingButtons(viewID);
}

export {
  activateLoginBtn,
  username,
  password,
  selectRadio,
  submitUserData,
  showGenericLoginError,
  showLoginError,
  showDashboard,
  displayBookingInfo,
  changeCurrentBookingsView,
  switchBookingView
}
