 import bcrypt from 'bcryptjs'

 export const hash = ({plainText,salt=process.env.SALT}={})=>{
  
     const hash = bcrypt.hashSync(plainText,parseInt(salt)) 
    return  hash

}
 export const Compare = ({password,hashedPassword}={})=>{
  return  bcrypt.compareSync(password,hashedPassword) 
 }

 