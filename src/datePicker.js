import flatpickr from "flatpickr";

const calendar = document.querySelector('#calendar')
const picker = flatpickr(calendar, {});
const openCalendar = () => {
  picker.open();
}
const closeCalendar = () => {
  picker.close();
}
const refreshCalendar = () => {
  picker.clear();
}

export {
  openCalendar,
  closeCalendar,
  refreshCalendar
}
