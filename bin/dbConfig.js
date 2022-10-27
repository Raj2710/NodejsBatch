const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const dbName = process.env.DBNAME
const dbUrl = `${process.env.DBURL}/${dbName}`

module.exports = {mongodb,MongoClient,dbName,dbUrl}