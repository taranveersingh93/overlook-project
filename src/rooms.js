const addPicture = room => {
  const proxyRoom = {...room}
  const pictureMap = {
    "residential suite": "residential-suite.jpg",
    "suite": ".suite.jpg",
    "single room": "single-room.jpg",
    "junior suite": "junior-suite.jpg"
  }

  const roomType = room.roomType;
  room.picture = `./images/${pictureMap[roomType]}`;
  return proxyRoom;
}

export {
  addPicture
}