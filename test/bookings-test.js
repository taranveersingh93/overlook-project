import chai from 'chai';
const expect = chai.expect;
const assert = chai.assert;

import {
  filterBookingsByUser,
  checkIfUpcoming,
  calculateCost,
  setBookingsOfInterest,
  filterBookingsByDate
} from '../src/bookings'

import {
  sampleBookings,
  sampleUser,
  dummyUser
} from '../src/data/sampleData'

describe('Check Booking functions existence', () => {
  it('should be functions', () => {
    assert.isFunction(filterBookingsByUser);
    assert.isFunction(checkIfUpcoming);
    assert.isFunction(calculateCost),
    assert.isFunction(setBookingsOfInterest),
    assert.isFunction(filterBookingsByDate)
  });
})

describe('Test booking functionality', () => {
  it('should filter bookings by user', () => {
    const filteredBookings = filterBookingsByUser(sampleBookings, sampleUser);
    const expectedBookings = [
      {"id":"5fwrgu4i7k55hl6t5","userID":13,"date":"2022/01/24","roomNumber":24},
      {"id":"5fwrgu4i7k55hl6t6","userID":13,"date":"2022/01/10","roomNumber":12},
      {"id":"5fwrgu4i7k55hl6t8","userID":13,"date":"2022/02/05","roomNumber":12},
    ]
    assert.deepEqual(filteredBookings, expectedBookings);
    assert.equal(filteredBookings.length, 3);
  });

  it('should return no bookings if user does not exist', () => {
    const filteredBookings = filterBookingsByUser(sampleBookings, dummyUser);
    assert.deepEqual(filteredBookings, []);
    assert.equal(filteredBookings.lemgth, undefined);
  });

  it('should return no bookings if user has not made bookings', () => {
    const user48 = {"id": 48};
    const filteredBookings = filterBookingsByUser(sampleBookings, user48);
    assert.deepEqual(filteredBookings, []);
    assert.equal(filteredBookings.lemgth, undefined);
  });

  it('should check if a booking is upcoming', () => {
    const currentDate = 20220612;
    const booking = sampleBookings[4];
    const isUpcoming = checkIfUpcoming(booking, currentDate);
    assert.equal(isUpcoming, true);
  })

  it('should return false if a booking is from a past date', () => {
    const currentDate = 20220612;
    const booking = sampleBookings[0];
    const isUpcoming = checkIfUpcoming(booking, currentDate);
    assert.equal(isUpcoming, false);
  })

  it('should return false if both dates are same', () => {
    const currentDate = 20220124;
    const booking = sampleBookings[0];
    const isUpcoming = checkIfUpcoming(booking, currentDate);
    assert.equal(isUpcoming, false);
  })

  it('should add cost of rooms for single booking', () => {
    const bookings = [{roomNumber: 2}];
    const rooms = [{costPerNight: 234, number:2}]
    const cost = calculateCost(rooms, bookings);
    assert.equal(cost, 234);
  })

  it('should round down the cost for the total', () => {
    const bookings = [{roomNumber: 2}];
    const rooms = [{costPerNight: 230.9, number:2}];
    const cost = calculateCost(rooms, bookings);
    assert.equal(cost, 230);
  })

  it ('should add cost of multiple bookings', () => {
    const bookings = [{roomNumber:3}, {roomNumber:5}];
    const rooms = [{number:3, costPerNight:100.5}, {number:5, costPerNight: 200}];
    const cost = calculateCost(rooms, bookings);
    assert.equal(cost, 300);
  });

  it('should return same bookings for allBookings for pastDate', () => {
    const viewID = "allBookings";
    const currentDate = 20001230;
    const bookingsOfInt = setBookingsOfInterest(viewID, sampleBookings, currentDate);
    assert.deepEqual(bookingsOfInt, sampleBookings);
  });

  it('should return same bookings for allBookings for futureDate', () => {
    const viewID = "allBookings";
    const currentDate = 20240125;
    const bookingsOfInt = setBookingsOfInterest(viewID, sampleBookings, currentDate);
    assert.deepEqual(bookingsOfInt, sampleBookings);
  });

  it('should return old bookings if viewID is pastBookings', () => {
    const viewID = "pastBookings";
    const currentDate = 20230612;
    const bookings = [
      {"id":"5fwrgu4i7k55hl6t9","userID":38,"date":"2023/12/14","roomNumber":14},
      {"id":"5fwrgu4i7k55hl6ta","userID":25,"date":"2022/01/11","roomNumber":9},
      {"id":"5fwrgu4i7k55hl6tb","userID":49,"date":"2022/02/06","roomNumber":5}
    ];
    const expectedBookings = [
      {"id":"5fwrgu4i7k55hl6ta","userID":25,"date":"2022/01/11","roomNumber":9},
      {"id":"5fwrgu4i7k55hl6tb","userID":49,"date":"2022/02/06","roomNumber":5}      
    ];
    const bookingsOfInt = setBookingsOfInterest(viewID, bookings, currentDate);
    assert.deepEqual(bookingsOfInt, expectedBookings);
  })

  it('should return upcoming bookings if viewID is upcomingBookings', () => {
    const viewID = "upcomingBookings";
    const currentDate = 20230612;
    const bookings = [
      {"id":"5fwrgu4i7k55hl6t9","userID":38,"date":"2023/12/14","roomNumber":14},
      {"id":"5fwrgu4i7k55hl6ta","userID":25,"date":"2022/01/11","roomNumber":9},
      {"id":"5fwrgu4i7k55hl6tb","userID":49,"date":"2022/02/06","roomNumber":5}
    ];
    const expectedBookings = [
      {"id":"5fwrgu4i7k55hl6t9","userID":38,"date":"2023/12/14","roomNumber":14},
    ];
    const bookingsOfInt = setBookingsOfInterest(viewID, bookings, currentDate);
    assert.deepEqual(bookingsOfInt, expectedBookings);
  })
});
