import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question_text:{
        type:String,
        required:true,
        unique:true
    },
    imageA:{
        type:String,
    },
    imagea_text:{
        type:String,
        required:true
    },
    imagea_count:{
        type:Number,
        default:0
    },
    imageb_text:{
        type:String,
        required:true
    },
    imageb_count:
    {
        type:Number,
        default:0
    },
    imageB:{
        type:String,
    }
},{timestamps:true})

export const Question = mongoose.model("Question",questionSchema)