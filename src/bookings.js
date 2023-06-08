const filterBookingsByUser = (bookings, user) => bookings.filter(booking => booking.userID.toString() === user.id.toString());

export {
  filterBookingsByUser
}