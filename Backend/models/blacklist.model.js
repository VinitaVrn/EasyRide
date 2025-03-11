export {Schema, model} from "mongoose";

const blacklistSchema=new Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400
    }
});

export const blacklist=model("blacklist",blacklistSchema);