import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectMongoDB from "./db/connect.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



// app.get("/", (req, res) => {
//     res.status(200).send({"message": "Hello world"});
// });

app.listen(PORT, async () => {
    await connectMongoDB();
    console.log(`Server is running on port ${PORT}`);
});