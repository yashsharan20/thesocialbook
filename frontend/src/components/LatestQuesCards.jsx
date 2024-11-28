import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import React from 'react'
import axios from 'axios';
import { useSelector, useStore } from 'react-redux';
import { toast } from 'sonner';
import { QUIZ_API_ENDPOINT, USERCHOICE_API_ENDPOINT } from '@/utils/constant';
import useGetAllUserQuiz from '@/hooks/useGetAllUserQuiz';
import { setAllUserQuiz } from '@/redux/quizSlice';

const LatestQuesCards = ({ quiz }) => {
    const navigate = useNavigate();
  
    const handleChoice = async (quizId, choice) => {
      try {
        const res = await axios.get(
          `${USERCHOICE_API_ENDPOINT}/add/${quizId}/${choice}`,
          { withCredentials: true }
        );
        toast.success(res.data.message,{
          style: {
            color: '#3168c7',
          },
        });
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "An error occurred",{
          style: {
            color: '#3168c7',
          },
        });
      }
    };
  
    return (
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 px-4">
        {quiz?.imageA && (
          <div className="flex flex-col items-center">
            <img
              src={quiz.imageA}
              alt={quiz.imagea_text}
              onClick={() => handleChoice(quiz?._id, "a")}
              className="w-full md:w-56 h-auto md:h-64 cursor-pointer rounded-lg object-cover mb-2 shadow-md"
            />
            <p className="text-center font-medium text-sm mb-2">{quiz?.imagea_text}</p>
            <div className="relative mt-4 w-full md:w-44 h-2 bg-gray-300 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-500 rounded-full"
                style={{
                  backgroundColor:
                    (quiz?.imagea_count || 0) / (quiz?.imagea_count + quiz?.imageb_count) >=
                    (quiz?.imageb_count || 0) / (quiz?.imagea_count + quiz?.imageb_count)
                      ? "#22c55e"
                      : "#ef4444",
                  width: `${((quiz?.imagea_count || 0) /
                    (quiz?.imagea_count + quiz?.imageb_count)) *
                    100}%`,
                }}
              ></div>
            </div>
            <p className="text-center px-5 mt-2 text-xs text-gray-500 ">
              Chosen by{" "}
              {Math.round(
                ((quiz?.imagea_count || 0) /
                  ((quiz?.imagea_count || 0) + (quiz?.imageb_count || 0))) *
                  100
              ) || 0}
              % users
            </p>
          </div>
        )}
  
        {quiz?.imageB && (
          <div className="flex flex-col items-center">
            <img
              src={quiz.imageB}
              alt={quiz.imageb_text}
              onClick={() => handleChoice(quiz?._id, "b")}
              className="w-full md:w-56 h-auto md:h-64 cursor-pointer rounded-lg object-cover mb-2 shadow-md"
            />
            <p className="text-center font-medium text-sm mb-2">{quiz?.imageb_text}</p>
            <div className="relative mt-4 w-full md:w-44 h-2 bg-gray-300 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-500 rounded-full"
                style={{
                  backgroundColor:
                    (quiz?.imageb_count || 0) / (quiz?.imagea_count + quiz?.imageb_count) >=
                    (quiz?.imagea_count || 0) / (quiz?.imagea_count + quiz?.imageb_count)
                      ? "#22c55e"
                      : "#ef4444",
                  width: `${((quiz?.imageb_count || 0) /
                    (quiz?.imagea_count + quiz?.imageb_count)) *
                    100}%`,
                }}
              ></div>
            </div>
            <p className="text-center mt-2 text-xs text-gray-500">
              Chosen by{" "}
              {Math.round(
                ((quiz?.imageb_count || 0) /
                  ((quiz?.imagea_count || 0) + (quiz?.imageb_count || 0))) *
                  100
              ) || 0}
              % users
            </p>
          </div>
        )}
      </div>
    );
  };
  
  export default LatestQuesCards;