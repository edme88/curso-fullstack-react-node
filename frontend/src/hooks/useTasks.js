import { useState } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  return {
    tasks,
    loader,
    error,
    isListening,
  };
};

export { useTasks };
