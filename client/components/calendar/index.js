class Calendar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = buildCalendarHTML();
    console.log('Calendar added to DOM');
  }
}

const buildCalendarHTML = () => {
  const months = Array(12).fill();
  return mapRender(months, (value, index) => `<calendar-month month=${index} events="0"></calendar-month> \n`);
}

customElements.define('my-calendar', Calendar);