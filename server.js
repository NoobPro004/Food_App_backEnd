const express=require('express');

const app=express();
// const router=express.Router();
app.listen('5000',function(){
    console.log("server listening on port 5000");
});

app.use(express.json());

app.use((req,res,next)=>{
    // do some work
    console.log('I am a middleware');

    next();

});


app.use(express.static('public'));

const userRouter=express.Router();
const authRouter=express.Router();

app.use((req,res,next)=>{
    // do some work
    console.log('I am 2nd middleware');

    next();

});

app.use('/user',userRouter);
app.use('/auth',authRouter);

app.use((req,res,next)=>{
    // do some work
    console.log('I am 3rd middleware');

    next();

});
// mounting in express
userRouter
.route('/')
.get(getUser)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);


// userRouter
// .route('/:id')
// .get(getUserById);

authRouter
.route('/signup')
.post(signupUser);


authRouter
.route('/forgetPassword')
.get(getforgetPassword)
.post(postforgetPassword,validateEmail);

function getforgetPassword(req,res){
    res.sendFile('/public/forgetPassword.html',{root:__dirname});
}

function postforgetPassword(req,res,next){
    let data=req.body;
    console.log(data);
    // check if email id is correct - validate
    next();
    // check if user exists in db 
    
}


function validateEmail(req,res){
    console.log('in validateEmail function');
    console.log(req.body);
    // how to check if email is correct or not ->  @ , .
    res.json({
        message : 'data received',
        data : req.body
    })
}
// redirects
app.get('/user-all',(req,res)=>{
    res.redirect('/user');
})


// 404 page
app.use((req,res)=>{
    res.sendFile('public/404.html',{root:__dirname});
})



// *****************************************Functions******************

let user=[];
// get request
// client <- server
// crud -> create read update delete

app.get('/',(req,res)=>{
    res.send('Home Page');
});

// app.get('/user',getUser);

function getUser(req,res){
    console.log('getUser called');
    res.json(user);
}



// post request 
//  client -> server
function createUser(req,res){
    user=req.body;
    console.log(user);
    res.send('data has been added succesfully');
};

// app.post('/user',createUser);

// patch ->  update
// app.patch('/user',updateUser);

function updateUser(req,res){
    let obj=req.body;
    for(let key in obj){
        user[key]=obj[key];
    };
    res.json(user);
}

// dlete -> delete data
// app.delete('/user',deleteUser);

function deleteUser(req,res){
    user={};
    res.json(user);
}

// param route
// app.get('/user/:id',getUserById);


function getUserById(req,res){
    console.log(req.params);
    res.send(req.params.id);
}


function signupUser(req,res){
    // let userDetails=req.body;
    // let name=userDetails.name;
    // let email=userDetails.email;
    // let password=userDetails.password;

    let {email,name,password}=req.body;

    user.push({email,name,password});
    console.log('user',req.body);
    // console.log(user);
    res.json({
        message:'user signedup',
        user:req.body
    })
}


