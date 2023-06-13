import { findRoomFromBooking } from './rooms'
import {
  formatDate
} from './helperFunctions'

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

const filterBookingsByDate = (bookings, date) => {
  const usableDate = formatDate(date);
  const filteredBookings = bookings.filter(booking => formatDate(booking.date) === usableDate);
  return filteredBookings;
}

const sortBookingsByDateBooked = (bookings) => [...bookings].sort((a,b) => Number(formatDate(b.date)) - Number(formatDate(a.date)));

export {
  filterBookingsByUser,
  checkIfUpcoming,
  calculateCost,
  setBookingsOfInterest,
  filterBookingsByDate,
  sortBookingsByDateBooked
}