import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectMongoDB from "./db/connect.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(cors({
//     origin: ["http://localhost:3000"],
//     credentials: true,
// }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);



// app.get("/", (req, res) => {
//     res.status(200).send({"message": "Hello world"});
// });

const startServer = async () => {
    try {
        await connectMongoDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit the process with an error code
    }
};

startServer();
