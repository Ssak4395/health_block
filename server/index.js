const express = require('express')
const mysql = require('mysql')
var bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const db = mysql.createConnection(
    {
        user:'root',
        host:'localhost',
        password:'kki12345',
        database:'health_block'
    }
);


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.get("/",(req,res) => {
    res.json({
        data:"Return Test Data"
    })
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/add',(req,res) => {
    console.log("the body is", req.body.public_address)
    const public_address = req.body.public_address;


    db.query("INSERT INTO users  (public_address) VALUES (?)",[public_address],(err,result)=>{
        if(err){
            if(err.errno === 1062){
                res.send("500");
            }
        }else {
            res.send("200")
        }
    });

})


app.post("/submit-details",(req,res) => {

    db.query("UPDATE users SET first_name = ?, last_name = ? ,address = ? ,date = ?,ihi_number=?,gender=? WHERE public_address=?",[req.body.first_name,req.body.last_name,req.body.address,req.body.date,req.body.ihi,req.body.gender,req.body.public_address],(err,result) => {
        if(err)
        {
            console.log(err)
            res.send(err)
        }else{
            res.json({
                status:200,
                timestamp:Date.now(),
                result:result
            })
        }
    } );
})



app.get("/search",(req,res) => {
    const public_address = req.query.address;
    var resultArray = [];
    console.log("Searching to check if" + public_address + " exists in database" );
    db.query("SELECT public_address FROM users WHERE public_address= ?",[public_address], (err, result) => {
        if(err)
        {
            res.send(err)
        }
        else{
            console.log("Successfully passed.")
           res.json({
               status:true,
               timestamp:Date.now(),
               result:result
           })
        }
    })
})

app.get("/all-user-addresses",(req,res)=>{
    db.query("SELECT public_address,first_name,last_name FROM users",(err,result)=>{
        if (err) {
            res.send(err);
        } else {


            res.json({
                result: result
            })
        }
    })
})

app.get("/get-user",(req,res)=>{
    const public_address = req.query.address;
    console.log("the public address is", public_address)
    db.query("SELECT first_name,last_name,approved_users FROM users WHERE public_address=?",[public_address],((err,result)=>{
        if(err){
            res.send(err)
        }else{
            console.log(result[0].approved_users)
            res.json({
                approved_users: result[0].approved_users,
                first_name: result[0].first_name,
                last_name: result[0].last_name

            });
        }
    }))
})


app.post("/submit-approve",(req,res)=>{
    console.log("the request body is", req.body)
    db.query("UPDATE users SET approved_users=? WHERE public_address=?",[req.body.approve,req.body.address],(err,result)=>{
        if(err){
           res.send(err)
        }else {
            console.log("the result is", result)
            res.send(result);
        }
    });
})

app.get("/approve-list",(req,res) => {
    console.log("code reached here")
    const public_address = req.query.address;
    console.log("The public address is", public_address)
    db.query("SELECT approved_users FROM users WHERE public_address=?",[public_address],(err,result)=> {
        if(err){
            console.log("The error is", err)
            res.send(err);
        }else{
            console.log(result[0].approved_users)
            res.send(result[0].approved_users);
        }
    })
})

app.listen(3001,()=>{
    console.log("yay i am working")
})

