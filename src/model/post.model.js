import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    post:{
        type:String,
        required:true,
        default:"0"
    }

},{
    timestamps:true
})

export const Post = mongoose.model("Post", postSchema)