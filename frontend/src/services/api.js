//const API_URL = import.meta.env.VITE_API_URL;
const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development";

const API_URL =
  NODE_DEV === "production"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:2222/api/";

const getTasks = async (token) => {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`, //autenticacion JWT - token "al portador"
    },
  });
  const data = await response.json();
  return data.data;
};

const createTasks = async (text, userId) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, userId: userId }),
  });
  const data = await res.json();
  return data.data;
};

const deleteTasks = async (id, userId) => {
  await fetch(`${API_URL}/${id}?userId=${userId}`, {
    method: "DELETE",
  });
};

const updateTasks = async (id, completed, userId) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed, userId }),
  });
  const data = res.json();
  return data.data;
};

export { getTasks, createTasks, deleteTasks, updateTasks };
