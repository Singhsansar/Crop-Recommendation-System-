//connection Node with the ML model in python 

const express = require('express')
const app = express();
const path = require('path')
const {spawn} = require('child_process');
const { assert } = require('console');
const py = spawn('python3',['trained.py',[23,2,96,4,36]])
const port = process.env.PORT | 3000 

py.stdout.on('data',(data)=>
{
    console.log(`${data.toString()}`)
    mystr = data.toString() 
    myjson = JSON.parse(mystr)
    console.log(myjson.Data)
    
})


// app.get('/',(req,res)=>
// {
//     res.send("hello singh")
   
// })


// app.listen(port,()=>
// {
//     console.log(`http://localhost:${port}`)
// })