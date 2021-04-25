class DayModal extends HTMLElement {
  async connectedCallback() {
    console.log('Day Modal added to DOM');
    this.addEventListener('click', this.handleClick, false);
    this.handleClick = this.handleClick.bind(this);
  }

  static get observedAttributes() {
    return ['active'];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active' && this.isActive()) {
      const { dateToCreateEvent } = store;
      const events = await eventService.getEventsByDate(dateToCreateEvent);
      this.innerHTML = buildDayModalHTML(events);
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
    const isRemoveClick = target.id.includes('remove-');
    if (this.isActive() && isClickOutside) {
      this.style.display = 'none';
    } else if (isAddNewClick) {
      const name = document.getElementById('event-name').value;
      const timeStart = document.getElementById('event-time-start').value;
      const timeEnd = document.getElementById('event-time-end').value;
      if (!name || !timeStart || !timeEnd) return;

      const startAt = new Date(store.dateToCreateEvent);
      const [hoursStart, minutesStart] = timeStart.split(':');
      startAt.setHours(hoursStart);
      startAt.setMinutes(minutesStart);

      const endAt = new Date(store.dateToCreateEvent);
      const [hoursEnd, minutesEnd] = timeEnd.split(':');
      endAt.setHours(hoursEnd);
      endAt.setMinutes(minutesEnd);

      const event = {
        name,
        startAt,
        endAt
      }
      await eventService.createEvent(event);
      const [ monthCalendarComponent ] = document.getElementsByTagName('month-calendar');
      monthCalendarComponent.connectedCallback();
      const { dateToCreateEvent } = store;
      const events = await eventService.getEventsByDate(dateToCreateEvent);
      this.innerHTML = buildDayModalHTML(events);
    } else if (isRemoveClick) {
      const [ ,id ] = target.id.split('-');
      await eventService.deleteEvent(id);
      const [ monthCalendarComponent ] = document.getElementsByTagName('month-calendar');
      monthCalendarComponent.connectedCallback();
      const { dateToCreateEvent } = store;
      const events = await eventService.getEventsByDate(dateToCreateEvent);
      this.innerHTML = buildDayModalHTML(events);
    }
  }
}

const buildDayModalHTML = events => {
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
                '<form onsubmit="return false">',
                  '<input required placeholder="Nome do evento" id="event-name" >',
                  'Inicio: <input required id="event-time-start" type="time">',
                  'Fim: <input required id="event-time-end" type="time">',
                  '<button id="submit" >Adicionar</button>',
                '</form>',
              '</div>',
              events.length > 0 && concatenateHTMLs(
              '<div class="day-modal-list-title">',
                'Lista de eventos',
              '</div>',
              '<ul class="day-modal-list">',
                mapRender(events, event => {
                  const startAt = new Date(event.startAt);
                  const endAt = new Date(event.endAt);
                  const startAtHours = addZeroes(startAt.getHours());
                  const startAtMinutes = addZeroes(startAt.getMinutes());
                  const endAtHours = addZeroes(endAt.getHours());
                  const endAtMinutes = addZeroes(endAt.getMinutes());
                  return `<li>${event.name} - <strong>Inicio</strong>: ${startAtHours}:${startAtMinutes} / <strong>Fim</strong>: ${endAtHours}:${endAtMinutes}<img src="images/trash_remove_icon.png" class="day-modal-list-remove" id="remove-${event._id}"></img></li>`
                }),
              '</ul>'),
            '</div>',
          '</div>');
}

customElements.define('day-modal', DayModal);