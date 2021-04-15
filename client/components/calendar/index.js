class Calendar extends HTMLElement {
  async connectedCallback() {
    const count = await eventService.getEventsGroupedByMonth();
    this.innerHTML = buildCalendarHTML(count);
    console.log('Calendar added to DOM');
  }
}

const buildCalendarHTML = count => {
  const months = Array(12).fill();
  return mapRender(months, (_, index) => `<calendar-month month=${index} events="${count[index]}"></calendar-month> \n`);
}

customElements.define('my-calendar', Calendar);