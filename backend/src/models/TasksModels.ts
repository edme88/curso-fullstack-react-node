//estructurar la data
//definir un modelo

import { Schema, model } from "mongoose";
// const tasks = [
//     {
//         "_id": "3424k32j4lk32j4lk32j4lk32j4232",
//         "text": "ir a la veterinatia",
//         "completed": true,
//         "userId": "1234",
//         "createdAt": null,
//         "updatedAt": null
//     }
// ]

const taskSchema = new Schema({
    text: {type: String, require: true},
    completed: {type: Boolean, default: false},
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, {versionKey: false, timestamps: true})

const Task = model("Task", taskSchema)

export { Task };