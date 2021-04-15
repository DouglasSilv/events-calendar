const URL = 'http://localhost:3000';

const eventService = {
  createEvent: data => {
    return fetch(`${URL}/events`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .catch(err => console.log(err));
  }
}