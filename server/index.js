const express = require('express')
const mysql = require('mysql')
var bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const db = mysql.createConnection(
    {
        user:'root',
        host:'35.201.25.182',
        password:'kki12345',
        database:'health-block-dev'
    }
);

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions))

var jsonParser = bodyParser.json()

app.get("/",(req,res) => {
    res.json({
        data:"secret data"
    })
})

app.post('/create',jsonParser,(req,res) => {
    console.log("the body is", req.body.public_address)
    const public_address = req.body.public_address;
    db.query("INSERT INTO Patient (public_address) VALUES (?)",[public_address],(err,result)=>{
        if(err){
            console.log(err);
        }else {
            res.send(" successfully added")
        }
    });

})

app.listen(3001,()=>{
    console.log("yay i am working")
})

