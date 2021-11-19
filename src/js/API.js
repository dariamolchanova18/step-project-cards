class API {
  static URL = "https://ajax.test-danit.com/api/v2/cards";
  static token = sessionStorage.getItem("token") || "";

  static createHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API.token}`,
    };
  }

  static async login(email, password) {
    const response = await fetch(`${API.URL}/login`, {
      method: "POST",
      headers: API.createHeaders(),
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status >= 400) {
      console.warn(await response.text());
      return;
    }

    const token = await response.text();
    API.token = token;
    sessionStorage.setItem("token", token);
  }

  static logout() {
    API.token = "";
    sessionStorage.removeItem("token");
  }

  static async createCard(body) {
    const response = await fetch(API.URL, {
      method: "POST",
      headers: API.createHeaders(),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  static async getCards() {
    const response = await fetch(API.URL, {
      method: "GET",
      headers: API.createHeaders(),
    });
    const data = await response.json();
    return data;
  }

  static async getCard(id) {
    const response = await fetch(`${API.URL}/${id}`, {
      method: "GET",
      headers: API.createHeaders(),
    });
    const data = await response.json();
    return data;
  }

  static async updateCard(id, body) {
    const response = await fetch(`${API.URL}/${id}`, {
      method: "PUT",
      headers: API.createHeaders(),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  static async deleteCard(id) {
    await fetch(`${API.URL}/${id}`, {
      method: "DELETE",
      headers: API.createHeaders(),
    });
  }
}

export default API;
