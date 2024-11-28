import { setSingleQuiz } from "@/redux/quizSlice";
import { QUIZ_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetQuizById = (quizId) =>
{
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchSingleQuiz = async () =>
        {
            try {
                const res = await axios.get(`${QUIZ_API_ENDPOINT}/get/${quizId}`,{withCredentials:true})
                console.warn(res)
                if(res.data.success)
                {
                    dispatch(setSingleQuiz(res.data.quiz))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleQuiz()
    },[quizId])
}
export default useGetQuizById
