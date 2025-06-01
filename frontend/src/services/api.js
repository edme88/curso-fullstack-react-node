const API_URL = import.meta.env.VITE_API_URL;

const getTasks = async (userId) => {
  const response = await fetch(`${API_URL}?userId=${userId}`);
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
