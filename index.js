const express = require('express')
const PORT = 8000
const app = express()
const jsonParser = express.json()
app.use(jsonParser)

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

app.get('/',(req,res)=>{
    res.send({
        statusCode:200,
        data
    })
})

app.get('/:id',(req,res)=>{ 

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

app.post('/',(req,res)=>{
    data.push(req.body)
    res.send({
        statusCode:200,
        message:"User Added Successfully!",
        data
    })
})

app.put('/:id',(req,res)=>{
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

app.delete('/:id',(req,res)=>{
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

app.listen(PORT,()=>{
    console.log("Server is listening "+PORT)
})