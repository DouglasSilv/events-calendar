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

      const timeStart = document.getElementById('event-time-start').value;
      const startAt = new Date(store.dateToCreateEvent);
      const [hoursStart, minutesStart] = timeStart.split(':');
      startAt.setHours(hoursStart);
      startAt.setMinutes(minutesStart);

      const timeEnd = document.getElementById('event-time-end').value;
      const endAt = new Date(store.dateToCreateEvent);
      const [hoursEnd, minutesEnd] = timeEnd.split(':');
      endAt.setHours(hoursEnd);
      endAt.setMinutes(minutesEnd);

      const event = {
        name,
        startAt,
        endAt
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
                'Inicio: <input id="event-time-start" type="time">',
                'Fim: <input id="event-time-end" type="time">',
                '<button id="submit" >Adicionar</button>',
              '</div>',
            '</div>',
          '</div>');
}

customElements.define('day-modal', DayModal);