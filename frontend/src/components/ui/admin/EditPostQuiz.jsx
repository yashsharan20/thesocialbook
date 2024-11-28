import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../../ui/input'
import { Button } from '../button'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { QUIZ_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import useGetQuizById from '@/hooks/useGetQuizById'

const EditPostQuiz = () => {
   
    const { id: quizId } = useParams()
    useGetQuizById(quizId)

    const navigate = useNavigate()

    const [input, setInput] = useState({
        question_text: "",
        imagea_text:"",
        imageb_text:"",
        fileA:null,
        fileB:null
    })

    const {singleQuiz} = useSelector(store=>store.quiz)
 
    const [loading,setLoading] = useState(false)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler1 = (e) =>
        {
            setInput({...input,fileA:e.target.files?.[0]})
        }

    const changeFileHandler2= (e) =>
        {
                setInput({...input,fileB:e.target.files?.[0]})
        }

    const submitHandler = async (e) =>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append("question_text",input.question_text);
        formData.append("imagea_text",input.imagea_text);
        formData.append("imageb_text",input.imageb_text);
        if(input.fileA) formData.append('fileA',input.fileA);
        if(input.fileB) formData.append('fileB',input.fileB);

        try {
            setLoading(true)
            const res = await axios.put(`${QUIZ_API_ENDPOINT}update/${quizId}`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            })
           
                toast.success(res.data.message)
                navigate('/admin/quiz')
            
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
        }
      
    }

    useEffect(()=>{
    
        setInput({
            question_text: singleQuiz.question_text || "",
            imagea_text:singleQuiz.imagea_text || "",
            imageb_text:singleQuiz.imageb_text || "",
            fileA:null,
            fileB:null
        })
    },[singleQuiz])

    return (
        <div>
            <Navbar />
            <div className='items-center m-auto justify-center max-w-4xl my-5'>
                <form onSubmit={submitHandler} className='p-8 border border-gray-200 shadow-lg rounded-lg'>
                    <div>
                        <div>
                            <Label>Quiz</Label>
                            <Input value={input.question_text} onChange={changeEventHandler} type="text" name="question_text" className="focus-visible:ring-offset-0 peer-focus-visible:ring-0 my-1" />
                        </div> 
                        <div>
                            <Label>Image A Text</Label>
                            <Input value={input.imagea_text} onChange={changeEventHandler} type="text" name="imagea_text" className="focus-visible:ring-offset-0 peer-focus-visible:ring-0 my-1" />
                        </div>  
                        <div >
                            <Label>ImageA</Label>
                            <Input accept="image/*" name="fileA" onChange={changeFileHandler1} type="file" className='cursor-pointer'></Input>
                         </div>
                         <div>
                            <Label>Image B Text</Label>
                            <Input value={input.imageb_text} onChange={changeEventHandler} type="text" name="imageb_text" className="focus-visible:ring-offset-0 peer-focus-visible:ring-0 my-1" />
                        </div> 
                         <div>
                            <Label>ImageB</Label>
                            <Input accept="image/*" name="fileB" onChange={changeFileHandler2} type="file" className='cursor-pointer'></Input>
                         </div>
                    </div>
                    {
                        !loading ? (<Button type="submit" className='w-full my-4 '>Update Quiz</Button>):(<Button className='w-full my-4'><Loader2 className='mr-2 h-3 w-4 animate-spin'/> Please wait</Button>)
                    }
                    
                </form>
            </div>
        </div>
    )
}

export default EditPostQuiz