import chai from 'chai';
const assert = chai.assert;

import {
  differentRooms,
  smallRooms,
  smallBookings,
  sampleBookings,
  differentBookings
} from '../src/data/sampleData'

import {
  addPicture,
  findRoomFromBooking,
  getUniqueRoomsFromBookings,
  findAvailableRooms,
  filterAvailableRooms
} from '../src/rooms'

describe('Check Room functions existence', () => {
  it('should be functions', () => {
    assert.isFunction(addPicture);
    assert.isFunction(findRoomFromBooking);
    assert.isFunction(getUniqueRoomsFromBookings),
    assert.isFunction(findAvailableRooms),
    assert.isFunction(filterAvailableRooms)
  });
});

describe('Add pictures to room based on roomType', () => {
  it('should add residential suite picture', () => {
    const room = addPicture(differentRooms[3]);
    assert.equal(room.picture, "./images/residential-suite.jpg")
  });

  it('should add suite picture', () => {
    const room = addPicture(differentRooms[0]);
    assert.equal(room.picture, "./images/suite.jpg")
  });

  it('should add single room picture', () => {
    const room = addPicture(differentRooms[1]);
    assert.equal(room.picture, "./images/single-room.jpg")
  });

  it('should add junior suite picture', () => {
    const room = addPicture(differentRooms[2]);
    assert.equal(room.picture, "./images/junior-suite.jpg")
  });
});

describe('Find rooms from bookings', () => {
  it('should find a single room from a booking', () => {
    const expectedRoom = {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17};
    const foundRoom = findRoomFromBooking(smallRooms, smallBookings[2]);
    assert.deepEqual(foundRoom, expectedRoom);
  });

  it('should return nothing if no room found',() => {
    const foundRoom = findRoomFromBooking(smallRooms, sampleBookings[0]);
    assert.equal(foundRoom, undefined);
  })

  it('should return all unique room numbers from all bookings', () => {
    const roomNumbers = getUniqueRoomsFromBookings(smallBookings);
    const expectedRooms = ["14", "9", "5"];
    assert.deepEqual(roomNumbers, expectedRooms);
  });
});

describe('Return available rooms', () => {
  it('should return the only unbooked rooms', () => {
    const expectedRooms = [
      {"number":14,"roomType":"residential suite","bidet":false,"bedSize":"twin","numBeds":1,"costPerNight":457.88}
    ];
    const availableRooms = findAvailableRooms(differentRooms, differentBookings);
    assert.deepEqual(availableRooms, expectedRooms);
  });

  it('should return multiple unbooked rooms', () => {
    const expectedRooms = [{"number":1}, {"number":3}];
    const allRooms = [
      {number:1},
      {number:2},
      {number:3},
      {number:4},
      {number:5}
    ];
    const bookings = [{"roomNumber":2}, {"roomNumber":4}, {"roomNumber":5}];
    const availableRooms  = findAvailableRooms(allRooms, bookings);
    assert.deepEqual(availableRooms, expectedRooms);
  });

  it('should return no rooms if none available', () => {
    const availableRooms = findAvailableRooms(smallRooms, smallBookings);
    assert.deepEqual(availableRooms, []);
  });
});

describe('Filter rooms by roomtype', () => {
  it('should filter suite room type', () => {
    const filteredRooms = filterAvailableRooms(differentRooms, "roomType", "suite");
    const expectedRoom = [{"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38}];
    assert.deepEqual(filteredRooms, expectedRoom);
  });

  it('should filter residential suite room type', () => {
    const filteredRooms = filterAvailableRooms(differentRooms, "roomType", "residential-suite");
    const expectedRoom = [{"number":14,"roomType":"residential suite","bidet":false,"bedSize":"twin","numBeds":1,"costPerNight":457.88}];
    assert.deepEqual(filteredRooms, expectedRoom);
  });

  it('should filter single room type', () => {
    const filteredRooms = filterAvailableRooms(differentRooms, "roomType", "single-room");
    const expectedRoom = [{"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14}];
    assert.deepEqual(filteredRooms, expectedRoom);
  });

  it('should filter junior suite room type', () => {
    const filteredRooms = filterAvailableRooms(differentRooms, "roomType", "junior-suite");
    const expectedRoom = [{"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02}];
    assert.deepEqual(filteredRooms, expectedRoom);
  });

  it('should apply no filter if no value selected', () => {
    const filteredRooms = filterAvailableRooms(smallRooms, "roomType", "-");
    assert.deepEqual(filteredRooms, smallRooms);
  });
});

describe('Filter rooms by number of beds', () => {
  it('should filter rooms that have single bed', () => {
    const expectedRooms = [
      {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
      {"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02},
      {"number":14,"roomType":"residential suite","bidet":false,"bedSize":"twin","numBeds":1,"costPerNight":457.88}
    ];
    const filteredRooms = filterAvailableRooms(differentRooms, "numBeds", 1);
    assert.deepEqual(filteredRooms, expectedRooms);
  });

  it('should filter rooms that have 2 beds', () => {
    const expectedRooms = [
      {"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38}
    ];
    const filteredRooms = filterAvailableRooms(differentRooms, "numBeds", 2);
    assert.deepEqual(filteredRooms, expectedRooms);
  });

  it('should apply no filter if no value selected', () => {
    const filteredRooms = filterAvailableRooms(smallRooms, "numBeds", "-");
    assert.deepEqual(filteredRooms, smallRooms);
  });
});

describe('Filter rooms by cost', () => {
  it('should find rooms under 200$', () => {
    const expectedRoom = [{"number":9,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":199}];
    const filteredRooms = filterAvailableRooms(smallRooms, "cost", "under-200");
    assert.deepEqual(filteredRooms, expectedRoom);
  });

  it('should find rooms under 300$', () => {
    const expectedRooms = [
      {"number":9,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":199},
      {"number":14,"roomType":"residential suite","bidet":false,"bedSize":"twin","numBeds":1,"costPerNight":257.88}
    ];
    const filteredRooms = filterAvailableRooms(smallRooms, "cost", "under-300");
    assert.deepEqual(filteredRooms, expectedRooms);
  });

  it('should find rooms under 400$', () => {
    const filteredRooms = filterAvailableRooms(smallRooms, "cost", "under-400");
    assert.deepEqual(filteredRooms, smallRooms);
  });

  it('should apply no filter if no value selected', () => {
    const filteredRooms = filterAvailableRooms(smallRooms, "cost", "-");
    assert.deepEqual(filteredRooms, smallRooms);
  });
});

describe('Check for no filter applied', () => {
  it('should apply no filter if no filter type is selected', () => {
    const filteredRooms = filterAvailableRooms(smallRooms, "-", "-");
    const filteredByRoomType = filterAvailableRooms(smallRooms, "-", "roomType");
    const filteredByNumBeds = filterAvailableRooms(smallRooms, "-", "numBeds");
    const filteredByCost = filterAvailableRooms(smallRooms, "-", "cost");
    assert.deepEqual(filteredRooms, smallRooms);
    assert.deepEqual(filteredByRoomType, smallRooms);
    assert.deepEqual(filteredByNumBeds, smallRooms);
    assert.deepEqual(filteredByCost, smallRooms);
  });
});