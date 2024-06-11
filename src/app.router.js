import connect from "../db/connectDB.js"
import AuthRouter from "./modules/Auth/Auth.router.js"
import userRouter from "./modules/User/user.router.js"
import { globalErrHandler } from "./utils/errorHandler.js"
import crypto from 'crypto'
import cors from 'cors'



const initApp = (app , express)=>
{

    app.use (cors())
    // Middleware to parse URL-encoded bodies
    app.use(express.urlencoded({ extended: true }));

    // Middleware to parse JSON bodies
    app.use(express.json());
    app.post('/webhook', (req, res) => {
        // APS sends the payload in the request body
        console.log(req);
        console.log(req.body);
        res.status(200).send('Event received');
      //  const payload = req.body;
       // const receivedSignature = payload.signature;
     //   const secretKey = '21ttarqN2b64a7tv.r8EOw{#'; // Replace with your actual secret key
       // if (payload.response_message == 'Success') {

            // Handle the event
          //  console.log('Received event:', payload);
        
            // Respond with a 200 status to acknowledge receipt of the event
           // res.status(200).send('Event received');
   //     }else {
               // Handle the event
         //   console.log('Received event:', payload);
        //    return res.status(200).send('payment Failed');
     //   }
    
    });
    // connect()
    app.get("/",(req,res)=>res.json({message : 'done'}))
    app.use ("/auth",AuthRouter)
    app.use ("/user",userRouter)
    app.use ( globalErrHandler)
    app.all ("*",(req,res,next)=>{return res.json({message:'in-valid Url'})})
}
export default initApp
