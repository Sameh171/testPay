import express from 'express'
import initApp from './src/app.router.js'
import * as dotenv from 'dotenv'
import sendEmail from './src/utils/sendEmail.js'
dotenv.config()
const port =process.env.PORT 
const app = express()




initApp(app,express)

app.listen(port , ()=> console.log(`listening port is ${port} `))