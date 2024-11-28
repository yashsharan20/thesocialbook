import React, { useEffect, useState } from "react";
import Navbar from "./ui/shared/Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT, USERCHOICE_API_ENDPOINT } from "@/utils/constant";
import { setAllChoiceQuiz } from "@/redux/quizSlice";
import { useParams } from "react-router-dom";
import LatestQuesCards from "./LatestQuesCards";
import ChoiceCards from "./ChoiceCards";

const Viewchoice = () => {

    const dispatch = useDispatch()

    const { id } = useParams();
    const [username, setUsername] = useState("");
    const { allChoiceQuiz } = useSelector((store) => store.quiz);


    useEffect(() => {


        const fetchuserchoice = async () => {
            try {
                const res = await axios.get(`${USERCHOICE_API_ENDPOINT}getquizbyuserid/${id}`, { withCredentials: true })
                const resuser = await axios.get(`${USER_API_ENDPOINT}/get/${id}`);
                setUsername(resuser?.data?.user?.fullname);
                if (res.data.success) {
                    dispatch(setAllChoiceQuiz(res.data.userchoice || []))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchuserchoice()
    }, [dispatch, allChoiceQuiz])



    return (
        <div>
            <Navbar />
            <div className='max-w-xl text-center mx-auto my-20'>
                <span className="px-7 py-3 rounded-full text-white bg-[#3168c7] font-medium shadow-md">
                    {username}'s Choices
                </span>
                <div className='grid gap-4 my-5'>
                    {
                        allChoiceQuiz.length <= 0 ?
                            <span className="text-center text-lg font-semibold text-white  mt-10 p-10 border border-dashed rounded-md bg-[#5c86da] hover:bg-[#5c86da]">
                                Stay Tuned! New Quizzes Coming Soon
                            </span>
                            : allChoiceQuiz?.map((item, index) => (
                                <ChoiceCards key={item._id} quiz={item} />
                            ))
                    }
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Viewchoice