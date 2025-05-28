import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function saveUser(req,res){

const hashedPassword = bcrypt.hashSync(req.body.password,10)
const user = new User({
    email : req.body.email,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    password : hashedPassword
})
 user.save().then(()=>{
    res.json({
        message : " User saved successfully"
    })
 }).catch(()=>{
    res.status(500).json({
        message : "User not saved"
    })
 })
}

export function loginUser(req,res){

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email : email
    }).then((user)=>{
        if( user == null){
            res.status(404).json({
                message : " Invalid email"
            })
        }else{
            const isPasswordCorrect = bcrypt.compareSync( password, user.password)
            if(isPasswordCorrect){
              
                const userData = {
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    role : user.role,
                    phone : user.phone,
                    isDisabled : user.isDisabled,
                    isEmailVerified : user.isEmailVerified


                }

                const token = jwt.sign(userData,"random456")

                res.json({
                    message : "Login successful",
                    token : token,
                    user : userData
                });



            }else{
                res.status(403).json({
                    message :"Invalid password"
                })
            }
        }
    }
    )
}
export function isAdmin(req){
    if(req.user == null){
        return false
    }
    if(req.user.role != "admin"){
        return false
    }
    return true
}