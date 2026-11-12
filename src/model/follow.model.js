import mongoose  from "mongoose";

const follow = new mongoose.Schema(
    {
        follow:{
            type:Number,
            required:true,
            default:0
        }


    }
)

export const fol = new mongoose.model("Follow",follow)