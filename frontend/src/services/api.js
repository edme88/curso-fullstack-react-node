const API_URL = import.meta.env.VITE_API_URL;

const getTasks = async (userId) => {
  const response = await fetch(`${API_URL}?userId=${userId}`);
  const data = await response.json();
  return data.data;
};

const createTasks = async (text, userId) => {
  const res = await fetch(`${API_URL}?userId=${userId}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ text, userId }),
  });
  return res;
};

const deleteTasks = async (userId) => {
  const res = await fetch(`${API_URL}?userId=${userId}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return res;
};

const updateTasks = async (id, completed, userId) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ userId, completed: !completed }),
  });
  return res;
};

export { getTasks, createTasks, deleteTasks, updateTasks };
