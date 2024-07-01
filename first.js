const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app=express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extented:true
}));
mongoose.connect('mongodb://localhost:27017/building',{
    useNewUrlparser:true,
    useUnifiedTopology:true
});
var db=mongoose.connection;

db.on('error',()=> console.log("error"));
db.once('open',()=> console.log("connected"));

app.post("/userinfo",(req,res)=>{
    var firstname= req.body.firstname;
    var lastname= req.body.lastname;
    var mail= req.body.mail;
    var inputState= req.body.inputState;
    var age= req.body.age;
    var address= req.body.address;
    var msg= req.body.msg;
    var data ={
        "firstname": firstname,
        "lastname": lastname,
        "mail": mail,
        "inputState": inputState,
        "age": age,
        "address": address,
        "msg": msg,

    };
   
    db.collection('clientinfo').insertOne(data, (err, collection) =>{
        if(err){
            console.error("Error inserting record:", err);
            return res.status(500).send("Error inserting record");
        }
        console.log("Record Inserted Succesfully:", collection.insertedID);
        return res.redirect('confirm.html');
    });


});

app.get("/", (req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.redirect('index.html');
});

app.listen(7501, ()=>{
    console.log("Listening on PORT 7501")
});