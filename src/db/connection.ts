import mongoose from "mongoose";

const connectDB = async(url:any) => {
    return mongoose.connect(url);
}


export default connectDB;