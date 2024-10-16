import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuth = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({ msg: "Please log in!" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.json({ msg: "Please log in!" });
    }
    return res.json({ username: user.username, email: user.email });
  } catch (error) {
    return res.json({ msg: "Please log in!" });
  }
};
