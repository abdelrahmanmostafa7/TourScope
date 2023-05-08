import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js"
import nodemailer from "nodemailer";
import Hotel from "../models/hotel.model.js";

// user signup with username and password
export const signup = async (req,res,next)=>{
    try{
        const hash = bcrypt.hashSync(req.body.password , 5)
        const newUser = new User({
            ...req.body,
            password:hash,
        })
        await newUser.save()
        const {password ,role, ...info} = newUser._doc
        res.status(201).send(info)

    }catch(err){
        next(err)
    }
}

// user  login with username and password
export const signin =async (req,res,next)=>{
    try{
        // check if user exists
        const user = await User.findOne({email : req.body.email})
        
        if(!user) return next(createError(404,"Email or password is wrong!"))

        // check if password is correct
        const isCorrect = bcrypt.compareSync(req.body.password , user.password)
        if(!isCorrect) return next(createError(404,"Email or password is wrong!"))

        if (user.role !== "user"){
            const hotel = await Hotel.findOne({admin:user._id})
            const token = jwt.sign({
                id: user._id,
                role:user.role,
                hotel_id:hotel._id
            },process.env.JWT_KEY)
            const {password ,role, ...info} = user._doc            
            res.cookie("accessToken", token,{httpOnly:true})
            res.status(200).send(info)
            
        }else{
            const token = jwt.sign({
                id: user._id,
                role:user.role,
            },
            process.env.JWT_KEY)
            const {password ,role, ...info} = user._doc
            
            res.cookie("accessToken", token,{httpOnly:true})
            res.status(200).send(info)
        }
        
       
      
    }catch(err){
        next(err)
    }
    
}

export const signout = (req,res)=>{
    res
    .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    })
    .status(200)
    .send("User has been logged out.");
}

export const  socialtoken = async (req, res) => {
    res.cookie("accessToken", req.user.token, 
    {httpOnly:true});
    res.redirect("http://localhost:5173/");
}

export const send_forget_passowrd_otp = async (req,res,next)=>{
const {email} = req.body;
const user = await User.findOne({email:email})

if(!user)
return next(createError(404,"Email is not found!"));
const token = Math.random().toString(36).substring(2,8);
user.resetpasswordtoken = token;
user.resetpasswordexpire = Date.now() + 3600000; // 1 hour
await user.save();

let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: 'tourscope.team@gmail.com',
        pass: 'TOURteam23'
    }
});
const mailOptions = {
    from: '<tourscope.team@gmail.com>',
    to: email,
    subject: "Reset Password",
    text: `Click on this link to reset your password: http://localhost:5173/reset-password/${token}`
};
await transporter.sendMail(mailOptions, (err, info) => {
    console.log(email)
    if (err) {
        console.log(err);
    } 
});
res.status(200).send("Link has been sent to your email!");
}
export const confirm_otp = async (req,res,next)=>{
    const {token, password} = req.body;
    const user = await User.findOne({resetpasswordtoken:token})
    if(!user)
    return next(createError(404,"Token expired!"));
    if (user.resetpasswordexpire < Date.now()) {
        return next(createError(404,"Token expired!"));
    }
    const hash = bcrypt.hashSync(password , 5)
    const isCorrect = bcrypt.compareSync(password , user.password)
    if(isCorrect){
        return next(createError(404,"New password cannot be same as old password!"));
    }
    user.password = hash;
    user.resetpasswordtoken = undefined;
    user.resetpasswordexpire = undefined;
    await user.save();
    res.status(200).send("Password has been changed!");
    

}



