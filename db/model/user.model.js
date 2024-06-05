import mongoose,{ Schema,model } from "mongoose";



const userSchema = new Schema({
    userName:{
        type:String,
        required : true,
    },
    email : {
        type:String,
        unique:true,
        required :true
    },
    password:{
        type:String,
        require:true
    },
    phoneNumber:
    {
        type:String
    },
    status:{
        type:String,
        default:'Activated',
        enum:['Not Activated','Activated','Blocked']
    }
},{
    timestamps:true
})

const userModel =  model('User',userSchema) || mongoose.models.User 
export default userModel

