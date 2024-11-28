import { setAllUserQuiz } from "@/redux/quizSlice";
import { QUIZ_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useGetAllUserQuiz = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchAllUserQuiz = async () =>
        {
            try {
                const res = await axios.get(`${QUIZ_API_ENDPOINT}getuserquiz`,{withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setAllUserQuiz(res.data.quiz))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllUserQuiz()
    },[dispatch])
}
export default useGetAllUserQuiz