import mongoose from "mongoose";
const MONGODB_URI=process.env.MONGO_URI;

if(!MONGODB_URI){
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}
let cached=global.mongoose|| {conn:null,promise:null};

export async function connectDB(){
    if(cached.conn)  return cached.conn;
    if(!cached.promise){
        cached.promise=mongoose.connect(MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true

        });
    }

    cached.conn=await cached.promise;
    return cached.conn;
}
