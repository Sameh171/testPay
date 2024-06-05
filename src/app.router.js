import connect from "../db/connectDB.js"
import AuthRouter from "./modules/Auth/Auth.router.js"
import userRouter from "./modules/User/user.router.js"
import { globalErrHandler } from "./utils/errorHandler.js"
import crypto from 'crypto'
import cors from 'cors'



const initApp = (app , express)=>
{
    app.use(express.urlencoded({ extended: true }));

    app.use (cors())
    connect()
    app.get("/",(req,res)=>res.json({message : 'done'}))
    app.use ("/auth",AuthRouter)
    app.use ("/user",userRouter)
    app.post('/webhook', (req, res) => {
        const secretKey = "21ttarqN2b64a7tv.r8EOw{#"; // Replace with your actual secret key
        console.log(req);
        // APS sends the payload in the request body
        const payload = req.body;
        const signature = req.headers['aps-signature'];
        console.log(payload);
        console.log(signature);
        // Create the signature from the payload and your secret key
        const hash = crypto.createHmac('sha256', secretKey)
                           .update(JSON.stringify(payload))
                           .digest('hex'); 
    
        // Verify the signature
        if (hash !== signature) {
            return res.status(400).send('Signature mismatch');
        } 
     
        // Handle the event
        console.log('Received event:', payload); 
      
        // Respond with a 200 status to acknowledge receipt of the event
        res.status(200).send('Event received');
    });
    app.use ( globalErrHandler)
    app.all ("*",(req,res,next)=>{return res.json({message:'in-valid Url'})})
}
export default initApp
