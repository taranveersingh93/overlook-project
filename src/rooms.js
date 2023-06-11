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

const filterRoomsByType = (rooms, value) => {
  const workingValue = (value.replaceAll("-", " ")).toLowerCase();
  if (workingValue === "-") {
    return rooms;
  } else {
    return rooms.filter(room => room.roomType === workingValue);
  }
}

const filterRoomsByNumBeds = (rooms, value) => {
  if (value === "-") {
    return rooms;
  } else {
    return rooms.filter(room => room.numBeds === Number(value));
  }
}

const filterRoomsByCost = (rooms, value) => {
  const workingValue = Number(value.slice(-3));
  if (workingValue === "-") {
    return rooms;
  } else {
    return rooms.filter(room => (room.costPerNight) < workingValue);
  }
}

const filterAvailableRooms = (rooms, typeOfFilter, valueOfFilter) => {
  console.log("rooms", rooms);
  console.log("typeof", typeOfFilter),
  console.log("val", valueOfFilter)
  const map = {
    "-": () => rooms,
    roomType: () => filterRoomsByType(rooms, valueOfFilter),
    numBeds: () => filterRoomsByNumBeds(rooms, valueOfFilter),
    cost: () => filterRoomsByCost(rooms, valueOfFilter)    
  };
  return map[typeOfFilter]();
}


export {
  addPicture,
  findRoomFromBooking,
  getUniqueRoomsFromBookings,
  findAvailableRooms,
  filterAvailableRooms
}