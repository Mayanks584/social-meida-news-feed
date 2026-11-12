import dotenv from "dotenv";
dotenv.config({
    path: './.env'
});
import {app} from "./app.js"
import connectDb from "./database/database.js";
import { Users } from "./model/user.model.js";

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



