import mongoose  from "mongoose";

const User =  new mongoose.Schema(
    {

        username:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        password:{
            type:String,
            required:[true,"password is required"]
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true
        },

        profile:{
            type:String
        },
        name:{
            type:String,
            required:true
        },
        bio:{
            type:String
        },
        post:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }],
        video:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }],
        search:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Search"

        }],
        like:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Like"
        }],
        comment:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }],
        follow:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Follow"
        }],
        following:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Following"
        }],
        refreshToken:{
            type:String
        }
    },{
        timestamps:true
    }
)

export const Users = mongoose.model("Users",User)