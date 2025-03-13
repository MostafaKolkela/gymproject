import * as authServices from '../service/userAuthService.js'
import {catchAsync} from '../../../utils/CatchAsync.js'


const Register = catchAsync(async(req , res , next)=>{
    const token = await authServices.Register(req.body)
    return res.status(201).json({
        success : true,
        msg : "done",
        token
    })
})

const login = catchAsync(async( req, res,next)=>{
    const token = await authServices.login(req.body.email , req.body.password , res)
    return res.status(200).json({success : true , msg : "login succssefully",token})
})




export {
    login,
    Register,
}