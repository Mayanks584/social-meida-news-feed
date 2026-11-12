import mongoose from "mongoose";


const connectDb = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}`);

        console.log("database is connected")
    }
    catch(erro){

        console.log(erro);

           process.exit(1);
    }

 
}

export default connectDb;