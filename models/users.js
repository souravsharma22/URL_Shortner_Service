import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type: String,
        required : true
    },
    //role of the user
    role:{
        type: String,
        required: true,
        default:'NORMAL'
    }
} , {timestamps : true})

const user = mongoose.model('user' , userSchema)

export default user;