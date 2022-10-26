const mongoose = require('mongoose')
const validator = require('validator')

const  UserRole = {
    ADMIN:'admin',
    STUDENT:'student'
}

const UserSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,lowercase:true,validate:(value)=>{return validator.isEmail(value)}},
    password:{type:String,required:true},
    role:{type:String,default:UserRole.STUDENT},
    createdAt:{type:String,default:Date.now()}
},{versionKey:false,collection:'users'})

const UserModel = mongoose.model('users',UserSchema)

module.exports = {UserModel,UserRole}