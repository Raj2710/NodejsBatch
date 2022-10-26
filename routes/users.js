var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const {UserModel,UserRole} = require('../bin/Schema/UserSchema')
const {mongodb,dbUrl} = require('../bin/dbConfig')
const {hashPassword,hashCompare} = require('../bin/Auth')

mongoose.connect(dbUrl)

router.post('/signup',async(req,res)=>{
  try {
    let user = await UserModel.find({email:req.body.email})
    if(!user.length)
    {
      //hashing of password 
      let hashedPassword = await hashPassword(req.body.password)
      req.body.password = hashedPassword;

      let createUser = await UserModel.create(req.body)
      res.send({statusCode:200,message:"Signup Successfull!"})
    }
    else
      res.send({statusCode:400,message:"Email Already Exists"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
})

router.post('/login',async(req,res)=>{
  try {
    let user = await UserModel.findOne({email:req.body.email})
    if(user)
    {
      //hashing of password
      let compare = await hashCompare(req.body.password,user.password)
      if(compare)
        res.send({statusCode:200,message:"Login Successfull!"})
      else
        res.send({statusCode:401,message:"Invalid Credentials"})
    }
    else
      res.send({statusCode:400,message:"Email Does not exists"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
})
module.exports = router;
