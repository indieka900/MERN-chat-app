import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURL);
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log(`Error while connecting to mongoDB \n${error.message}`);
        process.exit(0);
    }
}

export default connectMongoDB;