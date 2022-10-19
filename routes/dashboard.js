var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.send({
        statusCode:200,
        message:"Welcome to Dashboard Route"
    })
})

module.exports = router