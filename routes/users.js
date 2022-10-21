var express = require('express');
var router = express.Router();
const {mongodb,MongoClient,dbName,dbUrl} = require('../dbConfig')

const client = new MongoClient(dbUrl)

router.get('/all', async function(req, res) {
      await client.connect()
      try {
          const db = await client.db(dbName);
          // const usersCount = await db.collection('users').find().countDocuments()
          const users = await db.collection('users').find().toArray()
          res.send({statusCode:200,usersCount:users.length,users})
      } catch (error) {
        console.log(error)
        res.send({statusCode:500,message:"Internal Server Error"})
      }
      finally
      {
        client.close()
      }
}); 

router.get('/fees', async function(req, res) {
  await client.connect()
  try {
      const db = await client.db(dbName);
      const users = await db.collection('users').find().project({fees:1}).toArray()
     
      let sum = users.reduce((accumulator,current)=>{
        return accumulator+current.fees
      },0)

      console.log(sum)
      res.send({statusCode:200,usersCount:users.length,totalFee:sum})
  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
  finally
  {
    client.close()
  }
}); 



router.post('/add-user', async (req, res)=> {
  await client.connect()
  try {
      const db = await client.db(dbName);
      
      let users = await db.collection('users').findOne({email:req.body.email})
      if(!users)
      {
        const user = await db.collection('users').insertOne(req.body)
        res.send({statusCode:200,message:"User Created Successfully"})
      }
      else
      {
        res.send({statusCode:400,message:"User Already Exists"})
      }

  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
  finally
  {
    client.close()
  }
}); 

router.put('/edit-user/:id', async (req, res)=> {
  await client.connect()
  try {
      const db = await client.db(dbName);
      let users = await db.collection('users').findOne({_id:mongodb.ObjectId(req.params.id)})
      if(users)
      {
        const user = await db.collection('users').updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})
        res.send({statusCode:200,message:"User Edited Successfully"})
      }
      else
      {
        res.send({statusCode:400,message:"Invalid ID"})
      }

  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
  finally
  {
    client.close()
  }
}); 


router.delete('/delete-user/:id', async (req, res)=> {
  await client.connect()
  try {
      const db = await client.db(dbName);
      let users = await db.collection('users').findOne({_id:mongodb.ObjectId(req.params.id)})
      if(users)
      {
        const user = await db.collection('users').deleteOne({_id:mongodb.ObjectId(req.params.id)})
        res.send({statusCode:200,message:"User Deleted Successfully"})
      }
      else
      {
        res.send({statusCode:400,message:"Invalid ID"})
      }

  } catch (error) {
    console.log(error)
    res.send({statusCode:500,message:"Internal Server Error"})
  }
  finally
  {
    client.close()
  }
}); 



module.exports = router;
