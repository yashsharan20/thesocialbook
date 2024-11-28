import express from "express";
import { getAdminQuiz, getQuizById, getuserquiz, getuserquizall, postQuiz, updatecount, updateQuiz } from "../controllers/question.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload } from "../middlewares/multer.js";
const router = express.Router()

router.route("/post").post(isAuthenticated,multipleUpload,postQuiz)
router.route("/get").get(getAdminQuiz)
router.route("/get/:id").get(isAuthenticated,getQuizById)
router.route("/update/:id").put(isAuthenticated,multipleUpload,updateQuiz)
router.route("/getuserquiz").get(isAuthenticated,getuserquiz)
router.route("/getuserquizall").get(getuserquizall)
router.route('/updatecount/:id').put(isAuthenticated,updatecount)

export default router