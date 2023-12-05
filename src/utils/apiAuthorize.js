export const BASE_URL = 'https://auth.nomoreparties.co';

export function sendRequest(res) {
  if (res.ok) {
    return res.json();
  } else {
    console.error('Ошибка сервера:', res.status, res.statusText);
    return res.json()
      .then((errorData) => {
        console.error('Данные ошибки:', errorData);
        throw new Error(errorData.message || `Ошибка: ${res.status} ${res.statusText}`);
      })
      .catch((error) => {
        console.error('Ошибка при обработке JSON:', error);
        throw new Error(`Ошибка: ${res.status} ${res.statusText}`);
      });
  }
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
    .then(sendRequest);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
    .then(sendRequest);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(sendRequest);
};
