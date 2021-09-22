// npm init -y
// npm install express
// npm i nodemon -g
const express = require('express');

// server creation
const app=express();
let port='8080'
app.listen(port,function(){
    console.log(`server is listening on port ${port}`);
});

// types of request ->  get post put delete

app.get('/',(req,res)=>{
    console.log(req.hostname);
    console.log(req.path);
    console.log(req.method);
    console.log("hello from home");
    res.send('<h3>hello from backend</h3>');
})

let obj={
    'name' :'user 1'
}

app.get('/user',(req,res)=>{
    res.send(obj); 
    // res.json(obj);
});

app.get('/home',(req,res)=>{
    console.log(__dirname);
    res.sendFile('/views/index.html',{root:__dirname});
    // res.sendFile('/Users/Unknown/OneDrive/Desktop/BackEnd/Food_app/views/index.html')
});
