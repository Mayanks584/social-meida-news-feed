import mongoose from "mongoose";

const userfollowing = new mongoose.Schema(
    {
        following:{
            id:Number,
        required:true,
        default:"0"

        }

    }
)

export const following = mongoose.model("Following",userfollowing)