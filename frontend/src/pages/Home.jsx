import { useState, useEffect, useRef } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([{id:1, text: "Ir al super", completed: false}]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const [isListening, setIsListening]= useState(false);
    const recognitionRef = useRef(null);
    const USER_ID = 123;
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchingTasks = async () => {
            setLoader(true);
            try{
                const response = await fetch(`${API_URL}?userId=${USER_ID}`);
                const data = await response.json();
                setTasks(data.data);
            } catch(error){
                console.log(`Error al recuperar las tareas: ${error}`);
                setError("Hubo un problema al cargar las tareas.")
            }finally{
                setLoader(false);
            }
        }

        fetchingTasks();
    }, []);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        //y si el usuario seleccionara el idioma?
        recognition.lang = "es-AR";
        recognition.continuous = true;
        recognition.intermResults = false;
        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim();
            addTask(transcript.charAt(0).toUpperCase() + transcript.slice(1) + ".");
            console.log(transcript);
        }
        recognitionRef.current = recognition;
    }, []);

    const toogleListening = () => {
        isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
        setIsListening(!isListening)
    }

    const addTask = async (text) => {
        try{
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({text, userId: USER_ID})
            })
            const data = await res.json()
            setTasks(prev => [data.data, ...prev]);
        } catch (error){
            console.log(`Error al agregar una tarea: ${error.message}`);
            setError("Hubo un error al agregar una tarea.")
        }
    };

    const handleDelete = async (id) => {
        try{
            if(confirm("¿Está seguro que desea borrar esta tarea?")){
                await fetch(`${API_URL}/${id}?userId=${USER_ID}`, {
                    method: "DELETE"
                })
                setTasks(tasks.filter(t => t._id !== id)) //mongo da el id con guion bajo?
            }
        }catch (error){
            console.log(error.message)
        }   
    }

    const handleComplete = async ({id, completed}) => {
        
        try{
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({completed: !completed, userId: USER_ID})
            });
            const data = res.json();
            setTasks(tasks.map(t => t._id === id ? data.data : t));
        }catch (error){
            console.log(error.message);
        }
    }

    return (
        <>
            { loader && <h2>Cargando...</h2>}
            { error && <h2>{error}</h2>}
            <div>
                <button onClick={toogleListening}>{isListening ? "Grabando..." : "Grabar"}</button>
            </div>
            { tasks.length > 0 &&
                <ul>
                {
                    tasks.map((task) => (
                        <li key={task._id}>
                            {task.text}
                            <button type="button" onClick={() => handleDelete(task._id)}>Borrar</button>
                            <button type="button" onClick={() => handleComplete(task)}>{task.completed ? "No completado" : "Completado"}</button>
                        </li>
                    ))
                }
            </ul>
            }
        </>
    );
}

export { Home };