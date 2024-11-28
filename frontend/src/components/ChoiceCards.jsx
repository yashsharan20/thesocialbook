import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import React from 'react'
import axios from 'axios';
import { useSelector, useStore } from 'react-redux';
import { toast } from 'sonner';
import { QUIZ_API_ENDPOINT, USERCHOICE_API_ENDPOINT } from '@/utils/constant';
import useGetAllUserQuiz from '@/hooks/useGetAllUserQuiz';
import { setAllUserQuiz } from '@/redux/quizSlice';

const ChoiceCards = ({ quiz }) => {


    return (
        <div
            className=""
        >
            <div className="my-4  grid grid-cols-2 ">

                {quiz?.quizid?.imageA && (
                    <div className="relative flex flex-col items-center">
                        <img
                            src={quiz?.quizid?.imageA}
                            alt={quiz?.quizid?.imagea_text}
                            className={`w-56 h-[100%] rounded-lg object-cover mb-2 shadow-md `}
                        />

                        {quiz.selectedoption === 'a' && (
                            <div className="absolute top-2 right-2 p-1 bg-green-500 rounded-full text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}


                        {quiz.selectedoption !== 'a' && (
                            <div className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        )}

                        <p className="text-center mt-4 font-medium text-sm">{quiz?.quizid?.imagea_text}</p>
                    </div>
                )}

                {quiz?.quizid?.imageB && (
                    <div className="relative flex flex-col items-center">
                        <img
                            src={quiz?.quizid?.imageB}
                            alt={quiz?.quizid?.imageb_text}
                            className={`w-56 h-[100%] rounded-lg object-cover mb-2 shadow-md `}
                        />

                        {quiz.selectedoption === 'b' && (
                            <div className="absolute top-2 right-2 p-1 bg-green-500 rounded-full text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}

                        {quiz.selectedoption !== 'b' && (
                            <div className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        )}

                        <p className="text-center mt-4 font-medium text-sm">{quiz?.quizid?.imageb_text}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ChoiceCards