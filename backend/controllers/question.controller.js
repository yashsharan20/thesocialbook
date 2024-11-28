import mongoose from "mongoose";
import { Question } from "../models/question.model.js";
import { Userchoice } from "../models/userchoice.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const postQuiz = async (req,res) =>
{
    try {
        const {question_text,imagea_text,imageb_text} = req.body
        const {files} = req
        if(!question_text || !imagea_text || !imageb_text)
        {
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        
        if (!files) {
            return res.status(400).json({
              message: "Both images (ImageA and ImageB) are required",
              success: false,
            });
          }
        const imageaFile = files.fileA[0];
        const imagebFile = files.fileB[0];

        const imageaUri = getDataUri(imageaFile)
        const imagebUri = getDataUri(imagebFile)

        const cloudimageaResponse = await cloudinary.uploader.upload(imageaUri.content)
        const cloudimagebResponse = await cloudinary.uploader.upload(imagebUri.content)

        const imageA = cloudimageaResponse.secure_url
        const imageB = cloudimagebResponse.secure_url

        const quiz = await Question.create({
            question_text,imageA,imageB,imagea_text,imageb_text
        })
        return res.status(201).json({
            message:"New Quiz created successfully",
            success:true
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "An error occurred while creating the quiz.",
            success: false
        });
        
    }
}

export const getAdminQuiz = async (req,res) =>
{
    try {
        const quiz = await Question.find().sort({createdAt:-1});
        if(!quiz)
        {
            return res.status(404).json({
                message:"Quiz not found",
                success:false
            })
        }
        return res.status(200).json({
            quiz,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getuserquiz = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.id);
        const unselectedQuestions = await Question.aggregate([
            {
                $lookup: {
                    from: "userchoices", 
                    localField: "_id",   
                    foreignField: "quizid", 
                    as: "userChoices",  
                },
            },
            {
                $match: {
                    $or: [
                        { userChoices: { $eq: [] } },
                        {
                            $expr: {
                                $not: {
                                    $in: [userId, "$userChoices.userid"]
                                }
                            }
                        },
                    ],
                },
            },
            {
                $sort: { createdAt: -1 }, 
            },
        ]);

        

        res.status(200).json({
            success: true,
            message: "Unselected questions fetched successfully",
            quiz: unselectedQuestions,
        });
    } catch (error) {
        console.error("Error fetching unselected questions:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching unselected questions",
            error,
        });
    }
}

export const getuserquizall = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.id);
        const unselectedQuestions = await Question.aggregate([
            {
                $lookup: {
                    from: "userchoices", 
                    localField: "_id",   
                    foreignField: "quizid", 
                    as: "userChoices",  
                },
            },
            {
                $match: {
                    $or: [
                        { userChoices: { $eq: [] } },
                        {
                            $expr: {
                                $not: {
                                    $in: [userId, "$userChoices.userid"]
                                }
                            }
                        },
                    ],
                },
            },
            {
                $sort: { createdAt: -1 }, 
            },
        ]);

        

        res.status(200).json({
            success: true,
            message: "Unselected questions fetched successfully",
            quiz: unselectedQuestions,
        });
    } catch (error) {
        console.error("Error fetching unselected questions:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching unselected questions",
            error,
        });
    }
}

export const getQuizById = async (req,res) =>
{
    try {
        const quizId = req.params.id 
        const quiz = await Question.findById(quizId)
        if(!quiz)
        {
            return res.status(404).json({
                message:"Quiz Not Found",
                success:false
            })
        }
        return res.status(200).json({
            quiz,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateQuiz = async (req,res) =>
{
    try {
       
            const {question_text,imagea_text,imageb_text} = req.body
            const {files} = req
         
            let imageA = files.fileA?.[0];
            let imageB = files.fileB?.[0];
            if (files) {
                const imageaFile = files.fileA?.[0];
                const imagebFile = files.fileB?.[0];
    
                if (imageaFile) {
                    const imageaUri = getDataUri(imageaFile);
                    const cloudimageaResponse = await cloudinary.uploader.upload(imageaUri.content);
                    imageA = cloudimageaResponse.secure_url; 
                }
    
                if (imagebFile) {
                    const imagebUri = getDataUri(imagebFile);
                    const cloudimagebResponse = await cloudinary.uploader.upload(imagebUri.content);
                    imageB = cloudimagebResponse.secure_url; 
                }
            }
    
            const updatedData = {question_text,imagea_text,imageb_text,imageA,imageB}
            const quiz = await Question.findByIdAndUpdate(req.params.id,updatedData,{new:true})
            if(!quiz)
            {
                return res.status(404).json({
                    message:"Quiz not found",
                    success:false
                })
            }
            return res.status(200).json({
                message:"Quiz Information Updated",
                success:false
            })
    } catch (error) {
      console.log(error)  
    }
    
}

export const updatecount = async (req,res) =>
{
    try {
            
    } catch (error) {
        console.log(error)
    }
}

