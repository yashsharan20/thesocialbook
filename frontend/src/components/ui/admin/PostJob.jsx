import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../../ui/input'
import { Button } from '../button'
import { useSelector } from 'react-redux'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../select"
import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {

    const { companies } = useSelector(store => store.company)
    const navigate = useNavigate()

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })

    const [loading,setLoading] = useState(false)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (value) =>
    {
        const selectedCompany =  companies.find((company)=>company.name== value)
        setInput({...input,companyId:selectedCompany._id})
    }

    const submitHandler = async (e) =>
    {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_ENDPOINT}/post`,input,{
                headers:{
                    'Content-Type':'Application/json'
                },
                withCredentials:true
            })
            if(res.data.success)
            {
                toast.success(res.data.message)
                navigate('/admin/jobs')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
        }
      
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-lg'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input value={input.title} onChange={changeEventHandler} type="text" name="title" className="focus-visible:ring-offset-0 peer-focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input value={input.description} onChange={changeEventHandler} type="text" name="description" className="focus-visible:ring-offset-0 peer-focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input value={input.requirements} onChange={changeEventHandler} type="text" name="requirements" className="focus-visible:ring-offset-0 peer-focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input value={input.salary} onChange={changeEventHandler} type="text" name="salary" className="focus-visible:ring-offset-0 peer-focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input value={input.location} onChange={changeEventHandler} type="text" name="location" className="focus-visible:ring-offset-0 peer-focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input value={input.jobType} onChange={changeEventHandler} type="text" name="jobType" className="focus-visible:ring-offset-0 peer-focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input value={input.experience} onChange={changeEventHandler} type="text" name="experience" className="focus-visible:ring-offset-0 peer-focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Position</Label>
                            <Input value={input.position} onChange={changeEventHandler} type="number" name="position" className="focus-visible:ring-offset-0 peer-focus-visible:ring-0 my-1" />
                        </div>
                        {
                            companies.length != 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Company</SelectLabel>
                                            {
                                                companies.map((company) => (
                                                    <SelectItem key={company?._id} value={company?.name}>{company.name}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        !loading ? (<Button type="submit" className='w-full my-4 '>Post New Job</Button>):(<Button className='w-full my-4'><Loader2 className='mr-2 h-3 w-4 animate-spin'/> Please wait</Button>)
                    }
                    {
                        companies.length == 0 && <p className='text-xs text-red-600 text-center font-bold my-3'>*Please register a company first before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob