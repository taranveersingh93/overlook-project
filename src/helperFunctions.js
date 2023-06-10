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
    date = month.toString();
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

export {
  generateCurrentDate,
  hideElement,
  showElement,
  correctCase
}