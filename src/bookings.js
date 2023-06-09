import { findRoomFromBooking } from './rooms'

const filterBookingsByUser = (bookings, user) => bookings.filter(booking => booking.userID.toString() === user.id.toString());

const checkIfUpcoming = (booking, currentDate) => {
  console.log(booking, currentDate);
  const bookedDate = booking.date;
  const refinedDate = Number(bookedDate.replaceAll("/", ""));
  return refinedDate > currentDate;
}  

const calculateCost = (rooms, bookings) =>  Math.floor(bookings.reduce((total, booking) => total + findRoomFromBooking(rooms, booking).costPerNight, 0));

export {
  filterBookingsByUser,
  checkIfUpcoming,
  calculateCost
}