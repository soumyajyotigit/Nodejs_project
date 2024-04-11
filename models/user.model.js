const mongoose=require("mongoose");
const { Schema}=mongoose;
const uniqueValidator=require ("mongoose-unique-validator");

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

userSchema.set("toJSON",{
    transform:(document,returnObject)=>{
        returnObject.id=returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.password;
    },
});

userSchema.plugin(uniqueValidator, {message: "Email already in use."});

const User = mongoose.model("user", userSchema);
module.exports=User;