class Calendar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = buildCalendarHTML();
    console.log('Calendar added to DOM');
  }
}

const buildCalendarHTML = () => {
  const months = Array(13).fill();
  return months.reduce((html, value, index) => `${html ?? ''} <calendar-month month=${index - 1} events="0"></calendar-month> \n`);
}

customElements.define('my-calendar', Calendar);