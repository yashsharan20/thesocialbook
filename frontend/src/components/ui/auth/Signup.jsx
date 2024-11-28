import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../../ui/label'
import { Input } from '../../ui/Input'
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group'
import { Button } from '../shared/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading } from '@/redux/authSlice'
import Footer from '@/components/Footer'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        gender: "",
        file: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, user } = useSelector(store => store.auth)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("gender",input.gender)

        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message,{
                    style: {
                      color: '#3168c7',
                    },
                  })
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message,{
                style: {
                  color: '#3168c7',
                },
              })
        } finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center m-auto justify-center px-4 sm:px-6 lg:px-8 max-w-4xl'>
    <form
        onSubmit={submitHandler}
        className='w-full sm:w-2/3 lg:w-1/2 border border-[#3168c7] rounded-md p-5 sm:p-7 my-10'
    >
        <h1 className='font-bold text-center text-lg sm:text-xl mb-5'>Sign Up</h1>
        <div className='my-2'>
            <Label>Full Name</Label>
            <Input
                type='text'
                value={input.fullname}
                name='fullname'
                onChange={changeEventHandler}
                placeholder='Vladimir Putin'
            />
        </div>
        <div className='my-2'>
            <Label>Email</Label>
            <Input
                type='email'
                value={input.email}
                name='email'
                onChange={changeEventHandler}
                placeholder='putin@gmail.com'
            />
        </div>
        <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
                type='text'
                value={input.phoneNumber}
                name='phoneNumber'
                onChange={changeEventHandler}
                placeholder='9876543210'
            />
        </div>
        <div className='my-2'>
            <Label>Password</Label>
            <Input
                type='password'
                value={input.password}
                name='password'
                onChange={changeEventHandler}
                placeholder='********'
            />
        </div>
        <div className='flex flex-col space-y-5'>
            <RadioGroup className='flex flex-col sm:flex-row sm:items-center gap-4'>
                <Label>Gender</Label>
                <div className='flex items-center space-x-2'>
                    <Input
                        type='radio'
                        checked={input.gender === 'male'}
                        onChange={changeEventHandler}
                        name='gender'
                        id='male'
                        className='cursor-pointer'
                        value='male'
                    />
                    <Label htmlFor='male'>Male</Label>
                </div>
                <div className='flex items-center space-x-2'>
                    <Input
                        type='radio'
                        checked={input.gender === 'female'}
                        onChange={changeEventHandler}
                        name='gender'
                        className='cursor-pointer'
                        id='female'
                        value='female'
                    />
                    <Label htmlFor='female'>Female</Label>
                </div>
            </RadioGroup>
            <div className='flex flex-col sm:flex-row items-center gap-2'>
                <Label htmlFor='profile'>Profile</Label>
                <Input
                    accept='image/*'
                    onChange={changeFileHandler}
                    type='file'
                    id='profile'
                    className='cursor-pointer'
                />
            </div>
        </div>
        {!loading ? (
            <Button
                type='submit'
                className='w-full my-4 bg-[#3168c7] hover:bg-[#2b58b1]'
            >
                Signup
            </Button>
        ) : (
            <Button className='w-full my-4 bg-[#3168c7] hover:bg-[#2b58b1]'>
                <Loader2 className='mr-2 h-3 w-4 animate-spin' /> Please wait
            </Button>
        )}
        <span className='text-sm text-center block'>
            Already have an account?{' '}
            <Link className='text-blue-600' to='/login'>
                Login
            </Link>
        </span>
    </form>
</div>
            <div className='mt-12'>
                <Footer />
            </div>
        </>
    )
}

export default Signup