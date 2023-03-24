//connection Node with the ML model in python 
// const asyncio = require("asy")
const http = require('http')
const ejs = require('ejs')
const {get_crop} = require('./result')
const express = require('express')
const app = express();
const path = require('path')
const {spawn} = require('child_process');
const { assert } = require('console');
const port = process.env.PORT | 4100 

const server = http.createServer(app)


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.set('view engine','ejs')//set a view-engine that can be use to generate the web-templates 
app.set('views',path.join(__dirname,'views'))

app.post('/getcrop',(req,res)=>{
    // const N = Number(req.body.N)
    // const P = Number(req.body.P)
    // const K = Number(req.body.K)
    // const Ph = Number(req.body.Ph)
    // const T = Number(req.body.T)
    // var arr = [N,P,K,Ph,T]
    const data = req.body.arr 
    var numberArray = data.reduce( (acc, x ) => acc.concat(+x), [])
    get_crop(numberArray).then((data)=>
    {
        var crop = data 
        console.log(crop)

        res.send(crop)
      })
   
})





app.get('/',(req,res)=>{
    res.render('index')})


server.listen(port,()=>
{
    console.log(`http://localhost:${port}`)
})


