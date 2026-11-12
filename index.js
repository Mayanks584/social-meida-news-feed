import dotenv from "dotenv";
dotenv.config({
    path: './.env'
});
import express from "express"
import connectDb from "./src/database/database.js";


const app = express();




connectDb()
.then(()=>{

    // app. listen se phele error ko bhi listen karna chahte hai 

    app.on("error",(error)=>{
        console.log("erre",error);
        throw error
    })
    
    app.listen(process.env.PORT || 8000 , () =>{
        console.log('server is runing')
    })

})
.catch((error)=>{
    console.log("MongoDB connection daild:", error)

})

