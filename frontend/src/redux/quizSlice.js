import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
    name:"quiz",
    initialState:{
        allAdminQuiz:[],
        allChoiceQuiz: [], 
        searchQuizByText:"",
        singleQuiz:null
    },
    reducers:{
        setAllAdminQuiz:(state,action)=>
        {
            state.allAdminQuiz = action.payload
        },
        setAllUserQuiz:(state,action)=>{
            state.allUserQuiz = action.payload
        },
        setAllChoiceQuiz:(state,action)=>{
            state.allChoiceQuiz = action.payload
        },
        setSearchQuizByText:(state,action)=>
        {
            state.searchQuizByText = action.payload
        },
        setSingleQuiz:(state,action)=>
        {
            state.singleQuiz = action.payload
        }
    }
})

export const {setAllAdminQuiz,setSearchQuizByText,setSingleQuiz,setAllChoiceQuiz,setAllUserQuiz} = quizSlice.actions
export default quizSlice.reducer