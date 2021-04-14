const store = {
  selectedMonth: undefined,
  dateToCreateEvent: undefined
};

window.onload = () => render('<my-calendar></my-calendar>', document.getElementById('root'));