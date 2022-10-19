var express = require('express');
var router = express.Router();

let data = [
  {
      name:"Nag",
      email:"nag@gmail.com",
      mobile:"1234567890",
      password:"Admin@123",
      role:"student"
  },
  {
      name:"Ranjan",
      email:"ranjan@gmail.com",
      mobile:"0987654321",
      password:"Admin@123",
      role:"student"
  }
]

router.get('/',(req,res)=>{
  res.send({
      statusCode:200,
      data
  })
})

router.get('/:id',(req,res)=>{ 

 if(req.params.id<data.length)
 {
      res.send({
          statusCode:200,
          user:data[req.params.id]
      })
 }
 else
 {
      res.send({
          statusCode:400,
          message:"User Does not exists"
      })
 }
})

router.post('/',(req,res)=>{
  data.push(req.body)
  res.send({
      statusCode:200,
      message:"User Added Successfully!",
      data
  })
})

router.put('/:id',(req,res)=>{
  if(req.params.id<data.length)
  {
      //splice(startIndex,delCount,replacingValue)
      data.splice(req.params.id,1,req.body)

      res.send({
          statusCode:200,
          message:"User Edited Successfully",
          data
      })
  }
  else
  {
      res.send({
          statusCode:400,
          message:"User Does not exists"
      })
  }
})

router.delete('/:id',(req,res)=>{
  if(req.params.id<data.length)
  {
      data.splice(req.params.id,1)
      res.send({
          statusCode:200,
          message:"User Deleted Successfully",
          data
      })
  }
  else
  {
      res.send({
          statusCode:400,
          message:"User Does not exists"
      })
  }
})

module.exports = router;
