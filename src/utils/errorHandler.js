
export const asyncHandler = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(err=>next(new Error ("catch error")))

    }
}

export const globalErrHandler = (err,req,res,next )=>{

if (err) {
    return res.json({message:err.message , err :err.stack})
}
}