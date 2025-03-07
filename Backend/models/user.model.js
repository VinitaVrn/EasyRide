import {Schema, model} from "mongoose";

const userschema= new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        minlength:5
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId: {
        type: String,
    }
})

const users=model("user",userschema)
export{users}