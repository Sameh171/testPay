
const dataMethods = ['body','query','params','headers','file']
const validation = (schema)=>{
    return (req,res,next)=>{
        const validationErr=[]
        dataMethods.forEach(Key => {
            if (schema[Key]) {
                const validationResult =schema[Key].validate(req[Key],{abortEarly:false})
                if (validationResult.error) {
                    validationErr.push(validationResult.error.details)
                }
            }
        });
        if (validationErr.length > 0) {
            return res.status(400).json({message:'validation error',validationErr})
        }else {
            return next()
        }
    }
}
export default validation