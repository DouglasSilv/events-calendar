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

  async handleClick({ target }) {
    const isClickOutside = target.id === 'day-modal';
    const isAddNewClick = target.id === 'submit';
    if (this.isActive() && isClickOutside) {
      this.style.display = 'none';
    } else if (isAddNewClick) {
      const name = document.getElementById('event-name').value;
      const time = document.getElementById('event-time').value;
      const date = new Date(store.dateToCreateEvent);
      const [hours, minutes] = time.split(':');
      date.setHours(hours);
      date.setMinutes(minutes);
      const event = {
        name,
        date
      }
      const savedEvent = await eventService.createEvent(event);
      console.log(savedEvent);
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
            '<div class="day-modal-title">',
              `${day} de ${month} de ${year}`,
            '</div>',
            '<div>',
              '<div class="day-modal-add-new">',
                '<div class="day-modal-add-new-title">',
                  'Adicionar novo evento',
                '</div>',  
                '<input placeholder="Nome do evento" id="event-name" >',
                '<input placeholder="Horário do evento" id="event-time" type="time">',
                '<button id="submit" >Adicionar</button>',
              '</div>',
            '</div>',
          '</div>');
}

customElements.define('day-modal', DayModal);