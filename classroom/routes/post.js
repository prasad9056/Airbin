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