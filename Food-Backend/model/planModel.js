const mongoose=require('mongoose');
const validator=require('email-validator');

const {dbLink}=require('../secret');

mongoose
    .connect(dbLink)
    .then(function(){
        console.log("db has been connected");
    })
    .catch(function(err){
        console.log("err",err);
    })

    //mongoose -> data -> exact -> data -> that is required to form an entity 
//  data completness , data validation
// name ,email,password,confirmPassword-> min ,max,confirmPassword,required ,unique

const planSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,"kindly pass the name"],
    unique:[true,"plan name should be unique"],
    // errors
    maxlength:[40,"Your plan length is more than 40 character"],
},
duration :{
    type:Number,
    required:[true,"You need to provide duration"],
},
price:{
    type:Number,
    required:[true,"You need to provide price"],

},

discount:{
    type:Number,
    validate:{
        validator:function(){
            return this.discount<this.price;
        },
        message : "Discount must be less than price"
    },
},
planImages:{
    type:[String],
},
 // reviews, averagerating
 reviews: {
    //   array of object id 
    type: [mongoose.Schema.ObjectId],
    ref:"reviewModel"
},
averageRating: Number,

})

// model

let planModel=mongoose.model("PlanModel",planSchema);
module.exports=planModel;