import flatpickr from "flatpickr";

const calendar = document.querySelector('#calendar');
const picker = flatpickr(calendar, {});
const openCalendar = () => {
  picker.open()
}

export {
  openCalendar
}
