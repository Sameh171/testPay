import { verifyToken } from "../utils/GenerateAndVerifyToken.js"
import userModel from '../../db/model/user.model.js'


const auth =async (req,res,next) => {
   try {
    const {authorization} = req.headers
    if (!authorization?.startsWith(process.env.BEARER_TOKEN)){
        return res.json({message:"in-valid token"})
    }
    const token = authorization.split(process.env.BEARER_TOKEN)[1]
    const decoded = verifyToken({
        token
    })
    if (!decoded?.id) {
        return res.json({message:"in-valid token payload "})
    }
    const authUser = await userModel.findById(decoded.id).select("userName email phoneNumber status")
    if (!authUser) {
        return res.json({message:"not registered acc"})   
    }
    req.user = authUser
    return next()

   } catch (error) {
    return res.json({message:"error",error,stack:error.stack})
   }
}
export default auth