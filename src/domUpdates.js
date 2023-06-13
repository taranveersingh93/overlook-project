import {
  getUser,
  pageData,
  postBooking
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
  bookingListGrid,
  roomGrid,
  displayText1,
  displayText2,
  filterValues,
  filterType
} from './scripts';

import {
  openCalendar,
  closeCalendar,
  refreshCalendar
} from './datePicker';

import {
  generateCurrentDate,
  correctCase,
  humanizeDate
} from './helperFunctions';

import { 
  findAvailableRooms,
  findRoomFromBooking,
  filterAvailableRooms
} from './rooms';

import {
  calculateCost,
  checkIfUpcoming,
  setBookingsOfInterest,
  filterBookingsByDate
} from './bookings';

let username;
let password;

let timerID;

const hideElement = element => {
  element.classList.add('hidden');
}

const showElement = element => {
  element.classList.remove('hidden');
}

const activateLoginBtn = () => {
  const userInputEntered = usernameInput.value && passwordInput.value;
  if (userInputEntered) {
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

const fixColumns = () => {
  let columns;
  if (window.innerWidth < 1200) {
    columns = 1;
  } else {
    columns = 2;
  }
  return columns;
}

const setRoomData = (room, index) => {
  return {
    roomNumber: room.number,
    cost: room.costPerNight,
    numBeds: room.numBeds,
    bedSize: correctCase(room.bedSize),
    roomType: correctCase(room.roomType),
    picture: room.picture,
    column: (index+1)%fixColumns()
  }
}

const separateIntoColumns = bookings => {
  const firstColumn = bookings.filter(booking => booking.column === 1);
  const secondColumn = bookings.filter(booking => booking.column === 2);
  const thirdColumn = bookings.filter(booking => booking.column === 3);
  const fourthColumn = bookings.filter(booking => booking.column === 0);
  const allColumns = [firstColumn, secondColumn, thirdColumn, fourthColumn];
  const filteredColumns = allColumns.filter(column => column.length);
  return filteredColumns;
}

const makeBookingsColumnData = bookings => {
  const mappedBookings = bookings.map((booking, index) => {
    const room = findRoomFromBooking(pageData.allRooms, booking);
    const cardInfo = setRoomData(room, index);
    cardInfo.date = booking.date;
    cardInfo.id = booking.id;
    cardInfo.isUpcoming = checkIfUpcoming(booking, generateCurrentDate());
    return cardInfo;
  })
  return separateIntoColumns(mappedBookings);
}

const makeRoomsColumnData = rooms => {
  const mappedRooms = rooms.map((room,index) => setRoomData(room, index));
  return separateIntoColumns(mappedRooms)
}

const createSingleRoomHtml = room => {
  let htmlCode = '';
  htmlCode += `
  <div class="room-card" tabindex="0" role="button" id="${room.roomNumber}">
    <div class="card-img-container">
      <img class="room-card-img card-img" src="${room.picture}">
      <section class="card-info">
        <p>Room Type: ${room.roomType}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Number of Beds: ${room.numBeds}</p>
        <p>Cost: $${room.cost}</p>
      </section>
    </div>
    <section class="room-card-text">
      <p class="card-room-text">Room ${room.roomNumber}</p>
      <button class="book-btn">Book room</button>
    </section>
  </div>
  `;
  return htmlCode
}

const createSingleBookingHtml = booking => {
  let extraClass = "past-booking";
  if (booking.isUpcoming) {
    extraClass = "upcoming-booking";
  }
  let htmlCode = '';
  htmlCode += `
  <div class="current-booking-card" tabindex="0" role="button" id="${booking.id}">
    <div class="card-img-container">
      <img class="current-booking-card-img card-img" src="${booking.picture}">
      <section class="card-info">
        <p>Room Type: ${booking.roomType}</p>
        <p>Bed Size: ${booking.bedSize}</p>
        <p>Number of Beds: ${booking.numBeds}</p>
        <p>Cost: $${booking.cost}</p>
      </section>
    </div>
    <section class="current-booking-card-text">
      <p class="card-room-text">Room ${booking.roomNumber}</p>
      <p class="card-date-text ${extraClass}">Date: ${booking.date}</p>
    </section>
  </div>
  `;
  return htmlCode
}

const createColumnHTML = (column, request) => {
  let htmlCode = '';
  htmlCode += '<div class="booking-column">'
  const map = {
    booking: (booking) => createSingleBookingHtml(booking),
    room: (room) => createSingleRoomHtml(room)
  };

  column.forEach(item => {
    htmlCode += map[request](item);
  });

  htmlCode += '</div>';
  return htmlCode;
}

const createGridHTML = (allColumns, request) => {
  let htmlCode = '';
  allColumns.forEach(column => {
    htmlCode += createColumnHTML(column, request);
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
  const username = document.querySelector('.user-name');
  username.innerText = `${name}`;
}

const renderDashboard = data => {
  const gridData = makeBookingsColumnData(data.bookingsOfInterest);
  bookingListGrid.innerHTML = '';

  if (gridData.length) {
    bookingListGrid.innerHTML = createGridHTML(gridData, "booking");
  } else {
    bookingListGrid.innerHTML = `<h2>Sorry, you don't have any bookings</h2>`
  }
  renderName(data.currentUser.name);
  renderTotal(data.bookingsOfInterest);
}

const renderRooms = (rooms) => {
  const newBookingsRibbon = document.querySelector('.new-bookings-ribbon')
  if (window.innerWidth < 1200) {
    newBookingsRibbon.style.flexDirection = "column";
  } else {
    newBookingsRibbon.style.flexDirection = "row";
  }
  
  const roomData = makeRoomsColumnData(rooms)
  roomGrid.innerHTML = '';
  if (roomData.length) {
    roomGrid.innerHTML = createGridHTML(roomData, "room");
  } else {
    roomGrid.innerHTML = `<h2>Sorry, you don't have any bookings</h2>`
  }
}

const showDashboard = (data) => {
  hideElement(loginView);
  showElement(websiteView);
  renderDashboard(data);
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
  pageData.currentView = view;
  const map = {
    "myBookings": "url('.././images/resort-2.jpg')",
    "newBookings": "url('.././images/resort-3.jpg')"
  }
  const websiteView = document.querySelector('.website-view');
  websiteView.style.backgroundImage = map[view];
}

const roomFilterApplied = () => {
  return (filterType.value !== "-" && filterValues.value !== "-");
}

const noRoomsToDisplay = () => pageData.roomsOfInterest.length === 0;

const setDisplayMessage = (dateSelected) => {
  if (noRoomsToDisplay()) {
    pageData.displayMessage = "Sorry, no rooms available."
    return
  }

  const map = {
    roomType: "Room Type",
    numBeds: "Number of Beds",
    cost: "Cost"
  };

  if (!roomFilterApplied()) {
    pageData.displayMessage = `Found ${pageData.roomsOfInterest.length} rooms for ${humanizeDate(dateSelected)}`
  } else {
    pageData.displayMessage = `Rooms filtered by ${map[filterType.value]}. \n Found ${pageData.roomsOfInterest.length} rooms for ${humanizeDate(dateSelected)}.`
  }
}

const setNewRooms = () => {
  const dateSelected = document.querySelector('#calendar').value;
  const existingBookings = filterBookingsByDate(pageData.allBookings, dateSelected);
  const availableRooms = findAvailableRooms(pageData.allRooms, existingBookings);
  const filteredRooms = filterAvailableRooms(availableRooms, filterType.value, filterValues.value);
  pageData.roomsOfInterest = filteredRooms;
  setDisplayMessage(dateSelected)
}

const renderNewRooms = () => {
  displayText1.innerText = pageData.displayMessage
  renderRooms(pageData.roomsOfInterest);
}

const showNewRooms = () => {
  setNewRooms();
  renderNewRooms();
}

const switchBookingView = clickedView => {
  const mainViews = document.querySelectorAll('.main-view');
  const bookingButtons = document.querySelectorAll('.bookings-button');
  flipViews(mainViews)
  toggleViewButtons(bookingButtons);
  changeBackground(clickedView);
  if (clickedView === "newBookingsView") {
    showNewRooms();
  }
}

const displayInfo = cardID => {
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

const actOnSearchIcon = (element) => {
  const map = {
    calendar: () => openCalendar(),
    calendarIcon: () => openCalendar(),
    calendarRefreshIcon: () => refreshCalendar(),
    crossIcon: () => closeCalendar()
  };
  const dateSelected = document.querySelector('#calendar').value;
  if (element.id === "calendarSearchIcon" && dateSelected) {
    showNewRooms();
  } else if (element.id && element.classList && map[element.id]) {
    map[element.id]();
  }
}

const generateHTMLforSingleValue = value => {
  const workingValue = value.replaceAll("-", " ");
  return `<option value=${value}>${workingValue}</option>`;
}

const generateHTMLforValues = (values) => {
  let htmlCode = ''
  values.forEach(value => {
    htmlCode += generateHTMLforSingleValue(value);
  });
  return htmlCode;
}

const changeFilterValue = () => {
  const map = {
    "-": ["-"],
    roomType: ["-", "Suite", "Residential-Suite", "Junior-Suite", "Single-Room"],
    numBeds: ["-","1","2"],
    cost: ["-","Under-200", "Under-300", "Under-400"]
  };

  const newValues = map[filterType.value];
  const htmlCode = generateHTMLforValues(newValues);
  filterValues.innerHTML = '';
  filterValues.innerHTML = htmlCode;
}

const refreshFilter = () => {
  filterType.value = "-";
  showNewRooms();
}

const resizeDisplay = () => {
  if (pageData.currentView === "myBookingsView") {
    showDashboard(pageData);
  } else if (pageData.currentView === "newBookingsView"){
    showNewRooms();
  }
}

const setDisplaySuccessMessage = (date, roomNumber) => {
  const successMessage = `Success! Room ${roomNumber} booked for ${humanizeDate(date)}`;
  displayText2.innerText = successMessage;
  displayText2.classList.add("show-feedback");
  setTimeout(() => {displayText2.classList.remove('show-feedback')}, 4001)
}

const setDisplayFailMessage = () => {
  const failMessage = "Sorry, your booking failed. Please try again."
  displayText2.innerText = failMessage;
  displayText2.classList.add("show-feedback");
  setTimeout(() => {displayText2.classList.remove('show-feedback')}, 4001)
}

const bookRoom = (roomNumber) => {
  const dateSelected = document.querySelector('#calendar').value;
  const userID = pageData.currentUser.id;
  postBooking(userID, dateSelected, roomNumber)
}

const actOnRoomCard = (element) => {
  const cardID = element.closest('.room-card').id;
  if (element.classList.contains("book-btn")) {
    bookRoom(cardID);
  } else {
    displayInfo(cardID);
  }
}

const setUserForAccessibility = () => {
  username = "customer19";
  getUser();
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
  displayInfo,
  changeCurrentBookingsView,
  switchBookingView,
  actOnSearchIcon,
  changeFilterValue,
  showNewRooms,
  refreshFilter,
  resizeDisplay,
  setDisplaySuccessMessage,
  bookRoom,
  actOnRoomCard
}
