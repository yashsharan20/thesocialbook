import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile:{
        bio:{type:String,},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    },
    choices:[
        {
            quiz_id:{type:mongoose.Schema.Types.ObjectId,ref:'Question',required:true},
            selected_image:{type:String,required:true}
        }
    ]   
},{timestamps:true})

export const User = mongoose.model('User',userSchema)