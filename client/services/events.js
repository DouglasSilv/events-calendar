const URL = 'http://localhost:3000';

const eventService = {
  createEvent: data => {
    return fetch(`${URL}/events`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    .then(response => response.json()) 
    .catch(err => console.log('Request Failed', err));
  },
  getEventsGroupedByMonth: () => {
    return fetch(`${URL}/events/count-by-months`)
      .then(response => response.json())
      .catch(err => console.log('Request Failed', err));
  },
  getEventsByMonthGroupedByDay: month => {
    return fetch(`${URL}/events/count-by-month/${month}`)
      .then(response => response.json())
      .catch(err => console.log('Request Failed', err));
  },
  getEventsByDate: date => {
    return fetch(`${URL}/events/by-date/${date.toISOString()}`)
      .then(response => response.json())
      .catch(err => console.log('Request Failed', err));
  },
  deleteEvent: id => {
    return fetch(`${URL}/events/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).catch(err => console.log('Request Failed', err));
  }
}