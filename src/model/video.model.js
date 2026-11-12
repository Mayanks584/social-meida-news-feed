import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    video:{
        type:String,
        required:true,
        default:"0"
    }
},{
    timestamps:true
})

export const Video = mongoose.model("Video", videoSchema)
