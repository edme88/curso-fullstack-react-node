import { Layout } from "../components/Layout";
import { useTasks } from "../hooks/useTasks";

const Home = () => {
    const {
        tasks,
        loader,
        error,
        isListening,
        toogleListening,
        handleDelete,
        handleComplete,
    } = useTasks();

    return (
        <Layout>
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
        </Layout>
    );
}

export { Home };