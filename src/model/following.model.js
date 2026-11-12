import mongoose from "mongoose";

const userfollowing = new mongoose.Schema(
    {
        following:{
            id:Number,
        required:true,
        default:"0"

        },
        follows:{
             id:Number,
            required:true,
                default:"0"
        }
    




    }
)