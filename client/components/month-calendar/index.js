class MonthCalendar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = buildMonthCalendarHTML();
    console.log('MonthCalendar added to DOM');
  }
}

const buildMonthCalendarHTML = () => {
  const gridRows = 6;
  const gridColumns = 7;

  const year = new Date().getFullYear();
  const month = 'Janeiro';
  const startingWeekday = new Date(year, 0).getDay();
  const days = daysInMonth(0, year);
  const startingBlankItems = Array.from(Array(startingWeekday).keys());
  const countEndingItems =
    gridRows * gridColumns - days.length - startingBlankItems.length;

  const endingBlankItems = Array.from(Array(countEndingItems).keys());
  return '<div class="month-calendar">' +
            '<div class="month-calendar-title">' +
              `${month}, ${year}` +
            '</div>' +
            '<div class="month-calendar-body">' +
              '<div class="month-calendar-weekdays">' +
                '<p class="month-calendar-weekday">Seg</p>' +
                '<p class="month-calendar-weekday">Ter</p>' +
                '<p class="month-calendar-weekday">Qua</p>' +
                '<p class="month-calendar-weekday">Qui</p>' +
                '<p class="month-calendar-weekday">Sex</p>' +
                '<p class="month-calendar-weekday">Sab</p>' +
                '<p class="month-calendar-weekday">Dom</p>' +
              '</div>' +
              '<div class="month-calendar-days">' +
                mapRender(startingBlankItems, () => '<div></div>') +
              '</div>' +
            '</div>' +
         '</div>';
}

customElements.define('month-calendar', MonthCalendar);