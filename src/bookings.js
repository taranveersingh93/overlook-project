const filterBookingsByUser = (bookings, user) => bookings.filter(booking => booking.userID.toString() === user.id.toString());

const checkIfUpcoming = (booking, currentDate) => {
  console.log(booking, currentDate);
  const bookedDate = booking.date;
  const refinedDate = Number(bookedDate.replaceAll("/", ""));
  console.log(refinedDate > currentDate);
  return refinedDate > currentDate;
}  

export {
  filterBookingsByUser,
  checkIfUpcoming
}