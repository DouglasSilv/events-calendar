class CalendarMonth extends HTMLElement {
  connectedCallback() {
    const month = this.getAttribute('month');
    const events = this.getAttribute('events');
    this.innerHTML = buildCalendarMonthHTML(MONTHS[month], events);
    console.log('Calendar Month added to DOM');
    this.addEventListener('click', this.handleClick, false);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    render('<month-calendar></month-calendar>', document.getElementById('root'));
  }
}

const buildCalendarMonthHTML = (month, events) => {
  return concatenateHTMLs(
          '<div class="calendar-month-title">',
            month,
          '</div>',
          '<div class="calendar-month-events">',
            `${events} eventos`,
          '</div>');
}

customElements.define('calendar-month', CalendarMonth);