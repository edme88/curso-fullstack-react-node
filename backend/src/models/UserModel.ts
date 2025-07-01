import { Schema, model } from "moongose"

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true},
    passwprd: { type: String, required: true},
}, { versionKey: false })

export const User = model("User", UserSchema)