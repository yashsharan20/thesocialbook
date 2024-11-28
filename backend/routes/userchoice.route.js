import express from "express"
import { add, getMatchingUsers, getquizbyuserid } from "../controllers/userchoice.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"

const router =  express.Router()

router.route("/add/:id/:userchoice").get(isAuthenticated,add)
router.route("/getsimilaruser").get(isAuthenticated,getMatchingUsers)
router.route('/getquizbyuserid/:userid').get(isAuthenticated,getquizbyuserid)

export default router