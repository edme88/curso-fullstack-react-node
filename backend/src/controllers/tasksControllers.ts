//controla que petición es "sana" para mandar a la base de datos
//tomar y sanitizar data de entrada (input)
// procesos internos -> hash de contraseña
import { Task } from "../models/TasksModels";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { taskSchema } from "../validators/TaskSchemaValidatos";

//caso deseado -> {success: true, message: string, data}
//caso no deseado -> {success: false, message}

const getAllTasks = async (request: Request, response: Response) => {
    try {
        const tasks = await Task.find();
        response.json({success: true, message: "Éxito al obtener lista de tareas", data: tasks});
    } catch (error: any) {
        response.status(500).json({success: false, message: "Error al obtener las tareas", data: error.message})
    }
}

const createTask = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const body = request.body;
    console.log(body);
    //aplicar alguna librería para sanitizar la data de entrada
    const validator = taskSchema.safeParse({ text })
    console.log(validator)

    if(!validator.success){
        console.log(validator.error)
        return response.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Error al validar los datos", data: validator.error.issues})
    }

    try {
        const { text } = body
        const newTask = new Task({ text })
        await newTask.save();
        response.status(StatusCodes.CREATED).json({success: true, message: "Tarea registrada con éxito", data: newTask})
    } catch(error){
        response.status(400).json({success: false, message "Data Inválida"});
    }
}

const updateTask = async (request: Request, response: Response) => {
    const id = request.params.id
    const body = request.body
  
    try {
        if(!text || !id){
            return response.status(400).json({success: false, message: "Data Inválida"})
        }

        const updatedTask = await Task.findByIdAndUpdate(id, { text }, {new: true})

        if(!updateTask){
            return response.status(404).json({success: false, message: "Error al encontrar la tarea"})
        }
        response.status(200).json({success: true, message: "Tarea actualizada con éxito", data: updateTask})
    }catch(error){
        const err = error as Error
        response.status(500).json({success: false, message: "Tarea no actualizada", data: err.message})
    }
}

const deleteTask = async (request: Request, response: Response) => {
  const { id } = request.params
  try {
    if(!id){
        return response.status(400).json({success: "false", message: "Data Inválida"});
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if(!deleteTask){
        return response.status(404).json({ success: false, message: "Error al encontrar la tarea para eliminarla"})
    }
    return response.status(200).json({success: true, message:"Tarea eliminada con éxito"})
  }catch(error){

  }
}

export { getAllTasks, createTask, updateTask, deleteTask };

//mongo compass