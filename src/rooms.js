const addPicture = room => {
  const proxyRoom = {...room}
  const pictureMap = {
    "residential suite": "residential-suite.jpg",
    "suite": "suite.jpg",
    "single room": "single-room.jpg",
    "junior suite": "junior-suite.jpg"
  }

  const roomType = proxyRoom.roomType;
  proxyRoom.picture = `./images/${pictureMap[roomType]}`;
  return proxyRoom;
}

const findRoomFromBooking = (rooms, booking) => {
  return rooms.find(room => room.number === booking.roomNumber);
} 

const getUniqueRoomsFromBookings = bookings => {
  const rooms = bookings.map(booking => booking.roomNumber.toString());
  const uniqueRooms = [...new Set(rooms)];
  return uniqueRooms;
}

const findAvailableRooms = (allRooms, bookings) => { 
  const unavailableRooms = getUniqueRoomsFromBookings(bookings).map(room => room.toString());
  const availableRooms = allRooms.filter(room => !unavailableRooms.includes(room.number.toString()));
  return availableRooms;
}


const filterAvailableRooms = (rooms, typeOfFilter, valueOfFilter) => {
  const map = {
    null: rooms,
    roomType: () => filterRoomsByType(rooms, valueOfFilter),
    numBeds: () => filterRoomsByNumBeds(rooms, valueOfFilter),
    cost: () => filterRoomsByCost(rooms, valueOfFilter)    
  };
  return map[typeOfFilter];
}


export {
  addPicture,
  findRoomFromBooking,
  getUniqueRoomsFromBookings,
  findAvailableRooms,
  filterAvailableRooms
}