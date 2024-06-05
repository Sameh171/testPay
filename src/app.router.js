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
        const secretKey = '21ttarqN2b64a7tv.r8EOw{#'; // Replace with your actual secret key
        const return_url = 'https://www.marineenglish.com.sa/'; // Replace with your actual secret key
        
        // APS sends the payload in the request body
        const payload = req.body;
        const receivedSignature = payload.signature;
    
        // Log the payload and received signature for debugging
        console.log('Payload:', payload);
        console.log('Received Signature:', receivedSignature);
    
        // Remove the signature from the payload before creating the string to hash
        delete payload.signature;
    
        // Construct the string to hash
        let stringToHash = secretKey;
        const sortedKeys = Object.keys(payload).sort();
        sortedKeys.forEach((key) => {
            // Exclude the signature field from the string to hash
        if (key == 'access_code' || key == 'merchant_identifier' || key == 'command' || key == 'merchant_reference' || key == 'amount' || key == 'currency' || key == 'language' || key == 'customer_email')  {
            stringToHash += `${key}=${payload[key]}`;
        }
        });
        stringToHash += return_url;
        stringToHash += secretKey;
    
        console.log("String to Hash: " + stringToHash); // Debug line
    
        // Generate the signature
        const generatedSignature = crypto.createHmac('sha256', secretKey)
                                         .update(stringToHash)
                                         .digest('hex');
    
        // Verify the signature
        if (generatedSignature !== receivedSignature) {
            console.log('Generated Signature:', generatedSignature); // Debugging
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
