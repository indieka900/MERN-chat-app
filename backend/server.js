import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js';
import connectMongoDB from "./db/connect.js";

dotenv.config();
const app = express();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.status(200).send({"message": "Hello world"});
});

app.listen(PORT, async () => {
    //await connectMongoDB();
    console.log(`Server is running on port ${PORT}`);
    
});