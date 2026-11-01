import mongoose  from "mongoose";

const User =  new mongoose.Schema(
    {

        username:{
            type:String,
            required:true,
            trim:true,
        },
        password:{
            type:String,
            required:[true,"password is required"]
        },
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:post
        },
        video:{
            type:mongoose.Schema.Types.ObjectId,
            ref:video
        },
        search:{
            type:mongoose.Schema.Types.ObjectId,
            ref:search

        },
        like:{
            type:mongoose.Schema.Types.ObjectId,
            ref:like
        },
        comment:{
            type:mongoose.Schema.Types.ObjectId,
            ref:commnet
        },
        follow:{
            type:mongoose.Schema.Types.ObjectId,
            ref:follow
        },
        follwing:{
            type:mongoose.Schema.Types.ObjectId,
            ref:follwing
        }
    },{
        timestamps:true
    }
)

export const Users = mongoose.model("Users",User)