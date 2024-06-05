import jwt from "jsonwebtoken";

export const GenerateToken = ({
  payload = {},
  signature = process.env.TOKEN_SIGNATURE,
  expiresIn = 60 * 60,
} = {}) => {
  return jwt.sign(payload, signature, { expiresIn: parseInt(expiresIn) });
};
export const verifyToken = ({token,signature=process.env.TOKEN_SIGNATURE}={})=>{
    return jwt.verify(token,signature)
}