const API_URL = "https://jsonplaceholder.typicode.com/users";
const list = document.querySelector("#user-list");
const statusText = document.querySelector("#status");
let users = [];

function render(items) {
  list.innerHTML = "";
  for (const user of items) {
    const li = document.createElement("li");
    li.textContent = `${user.name} · ${user.email}`;
    list.append(li);
  }
}

async function loadUsers() {
  statusText.textContent = "Loading...";
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    users = await response.json();
    statusText.textContent = "";
    render(users);
  } catch (error) {
    statusText.textContent = "Error: " + error.message;
  }
}

loadUsers();