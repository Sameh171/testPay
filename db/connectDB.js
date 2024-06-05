import mongoose from "mongoose";

const connect = ()=>{
    console.log(process.env.DB_LOCAL);
    return mongoose.connect(process.env.DB_LOCAL).then(result =>{console.log('DB connected ............')}).catch(err=>{console.log(`fail to connect..............${err}`)})
}
export default connect