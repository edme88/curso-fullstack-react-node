//punto de entrada al sistema
//levantar base de datos
//levantar servidor
import express from "express"
process.loadEnvFile();
import connect from "../src/config/mongoConnect";

const PORT = process.env.PORT ?? 1234


const app = express();
app.use//NO recuerdo como sigue

app.use("/api/task", taskRouter)

app.get("/api/tasks", (request, response) => {
    response.json({data: tasks});
})

app.post("/api/tasks", (request, response) => {
    //ver si me mandaron la data
})

//localhost:3000/api/tasks/1?sku=3&name=mochila&color=rojo&price=30000
app.get("/api/tasks/:id", (request, response) => {
    const queryParams = request.query; //query params -> parametros de búsqueda que pueden o no estar
    console.log(queryParams)

    const query = {}

    // if(queryParams.sku){
    //     query.sku = queryParams.sku;
    // }
    response.end()
    // response.json("Hola desde mi método")
    // const { id } = request.params;
    // console.log(`${id} - id por url`)
})

app.delete("/api/tasks/:id", (request, response) => {
    //falta
})

app.post("/api/auth/login", () => {

})

app.post("/api/auth/register", () => {
    
})

app.listen(PORT, () => {
    console.log(`Servidor en escucha por el puerto ${PORT}`)
})

//nullish coalescing ?? de coalescencia nula
// http://localhost:3000/api/tasks