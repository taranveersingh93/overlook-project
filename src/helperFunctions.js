const generateCurrentDate = () => {
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
    date = date.toString();
  }
  const fullDate = Number(year+month+date);
  return fullDate;
}

const hideElement = element => {
  element.classList.add('hidden');
}

const showElement = element => {
  element.classList.remove('hidden');
}

const correctCase = phrase => {
  const words = phrase.split(" ");
  const newWords = words.map(word => word[0].toUpperCase() + word.slice(1))
  return newWords.join(" ");
}

const formatDate = date => {
  const inputDate = date.toString();
  const year = inputDate.slice(0,4);
  const month = inputDate.slice(5,7);
  const newDate = inputDate.slice(8);
  const usableDate = year+month+newDate;
  return usableDate;
}

const humanizeDate = date => {
  const inputDate = date.toString();
  const year = inputDate.slice(0,4);
  const month = inputDate.slice(5,7);
  const newDate = inputDate.slice(8);
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };
  return `${months[month]} ${newDate}, ${year}`;
}

export {
  generateCurrentDate,
  hideElement,
  showElement,
  correctCase,
  formatDate,
  humanizeDate
}