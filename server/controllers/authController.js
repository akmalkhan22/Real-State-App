import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'

export const register = async( req, res) =>{
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
}


export const login = (req, res) =>{
    console.log('login clicked')
}


export const logout = (req, res) =>{

}