import { BASE_URL } from "./constants.js";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function request(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

export function authorize(email, password) {
  return request("/signin", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ email, password }),
  });
}

export function register(email, password) {
  return request("/signup", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ email, password }),
  });
}

export function checkToken(token) {
  return request("/users/me", {
    method: "GET",
    headers: {
      ...JSON_HEADERS,
      Authorization: `Bearer ${token}`,
    },
  });
}