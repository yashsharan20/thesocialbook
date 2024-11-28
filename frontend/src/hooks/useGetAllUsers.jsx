import { setAllUsers } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllUsers = () =>
{
    const dispatch = useDispatch()
    const {searchuserQuery} = useSelector(store=>store.auth)
    useEffect(()=>{
        const fetchAllUsers = async () =>
        {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/get?keyword=${searchuserQuery}`,{withCredentials:true});
                if(res.data.success)
                {
                    dispatch(setAllUsers(res.data.users))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllUsers()
    },[])
}

export default useGetAllUsers