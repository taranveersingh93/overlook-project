const sampleBookings = [
    {"id":"5fwrgu4i7k55hl6t5","userID":13,"date":"2022/01/24","roomNumber":24},
    {"id":"5fwrgu4i7k55hl6t6","userID":13,"date":"2022/01/10","roomNumber":12},
    {"id":"5fwrgu4i7k55hl6t7","userID":20,"date":"2022/02/16","roomNumber":7},
    {"id":"5fwrgu4i7k55hl6t8","userID":13,"date":"2022/02/05","roomNumber":12},
    {"id":"5fwrgu4i7k55hl6t9","userID":38,"date":"2023/12/14","roomNumber":14},
    {"id":"5fwrgu4i7k55hl6ta","userID":25,"date":"2022/01/11","roomNumber":9},
    {"id":"5fwrgu4i7k55hl6tb","userID":49,"date":"2022/02/06","roomNumber":5}
  ];

const smallBookings = [
  {"id":"5fwrgu4i7k55hl6t9","userID":38,"date":"2023/12/14","roomNumber":14},
  {"id":"5fwrgu4i7k55hl6ta","userID":25,"date":"2022/01/11","roomNumber":9},
  {"id":"5fwrgu4i7k55hl6tb","userID":49,"date":"2022/01/11","roomNumber":5},
];

const smallRooms = [
  {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17},
  {"number":9,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":199},
  {"number":14,"roomType":"residential suite","bidet":false,"bedSize":"twin","numBeds":1,"costPerNight":257.88},
]

const sampleUser = {"id":13,"name":"Christina Kulas"};
const dummyUser = {"id": 51};

const differentBookings = [
  {roomNumber:2},
  {roomNumber:3},
  {roomNumber:6},
]

const differentRooms = [
  {"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},
  {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
  {"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02},
  {"number":14,"roomType":"residential suite","bidet":false,"bedSize":"twin","numBeds":1,"costPerNight":457.88}
];

export {
  sampleBookings,
  sampleUser,
  dummyUser,
  smallBookings,
  differentRooms,
  smallRooms,
  differentBookings
}