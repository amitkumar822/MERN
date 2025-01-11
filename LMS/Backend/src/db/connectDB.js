import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DBNAME}`);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error(error);
        console.log("failed to connect to database");
        process.exit(1);
    }
}