const bcrypt = require('bcryptjs')
const SALTROUNDS = 10

let hashPassword  = async(password)=>{
    let salt = await bcrypt.genSalt(SALTROUNDS)
    let hash = await bcrypt.hash(password,salt)
    return hash
}

let hashCompare = async(password,hashedPassword)=>{
    console.log(password,hashedPassword)
    return await bcrypt.compare(password,hashedPassword)
}


module.exports={hashPassword,hashCompare}