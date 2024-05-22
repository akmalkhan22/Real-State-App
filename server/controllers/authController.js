import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'


export const register = async( req, res) =>{
  try {
    const {username, email, password, avatar} = req.body
   
    const hashPassword = await bcrypt.hash(password, 10)
    
    const newUser = await prisma.user.create({
     data:{
         username,
         email,
         password:hashPassword,
         avatar
     }
    })
     const {password:userPass, ...userInfo} = newUser
    return res.status(200).json({userInfo, message:"User created successfully"});
  } catch (error) {
     res.status(501).json({message: error})
  }
}

//login
export const login = async(req, res) =>{
   try {
    const {username, password} = req.body
    console.log(username, password)
    const existingUser = await prisma.user.findUnique({where:{username}})
    if (!existingUser) return res.status(401).json({message: "Invalid Credentials"});
    
    const isMatch = await bcrypt.compare(password, existingUser.password)
    if(!isMatch) 
        return res.status(401).json({message:"Invalid Credentials"});
     
     const token =  jwt.sign({
        id:existingUser.id
     },process.env.JWT_SECRET)
    const age = 1000*60*60*24*7
    
    const{password:userPass, ...userInfo} = existingUser


    res.cookie('token', token,{
        httpOnly: true,
        // secure:true,
        maxAge:age
    }).status(200).json({userInfo, message:"Login successful"})
   } catch (error) {
     res.status(501).json({message:"Internal error ", error})
   }
}


export const logout = (req, res) =>{
   res.clearCookie('token').status(200).json({message: "Logout successful."});
}