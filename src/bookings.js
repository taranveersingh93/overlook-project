import { findRoomFromBooking } from './rooms'

const filterBookingsByUser = (bookings, user) => bookings.filter(booking => booking.userID.toString() === user.id.toString());

const checkIfUpcoming = (booking, currentDate) => {
  const bookedDate = booking.date;
  const refinedDate = Number(bookedDate.replaceAll("/", ""));
  return refinedDate > currentDate;
}  

const calculateCost = (rooms, bookings) =>  Math.floor(bookings.reduce((total, booking) => total + findRoomFromBooking(rooms, booking).costPerNight, 0));

const setBookingsOfInterest = (viewID, bookings, currentDate) => {
  const proxyBookings = [...bookings];
  const map = {
    "allBookings": proxyBookings,
    "pastBookings": proxyBookings.filter(booking => !checkIfUpcoming(booking, currentDate)),
    "upcomingBookings": proxyBookings.filter(booking => checkIfUpcoming(booking, currentDate))
  };
  bookings = map[viewID];
  return bookings;
}

export {
  filterBookingsByUser,
  checkIfUpcoming,
  calculateCost,
  setBookingsOfInterest
}