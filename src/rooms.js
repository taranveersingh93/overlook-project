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
  return rooms.find(room => room.number === booking.roomNumber)
} 

export {
  addPicture,
  findRoomFromBooking
}