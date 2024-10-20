import { User } from "../models/userSchema.js";
import bcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        msg: "Incorrect password or email",
      });
      return;
    }
    const comparedPassword = bcyrpt.compare(password, user.password);
    if (!comparedPassword) {
      res.json({
        msg: "Incorrect password or email",
      });
      return;
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .json({ msg: "Login Successful" });
  } catch (e) {
    console.log(e);
  }
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (user) {
      res.json({ msg: "User with this credentials already exist" });
      return;
    }
    let hashed = await bcyrpt.hash(password, 10);
    user = await User.create({
      username,
      email,
      password: hashed,
    });
    res.json({ msg: "SignUp successful" });
  } catch (e) {
    console.log(e);
  }
};


export const logout = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .json({ msg: "Logout Successfull" });
};
