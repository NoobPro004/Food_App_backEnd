const mongoose=require('mongoose');
const db=require('../secret.js');
const validator=require('email-validator');

mongoose.connect(db.link).then(function(db){
    // console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    age : {
        type:Number
    },

    email:{
        type : String,
        required:true,
        unique:true,
        validate:function(){
            return validator.validate(this.email);
        }
    },

    password:{
        type:String,
        required:true,
        min:8,
        unique:true
    },

    confirmPassword:{
        type:String,
        required:true,
        unique:true,
        min:8,

        validate : function(){
            return this.password==this.confirmPassword;
        }
    }

});

const userModel=mongoose.model('userModel',userSchema);

(async function createUser(){
    let user={
        name:"Himanshu",
        age:20,
        email:"abcd@gmail.com",
        password:'123456989',
        confirmPassword:'123456989'
    };

  let userObj= await userModel.create(user);

  console.log(userObj);
})();




