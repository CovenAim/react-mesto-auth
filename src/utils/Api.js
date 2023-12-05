class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _sendRequest(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("Error");
    });
  }

  getAllCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getApiUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  editApiProfile(name, about) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  editAvatar(avatarUrl) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }

  addNewCardApi(name, link) {
    return this._sendRequest(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  changeLikeStatus(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    const url = `${this._url}/cards/${cardId}/likes`;

    return fetch(url, {
      method: method,
      headers: this._headers,
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw err;
        });
      }
      return response.json();
    });
  }

  deleteCardApi(cardId) {
    return this._sendRequest(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-76",
  headers: {
    authorization: "83dc9433-9b9b-4fa6-92f5-5a62f5b1db23",
    "Content-Type": "application/json",
  },
});

export default api;
