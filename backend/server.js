import express from "express";
import dotenv from "dotenv";

import authRoutes from './routes/auth.routes.js';
import connectMongoDB from "./db/connect.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/auth", authRoutes);



// app.get("/", (req, res) => {
//     res.status(200).send({"message": "Hello world"});
// });

app.listen(PORT, async () => {
    await connectMongoDB();
    console.log(`Server is running on port ${PORT}`);
    
});