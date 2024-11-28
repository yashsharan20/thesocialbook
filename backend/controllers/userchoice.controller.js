import { Userchoice } from "../models/userchoice.model.js";
import { User } from "../models/user.model.js";
import { Question } from "../models/question.model.js";
export const add = async (req, res) => {
    try {
        const userId = req.id
        const { id, userchoice } = req.params;

        const newUserChoice = new Userchoice({
            userid: userId,
            quizid: id,
            selectedoption: userchoice,
        });

        await newUserChoice.save();

        const quiz = await Question.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found", success: false })
        }

        let updateCount = {};
        if (userchoice === 'a') {
            updateCount.imagea_count = (quiz.imagea_count || 0) + 1;
        }
        else if (userchoice === 'b') {
            updateCount.imageb_count = (quiz.imageb_count || 0) + 1;
        }
        else {
            return res.status(400).json({ message: "Invalid option selected", success: false })
        }
        const updatedQuiz = await Question.findByIdAndUpdate(id, updateCount, { new: true });

        if (!updatedQuiz) {
            return res.status(500).json({
                message: "Error updating quiz",
                success: false
            })
        }

        return res.status(200).json({
            message: 'your choice recorded successfully',
            success: true
        })
    } catch (error) {
        console.error(error);

    }
}

export const getMatchingUsers = async (req, res) => {
    try {
        const loginUserChoices = await Userchoice.find({ userid: req.id });
        const loginUserQuizMap = new Map(
            loginUserChoices.map(choice => [choice.quizid.toString(), choice.selectedoption])
        );

        const otherUsers = await Userchoice.distinct("userid", { userid: { $ne: req.id } });

        const userMatches = await Promise.all(
            otherUsers.map(async (userid) => {
                const userChoices = await Userchoice.find({ userid });
                let totalQuestions = userChoices.length;
                let matchingChoices = userChoices.filter(choice =>
                    loginUserQuizMap.get(choice.quizid.toString()) === choice.selectedoption
                ).length;

                const matchPercentage = totalQuestions > 0 ? (matchingChoices / totalQuestions) * 100 : 0;
                const userDetails = await User.findById(userid).select("fullname email gender");
                return { user: userDetails, matchPercentage };
            })
        );

        userMatches.sort((a, b) => b.matchPercentage - a.matchPercentage)
        res.status(200).json({
            success: true,
            userMatches
        });
    } catch (error) {
        console.error("Error matching users:", error);
        res.status(500).json({ error: "An error occurred while matching users." });
    }
}

export const getquizbyuserid = async (req,res) =>
{
  try {
   
    const {userid} = req.params;

    const userchoice = await Userchoice.find({userid}).populate({
        'path':'quizid'
    }).populate({
        'path':'userid'
    })
    return res.status(200).json({
        userchoice,
        success:true
    })
  } catch (error) {
    console.log(error)
  }
}
