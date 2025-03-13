import {AppError} from '../../../utils/AppError.js';
import bcrypt from 'bcrypt';
import { enumRole } from '../../../user/model/userModel.js';
import * as coachRepo from '../Repo/coachRepo.js';
import { generateToken } from '../../../utils/GenerateToken.js';
import mongoose from 'mongoose';
import * as Repo from '../../userAuth/repo/userAuthRepo.js'


export const coachregister = async (data) => {
    const { userName , email  , password , Cpassword , cv , fees } = data;

    if(password !== Cpassword)
        throw new AppError('passwords are not match!' , 400);

    const ifCoachExists = await coachRepo.findUser({email});

    if (ifCoachExists)
        throw new AppError("Coach already exists", { cause: 400 });

    const hash_pass = await bcrypt.hash(password , 12);

    const coachId = new mongoose.Types.ObjectId();

    const newCoach ={
        _id: coachId,
        userName,
        email,
        password: hash_pass,
        cv,
        fees,
        role: enumRole.coach,
    }

    const newCoachDetails = {
        userId: coachId,
        cv,
        fees
    }

    const token = generateToken({email : newCoach.email , id : coachId})
    
    await Promise.all([
        coachRepo.saveuser(newCoach),
        coachRepo.savecoach(newCoachDetails)
    ])

    return token
}

export const coachlogin = async(email,password)=>{
    const user = await Repo.FindByEmail(email)
    if(!user)
        {
            throw new AppError("user not found!" , 404)
        }
    const pass = await bcrypt.compare(password , user.password)
    if(pass)
        {
            const token = generateToken({email : user.email , id : user._id})

            user.token = token
            await Repo.saveuser(user);
            return token
        }
    throw new AppError("password or Email are incorrect!" , 500)
}