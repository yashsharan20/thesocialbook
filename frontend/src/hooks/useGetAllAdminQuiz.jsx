import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import { QUIZ_API_ENDPOINT } from '@/utils/constant'
import { setAllAdminQuiz } from '@/redux/quizSlice'


const useGetAllAdminQuiz = () =>
{
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAllAdminQuiz = async () =>
        {
            try {
                const res = await axios.get(`${QUIZ_API_ENDPOINT}/get`,{withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setAllAdminQuiz(res.data.quiz))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllAdminQuiz()
    },[])
}
export default useGetAllAdminQuiz