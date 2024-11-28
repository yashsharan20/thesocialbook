import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group'
import { Button } from '../shared/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import Footer from '@/components/Footer'

const Login = () => {

    const navigate = useNavigate()
    const dispath = useDispatch()
    const { loading, user } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispath(setLoading(true))
            const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispath(setUser(res.data.user))
                navigate("/")
                toast.success(res.data.message, {
                    style: {
                        color: '#3168c7',
                    },
                })

            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message, {
                style: {
                    color: '#3168c7',
                },
            });
        } finally {
            dispath(setLoading(false))
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
            <div className='flex flex-col items-center m-auto justify-center px-4 sm:px-6 lg:px-8 max-w-3xl'>
                <form
                    onSubmit={submitHandler}
                    className='w-full sm:w-2/3 lg:w-1/2 border border-[#3168c7]  mt-10 sm:mt-28 rounded-md p-5 sm:p-7 my-10'
                >
                    <h1 className='font-bold text-lg sm:text-xl text-center mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            name='email'
                            value={input.email}
                            onChange={changeEventHandler}
                            type='email'
                            placeholder='putin@gmail.com'
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type='password'
                            name='password'
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder='********'
                        />
                    </div>
                    {!loading ? (
                        <Button
                            type='submit'
                            className='w-full my-4 bg-[#3168c7] hover:bg-[#2b58b1]'
                        >
                            Login
                        </Button>
                    ) : (
                        <Button className='w-full my-4 bg-[#3168c7] hover:bg-[#2b58b1]'>
                            <Loader2 className='mr-2 h-3 w-4 animate-spin' /> Please wait
                        </Button>
                    )}
                    <div className='text-sm text-center'>
                        Don't have an account?{' '}
                        <Link className='text-blue-600' to='/signup'>
                            Signup
                        </Link>
                    </div>
                </form>
            </div>
            <div className='mt-32'>
                <Footer />
            </div>
        </>
    )
}

export default Login