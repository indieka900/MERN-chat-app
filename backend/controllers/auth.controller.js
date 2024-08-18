import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).send({ error: "Password didn't match!" });
    }
    const user = await User.findOne({ username });

    if (user) {
      return res
        .status(400)
        .send({ error: "User with this username already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //https://avatar.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      await newUser.save();
      generateTokenAndSetCookie(newUser._id,res);

      const userResponse = {
        id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      };

      return res.status(201).send(userResponse);
    } else {
        res.status(400).send('Invalid user data');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
};

export const login = (req, res) => {
  res.status(200).send({ message: "Login route" });
};

export const logout = (req, res) => {
  res.status(200).send({ message: "Logout route" });
};
