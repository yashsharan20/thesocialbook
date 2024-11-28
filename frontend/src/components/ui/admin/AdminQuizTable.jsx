import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../table'
import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../popover"
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminQuiz from '@/hooks/useGetAllAdminQuiz'

const AdminQuizTable = () => {
    useGetAllAdminQuiz()
    const {allAdminQuiz,searchQuizByText} = useSelector(store=>store.quiz)
    const [filterquiz, setFilterQuiz] = useState(allAdminQuiz)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredQuiz = allAdminQuiz.length >= 0 && allAdminQuiz.filter((quiz) => {
            if (!searchQuizByText) {
                return true;
            }
            return quiz?.question_text?.toLowerCase().includes(searchQuizByText.toLowerCase()) || quiz?.imagea_text?.toLowerCase().includes(searchQuizByText.toLowerCase()) || quiz?.imageb_text?.toLowerCase().includes(searchQuizByText.toLowerCase())
        })
        setFilterQuiz(filteredQuiz)
    }, [allAdminQuiz, searchQuizByText])

    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent posted quiz
                </TableCaption>
                <TableHeader>
                    <TableRow>
                         <TableHead>SN</TableHead>
                        <TableHead>Question</TableHead>
                        <TableHead>ImageA</TableHead>
                        <TableHead>ImageB</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                      
                        filterquiz.length == 0 ? <span className='text-center'>Quiz not found!</span> : (

                          
                            filterquiz?.map((quiz,index) => (


                                <tr key={quiz._id}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{quiz?.question_text}</TableCell>
                                    <TableCell>
                                    <img src={quiz.imageA} alt="Image A" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    {quiz?.imagea_text}
                                    </TableCell>
                                    <TableCell>
                                    <img src={quiz.imageB} alt="Image B" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    {quiz?.imageb_text}
                                    </TableCell>
                                    <TableCell>  {quiz.createdAt ? quiz.createdAt.split("T")[0] : "N/A"}</TableCell>
                                    <TableCell className='text-right'>
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick={() => navigate(`/admin/quiz/${quiz._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>
                            ))

                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default AdminQuizTable