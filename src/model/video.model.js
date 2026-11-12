import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    video:{
        type:String,
        required:true,
        default:"0"
    },
    length:[{
        type:Number,
        required:true
    }],
    discription:{
        type:String
    },
    Views:{
        type:Number
    },
    
},{
    timestamps:true
})

export const Video = mongoose.model("Video", videoSchema)
