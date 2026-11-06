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
  const response = await fetch("data.json");
  users = await response.json();
  statusText.textContent = "";
  render(users);
}

loadUsers();