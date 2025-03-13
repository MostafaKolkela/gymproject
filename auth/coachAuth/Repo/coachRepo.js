import User from "../../../user/model/userModel.js";
import Coach from "../../coachAuth/Model/coachModel.js";
export const findUser = async (email) => {
    return await User.findOne(email).select('-password -__v -role');
}

export const saveuser = async(userData)=>{
    const newuser = new User(userData)
    return await newuser.save()
}

export const savecoach = async (chachdata) => {
    const newCoach = new Coach(chachdata);
    return await newCoach.save();
}