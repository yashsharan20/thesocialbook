import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        searchuserQuery:"",
        allUsers:[],
        allSimilarUsers:[],
        profileuser:null
    },
    reducers:
    {
        setLoading:(state,action)=>
        {
            state.loading = action.payload
        },
        setUser:(state,action)=>
        {
            state.user = action.payload
        },
        setProfileuser:(state,action)=>
        {
            state.profileuser = action.payload
        },
        setAllSimilarUsers:(state,action)=>
        {
            state.allSimilarQuiz = action.payload
        },
        setSearchuserQuery:(state,action)=>
        {
            state.searchuserQuery = action.payload
        },
        setAllUsers:(state,action)=>
        {
            state.allUsers = action.payload
        }
    }
})

export const {setLoading,setUser,setSearchuserQuery,setAllUsers,setProfileuser,setAllSimilarUsers} = authSlice.actions;
export default authSlice.reducer;