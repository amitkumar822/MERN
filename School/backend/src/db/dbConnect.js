import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DBNAME}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Faild to connect to database", error);
        process.exit(1);
    }
}