import { useState, useEffect, useRef } from "react";
import {
  getTasks,
  createTasks,
  deleteTasks,
  updateTasks,
} from "../services/api";
import { useAuth } from "../context/authContext";

const useTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Ir al super", completed: false },
  ]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const USER_ID = 123;

  const { token } = useAuth();

  useEffect(() => {
    const fetchingTasks = async () => {
      setLoader(true);
      try {
        const tasks = await getTasks(token);
        setTasks(tasks);
      } catch (error) {
        console.log(`Error al recuperar las tareas: ${error}`);
        setError("Hubo un problema al cargar las tareas.");
      } finally {
        setLoader(false);
      }
    };

    fetchingTasks();
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    //y si el usuario seleccionara el idioma?
    recognition.lang = "es-AR";
    recognition.continuous = true;
    recognition.intermResults = false;
    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
      addTask(transcript.charAt(0).toUpperCase() + transcript.slice(1) + ".");
      console.log(transcript);
    };
    recognitionRef.current = recognition;
  }, []);

  const toogleListening = () => {
    isListening
      ? recognitionRef.current.stop()
      : recognitionRef.current.start();
    setIsListening(!isListening);
  };

  const addTask = async (text) => {
    try {
      const data = await createTasks(text, USER_ID);
      setTasks((prev) => [data, ...prev]);
    } catch (error) {
      console.log(`Error al agregar una tarea: ${error.message}`);
      setError("Hubo un error al agregar una tarea.");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (confirm("¿Está seguro que desea borrar esta tarea?")) {
        await deleteTasks(id, USER_ID);
        setTasks(tasks.filter((t) => t._id !== id)); //mongo da el id con guion bajo?
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleComplete = async ({ _id, completed }) => {
    try {
      const data = await updateTasks(_id, completed, USER_ID);
      setTasks(tasks.map((t) => (t._id === _id ? data : t)));
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return {
    tasks,
    loader,
    error,
    isListening,
    toogleListening,
    handleDelete,
    handleComplete,
  };
};

export { useTasks };
