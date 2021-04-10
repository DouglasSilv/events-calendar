class CalendarMonth extends HTMLElement {
  connectedCallback() {
    const month = this.getAttribute('month');
    const events = this.getAttribute('events');
    this.innerHTML = buildCalendarMonthHTML(MONTHS[month], events);
    console.log('Calendar Month added to DOM');
  }
}

const buildCalendarMonthHTML = (month, events) => {
  return '<div class="calendar-month-title">' +
            month +
          '</div>' +
          '<div class="calendar-month-events">' +
            `${events} eventos` +
          '</div>';
}

customElements.define('calendar-month', CalendarMonth);