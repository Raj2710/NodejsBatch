const PORT = 8000
//console.log("Hello Node")
//Packages
//1. Inbuilt Packages
//2. Third Party
//3. Custom Packages

//const os = require('os')

//console.log(os.totalmem())

const http = require('http')
const fs = require('fs')

let data = [
    {
        name:"Anusha"
    },
    {
        name:"Arjun"
    },
    {
        name:"Harshitha"
    },
    {
        name:"Meghana"
    },
    {
        name:"Ranjan"
    }
]

const server = http.createServer((req,res)=>{

    let date = new Date()
    let name = date.toString()
    fs.writeFileSync(`Date-Time/${name}.txt`,date.toString(),'utf8')

    //fs.appendFileSync(`Date-Time/${name}.txt`," and a Therapist",'utf8')
    
    fs.readFile(`Date-Time/${name}.txt`,'utf8',(err,data)=>{
        if(err)
         console.log(err)
        else
        {
            res.writeHead(200,{'Content-Type':'text/html'})
            res.end(data)
        }
    })
})  

server.listen(PORT,()=>console.log("Server is listening "+PORT))


//Create a file called Date-Time.txt
//Write the current date and time in the file 
//send the date written in the file as response.
//Each time when I hit the server from browser the time has to update on the file.