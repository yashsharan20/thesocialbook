import { setProfileuser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetUserById = (id) =>
{
   const dispatch = useDispatch()
   useEffect(()=>{
    const fetchUserById = async (id) =>
    {
    
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/get/${id}`,{withCredentials:true})
            if(res.data.success)
            {

                dispatch(setProfileuser(res.data.user))
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchUserById(id)
   },[])
}
export default useGetUserById