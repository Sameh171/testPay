import joi from "joi";

export const signupSchema ={ 
   body: joi.object({
    userName:joi.string().required().alphanum(),
    email:joi.string().email({maxDomainSegments:2,maxDomainSegments:3,tlds:{allow:['com','net']}}).required(),
    password:joi.string().required(),
    cPassword:joi.string().required().valid(joi.ref('password')),
    phoneNumber:joi.number().integer().required()
}).required()}
export const loginSchema ={ 
   body: joi.object({
    email:joi.string().email({maxDomainSegments:2,maxDomainSegments:3,tlds:{allow:['com','net']}}).required(),
    password:joi.string().required(),
}).required()}