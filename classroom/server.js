const express=require('express');
const app=express();

app.get("/",(req,res)=>{
    res.send("Hello World");
});

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

//Posts
//index
app.get('/posts',(req,res)=>{
    res.send("GET for posts");
});

//show
app.get('/posts/:id',(req,res)=>{
    res.send("GET for post id");
});


//POST
app.post('/posts/:id',(req,res)=>{
    res.send("POST for post");
});


//Delete
app.delete('/posts/:id',(req,res)=>{
    res.send("DELETE for post id");
});

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})