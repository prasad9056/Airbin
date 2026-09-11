const express=require('express');
const router=express.Router();

//index-users
app.get('/users',(req,res)=>{

    res.send("GET for users");
});

//show-users
app.get('/users/:id',(req,res)=>{
    res.send("GET for user id");
});


//POST-users
app.post('/users/:id',(req,res)=>{
    res.send("POST for user");
});


//Delete-users
app.delete('/users/:id',(req,res)=>{
    res.send("DELETE for post id");
});