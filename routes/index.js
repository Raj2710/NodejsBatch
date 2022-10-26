var express = require('express');
var router = express.Router();
const {LoanRequest,Resolution,mongoose} = require('../dbSchema')
const {mongodb,MongoClient,dbName,dbUrl} = require('../dbConfig');

mongoose.connect(dbUrl)

router.get('/request',async(req,res)=>{
  try {
    let leads = await LoanRequest.find()
    res.send({statusCode:200,leads})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})

router.get('/request/:id',async(req,res)=>{
  try {
    let lead = await LoanRequest.findOne({_id:mongodb.ObjectId(req.params.id)})
    if(lead)
      res.send({statusCode:200,lead})
    else
      res.send({statusCode:400,message:"Invalid ID"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})

router.post('/request',async(req,res)=>{
  try {
    let lead = await LoanRequest.create(req.body)
    res.send({statusCode:200,message:"Request Saved Successfully"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})


router.put('/request/:id',async(req,res)=>{
  try {
    let lead = await LoanRequest.replaceOne({_id:mongodb.ObjectId(req.params.id)},req.body,{runValidators:true})
    // let lead = await LoanRequest.findOne({_id:mongodb.ObjectId(req.params.id)})
    // lead.name = req.body.name
    // lead.email = req.body.email
    // lead.amount = req.body.amount
    // lead.purpose = req.body.purpose

    // await lead.save()
    res.send({statusCode:200,message:"Request Edited Successfully"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})

router.delete('/request/:id',async(req,res)=>{
  try {
    let lead = await LoanRequest.deleteOne({_id:mongodb.ObjectId(req.params.id)})
    if(lead.deletedCount)
      res.send({statusCode:200,message:"Lead Deleted Successfully"})
    else
      res.send({statusCode:400,message:"Invalid ID"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})

router.get('/resolution',async(req,res)=>{

  try {
    let lead = await Resolution.find()
    res.send({statusCode:200,lead})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})

router.post('/resolution',async(req,res)=>{
  try {
    let lead = await Resolution.create(req.body)
    res.send({statusCode:200,message:"Request Saved Successfully"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})

router.put('/change-status/:id',async(req,res)=>{
  try {
    let lead = await Resolution.findOne({_id:mongodb.ObjectId(req.params.id)})
    lead.status = lead.status==="Accepted"?"Rejected":"Accepted"
    await lead.save()
    res.send({statusCode:200,message:"Status Changed Successfully"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})

router.get('/report',async(req,res)=>{
  try {
    let resolution = await Resolution.find()

   let myPromise = new Promise(async(resolve,reject)=>{
    let data = []
    for(e of resolution){
      let leadsData = await LoanRequest.findOne({_id:mongodb.ObjectId(e.leadId)})
      data.push({
        name:leadsData.name,
        amount:leadsData.amount,
        quotedAmount:e.quotedAmount,
        status:e.status
      })
    }
    if(data.length)
      resolve(data)
    else
      reject("Empty Data")
  })

   myPromise.then((value)=>{res.send({statusCode:200,reportData:value})})
            .catch((error)=>console.log(error))
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error",error})
  }
})
module.exports = router;