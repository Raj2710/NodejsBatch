const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let hashPassword  = async(password)=>{
    let salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS))
    let hash = await bcrypt.hash(password,salt)
    return hash
}

let hashCompare = async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
}

let createToken = async(data)=>{
    console.log(process.env.JWTSECRETKEY)
    let token = await jwt.sign(
        data,process.env.JWTSECRETKEY,{expiresIn:'1m'})
    return token
}

let decodeToken = async(token)=>{
    let payload =  await jwt.decode(token)
    return payload
}

let validate = async(req,res,next)=>{
    let token = req.headers.authorization?req.headers.authorization.split(" ")[1]:undefined;
    if(token!==undefined)
    {
        let data = await decodeToken(token)
        let currentTime = Math.round(Date.now()/1000)
        if(data.exp && currentTime<=data.exp)
            next()
        else
            res.send({statusCode:400,message:"Token Expired"})
    }
    else
        res.send({statusCode:400,message:"Invalid or Missing Token"})
}

let roleAdmin = async(req,res,next)=>{
    let token = req.headers.authorization?req.headers.authorization.split(" ")[1]:undefined;
    if(token!==undefined)
    {
        let data = await decodeToken(token)
        if(data.role && data.role==='admin')
            next()
        else
            res.send({statusCode:401,message:"Only Admin can access this."})
    }
    else
        res.send({statusCode:400,message:"Invalid or Missing Token"})
}


module.exports={hashPassword,hashCompare,createToken,decodeToken,validate,roleAdmin}