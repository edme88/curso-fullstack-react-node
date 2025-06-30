import mongoose from "mongoose";
process.loadEnvFile();

const URI_DB = process.env.URI_DB ?? "mongodb://localhost:27017/tasks-darwoft";

const connect = async () => {
    try {
        await mongoose.connect(URI_DB)
    }catch (error) {
        console.log("Error al conectarse a mongodb")
    }
}

export { connect }