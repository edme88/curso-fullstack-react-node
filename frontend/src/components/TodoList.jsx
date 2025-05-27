import { useState } from "react"

const TodoList = () => {
    const [tasks, setTasks] = useState([{id: 1, text: "Hola", completed: true},{id: 2, text: "Chau", completed: false}]);
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()

        if(text.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
        }
        setTasks([...tasks, newTask])
        setText("")
    }

    const handleUpdate = (id) => {
        setTasks(tasks.map((task) => task.id === id ? {...task, completed: !task.completed } : task))

    }

    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id ));
    }

    return (
        <>
            <h1>Todo List App</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button type="submit">Agregar Tarea</button>
            </form>

            <ul>
                {
                    tasks.map((task) => (
                    <li key={task.id}>
                        <input type='checkbox' checked={task.completed} onChange={()=> {handleUpdate(task.id)}}/>
                        { task.text }
                        <button onClick={() => {handleDelete(task.id)}}> X </button>
                    </li>))
                }
            </ul>
        </>
    )
}

export default TodoList;