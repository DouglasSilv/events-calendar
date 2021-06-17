const API_URL = 'http://localhost:3000';

export interface Event {
  _id?: string;
  name: string;
  startAt: Date;
  endAt: Date;
}

export const createEvent = (data: Event): Promise<Event> => {
  return fetch(`${API_URL}/events`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((response) => response.json());
};

export const getEventsGroupedByMonth = (): Promise<Record<number, number>> => {
  return fetch(`${API_URL}/events/count-by-months`).then(
    (response) => response.json() as Promise<Record<number, number>>,
  );
};

export const getEventsByMonthGroupedByDay = (month: number): Promise<Record<number, number>> => {
  return fetch(`${API_URL}/events/count-by-month/${month}`).then((response) => response.json());
};

export const getEventsByDate = (date: Date): Promise<Array<Event>> => {
  return fetch(`${API_URL}/events/by-date/${date.toISOString()}`).then((response) => response.json());
};

export const deleteEvent = (id: string): void => {
  fetch(`${API_URL}/events/${id}`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).catch((err) => console.log('Request Failed', err));
};
