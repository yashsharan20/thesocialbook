import React, { useEffect } from 'react'
import Navbar from './ui/shared/Navbar'
import QuesPicker from './QuesPicker'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import useGetAllUserQuiz from '@/hooks/useGetAllUserQuiz'

const Home = () => {

    useGetAllUserQuiz();
    const { user } = useSelector(store => store.auth)
    useEffect(() => {
  
     
    }, [])
    return (
        <div>
            <Navbar />
            <QuesPicker/>
            <Footer />
        </div>
    )
}

export default Home