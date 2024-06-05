import userModel from "../../../../db/model/user.model.js";
import {asyncHandler} from "../../../utils/errorHandler.js";
import { GenerateToken } from "../../../utils/GenerateAndVerifyToken.js";
import { hash, Compare } from "../../../utils/HashingAndCompare.js";

export const GetAuthModule = (req, res, next) => {
  return res.json({ message: "Auth Module" });
};

export const signup = asyncHandler(async (req, res, next) => {
  const { userName, email, password, cPassword, phoneNumber } = req.body;
  console.log({ userName, email, password, cPassword, phoneNumber });
  const checkUser = await userModel.findOne({ email });
  if (checkUser) {
     return next(new Error("email exist"))
  }
  if (password != cPassword) {
    return next(new Error("password dose not match cPassword"))

  }
  const hashPassword = hash({ plainText: password });
  const newUser = await userModel.create({
    userName,
    email,
    password: hashPassword,
    phoneNumber,
  });
  return res.json({ message: "done", user: newUser._id });
});
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("email not exist"))
  }

  const match = Compare({ password, hashedPassword: user.password });
  if (!match) {
    return next(new Error("in-valid password"))

  }
  const token = GenerateToken({
    payload: {
      email : user.email,
      id: user._id,
      isLoggedIn: true,
    },
  });
  return res.json({ message: "done", token });
};
