const filterBookingsByUser = (bookings, user) => bookings.filter(booking => booking.userID.toString() === user.id.toString());

const generateDate = () => {
  const dateInfo = new Date();
  const year = dateInfo.getFullYear();
  let month = dateInfo.getMonth();
  if (month < 10) {
    month = `0${month.toString()}`;
  } else {
    month = month.toString();
  }

  let date = dateInfo.getDate();
  if (date < 10) {
    date = `0${date.toString()}`;
  } else {
    date = month.toString();
  }
  const fullDate = Number(year+month+date);
  return fullDate;
}

const checkIfUpcoming = (booking, currentDate) => {
  const bookedDate = booking.date;
  const refinedDate = Number(bookedDate.replaceAll("/", ""))
  return refinedDate > currentDate;
}  

checkIfUpcoming()

export {
  filterBookingsByUser
}