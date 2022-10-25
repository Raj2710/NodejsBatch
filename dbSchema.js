const mongoose = require('mongoose')
const validator = require('validator')

const loanRequestSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{
        type:String,
        required:true,
        lowercase:true,
        validate:(value)=>{
            return validator.isEmail(value)
        }
    },
    mobile:{type:String,default:"000-000-0000"},
    amount:{type:Number,required:true},
    purpose:{type:String,default:'Personal-Loan'},
    createdAt:{type:Date,default:Date.now()}
},{versionKey:false,collection:'leads'})


const resolutionSchema = new mongoose.Schema({
   
    leadId:{type:String,required:true},
    quotedAmount:{type:Number,required:true},
    status:{type:String,required:true},
    reasonOfRejection:{type:String},
    createdAt:{type:Date,default:Date.now()}
},{versionKey:false,collection:'resolution'})

const LoanRequest = mongoose.model('leads',loanRequestSchema)
const Resolution = mongoose.model('resolution',resolutionSchema)

module.exports = {LoanRequest,Resolution,mongoose}

