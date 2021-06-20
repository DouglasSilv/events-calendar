const API_URL = process.env.REACT_APP_API_URL;

interface User {
  username: string;
  password: string;
}

export const login = (data: User): Promise<string | Error> => {
  return fetch(`${API_URL}/auth`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.text();
    })
    .catch((error) => new Error(error.message));
};
