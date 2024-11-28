import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../input'
import { Button } from '../button'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuizByText } from '@/redux/quizSlice'
import AdminQuizTable from './AdminQuizTable'

const AdminQuiz = () =>
{

    const navigate = useNavigate()
    const [input,setInput] = useState("")
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setSearchQuizByText(input))
    },[input])
    return (
        <div>
            <Navbar/>
           <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input className='w-fit' onChange={(e)=>setInput(e.target.value)} placeholder="Filter by name"/>
                    <Button onClick={()=>navigate("/admin/quiz/create")}>New Quiz</Button>
                </div>
              <AdminQuizTable/>
           </div>
        </div>
    )
}

export default AdminQuiz