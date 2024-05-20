import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'

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
     
    return res.status(200).json({newUser, message:"User created successfully"});
  } catch (error) {
     res.status(501).json({message: error})
  }
}


export const login = async(req, res) =>{
   try {
    const {username, password} = req.body
    const existingUser = await prisma.user.findUnique({where:{username}})
    if (!existingUser) return res.status(401).json({message: "Invalid Credentials"});
    const isMatch = await bcrypt.compare(existingUser.password, password)
    if(!isMatch) 
        return res.status(401).json({message:"Invalid Credentials"});
   } catch (error) {
     res.status(501).json({message:"Internal error ", error})
   }
}


export const logout = (req, res) =>{

}