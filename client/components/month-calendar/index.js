class MonthCalendar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = buildMonthCalendarHTML();
    console.log('MonthCalendar added to DOM');
    this.addEventListener('click', this.handleClick, false);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    const isValidDay = target?.className.includes('month-calendar-day-valid');
    if (isValidDay) {
      const day = target.innerHTML;
      const month = Number(store.selectedMonth) + 1;
      const year = new Date().getFullYear();
      store.dateToCreateEvent = new Date(`${month}/${day}/${year}`);
      const modal = document.getElementById('day-modal');
      modal.setAttribute('active', true);
    }
  }
}

const buildMonthCalendarHTML = () => {
  const gridRows = 6;
  const gridColumns = 7;

  const year = new Date().getFullYear();
  const { selectedMonth } = store;
  const month = MONTHS[selectedMonth];
  const startingWeekday = new Date(year, selectedMonth).getDay();
  const days = daysInMonth(selectedMonth, year);
  const startingBlankItems = Array.from(Array(startingWeekday).keys());
  const countEndingItems =
    gridRows * gridColumns - days.length - startingBlankItems.length;
  const endingBlankItems = Array.from(Array(countEndingItems).keys());
  return concatenateHTMLs(
          '<div class="month-calendar">',
            '<div class="month-calendar-title">',
              `${month}, ${year}`,
            '</div>',
            '<div class="month-calendar-body">',
              '<div class="month-calendar-weekdays">',
                '<p class="month-calendar-weekday">Seg</p>',
                '<p class="month-calendar-weekday">Ter</p>',
                '<p class="month-calendar-weekday">Qua</p>',
                '<p class="month-calendar-weekday">Qui</p>',
                '<p class="month-calendar-weekday">Sex</p>',
                '<p class="month-calendar-weekday">Sab</p>',
                '<p class="month-calendar-weekday">Dom</p>',
              '</div>',
              '<div class="month-calendar-days">',
                mapRender(startingBlankItems, () => '<div class="month-calendar-day"></div>'),
                mapRender(days, value => `<div class="month-calendar-day month-calendar-day-valid">${value + 1}</div>`),
                mapRender(endingBlankItems, () => '<div class="month-calendar-day"></div>'),
              '</div>',
            '</div>',
         '</div>');
}

customElements.define('month-calendar', MonthCalendar);