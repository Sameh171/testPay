import userModel from "../../../../db/model/user.model.js"
import { asyncHandler } from "../../../utils/errorHandler.js"
import payment from "../../../utils/payment.js"

export const GetUserModule = asyncHandler(
    async (req,res,next)=>{
        const users =await userModel.find()
        return res.json({message:"User Module",users})
    } 
)
export const profile = asyncHandler(
    async (req,res,next)=>{
        const users =await userModel.findById(req.user._id)
        return res.json({message:"User Module",users})
    } 
)
export const pay = asyncHandler(
    async (req,res,next)=>{
        const users =await userModel.findById(req.user._id)
        console.log(req.user.email);
        console.log(req.user._id);
        console.log(req.body.name);
        console.log(req.body.amount);
       const session =  await payment({
            customer_email : req.user.email,
            metadata : {
                orderId: 'sadwdq3e13e2efsdac'
            },
            line_items: [{
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:req.body.name
                    },
                    unit_amount:req.body.amount * 100
                },
                quantity:req.body.quantity
            }]
        })
        return res.json({message:"User Module",users , session ,url : session.url})
    } 
)