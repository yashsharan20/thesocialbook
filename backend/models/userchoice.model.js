import mongoose from "mongoose";

const userchoiceSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',required:true
    },
    quizid:{
        type:mongoose.Schema.Types.ObjectId,ref:'Question',required:true
    },
    selectedoption:{
        type:String,
        enum:['a','b'],
        required:true
    }

},{timestamps:true})

export const Userchoice = mongoose.model('Userchoice',userchoiceSchema)