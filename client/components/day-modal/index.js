class DayModal extends HTMLElement {
  connectedCallback() {
    console.log('Day Modal added to DOM');
    this.addEventListener('click', this.handleClick, false);
    this.handleClick = this.handleClick.bind(this);
  }

  static get observedAttributes() {
    return ['active'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active' && this.isActive()) {
      this.innerHTML = buildDayModalHTML();
      this.style.display = 'flex';
    } else {
      this.style.display = 'none';
    }
  }

  isActive() {
    return this.getAttribute('active') === 'true';
  }

  handleClick({ target }) {
    const isClickOutside = target.id === 'day-modal';
    if (this.isActive() && isClickOutside) {
      this.style.display = 'none';
    }
  }
}

const buildDayModalHTML = () => {
  const { dateToCreateEvent } = store;
  const day = dateToCreateEvent.getDate();
  const month = MONTHS[dateToCreateEvent.getMonth()];
  const year = dateToCreateEvent.getFullYear();
  return concatenateHTMLs(
          '<div class="day-modal-content">',
            `${day} de ${month} de ${year}`,
          '</div>');
}

customElements.define('day-modal', DayModal);