import User from "../models/user.models.js";
import jwt from 'jsonwebtoken';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send({error: "Unauthorized - No token provided"});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).send({error: "Unauthorized - Invalid token"});
        }

        const user = await User.findById(decode.userId).select("-password");
        if (!user){
            return res.status(404).json({error: "Message not found"});
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protected route", error.message);
        return res.status(500).json({message: "Server Error"});
    }
}

export default protectRoute;