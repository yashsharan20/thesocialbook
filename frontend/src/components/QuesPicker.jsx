import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LatestQuesCards from './LatestQuesCards'
import useGetAllUserQuiz from '@/hooks/useGetAllUserQuiz'
import { setAllUserQuiz } from '@/redux/quizSlice'
import axios from 'axios'
import { QUIZ_API_ENDPOINT } from '@/utils/constant'

const Quespicker = () => {
    const dispatch = useDispatch()

    const { allUserQuiz } = useSelector(store => store.quiz)
    const { user } = useSelector(store => store.auth)

    useEffect(() => {
        const fetchAllUserQuiz = async () => {
            try {
                const res = await axios.get(`${QUIZ_API_ENDPOINT}getuserquiz`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllUserQuiz(res.data.quiz))
                }
            } catch (error) {
                console.log(error)
            }
        }

        const fetchAllUserQuizAll = async () => {
            try {
                const res = await axios.get(`${QUIZ_API_ENDPOINT}getuserquizall`)

                if (res.data.success) {
                    dispatch(setAllUserQuiz(res.data.quiz))
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (user) {
            fetchAllUserQuiz()
        }
        else {
            fetchAllUserQuizAll()
        }

    }, [dispatch, allUserQuiz])


    return (
        <div className='max-w-xl px-5 text-center mx-auto my-20'>
            <span className="px-7 py-3 rounded-full text-white bg-[#3168c7] font-medium shadow-md">
                Choose Your Favourite
            </span>
            <div className='grid gap-4 my-5'>
                {
                    allUserQuiz && allUserQuiz.length > 0 ? (
                        allUserQuiz.slice(0, 1).map((item) => (
                            <LatestQuesCards key={item._id} quiz={item} />
                        ))
                    ) : (
                        <span className="text-center text-lg font-semibold text-white mt-10 p-10 border border-dashed rounded-md bg-[#3168c7]">
                            Stay Tuned! New Quizzes Coming Soon
                        </span>
                    )
                }
            </div>

        </div>
    )
}
export default Quespicker