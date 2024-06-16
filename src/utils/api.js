const baseUrl = "http://localhost:3001";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
}

function addItems({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify({
        name,
        weather,
        imageUrl,
      }),
    },
  }).then(handleServerResponse);
}

function removeItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
}

const api = {
  getItems,
  addItems,
  removeItems,
};

export default api;
