import { DialogContent, DialogFooter, DialogTitle } from './ui/dialog'
import { Dialog, DialogHeader } from './ui/dialog'
import React, { useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skills => skills),
        file: user?.profile?.resume
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }


    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
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
            setLoading(false)
        }
        setOpen(false)
    }

    return (
        <Dialog open={open}>
            <DialogContent className='sm:max-w-[460px] ' onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className='text-center  text-[#2b58b1]'>
                        Update Profile
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className='text-right'>Name</Label>
                            <Input id="name" value={input.fullname} onChange={changeEventHandler} className="col-span-3" name="fullname" />
                        </div>
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className='text-right'>Email</Label>
                            <Input id="email" type="email" value={input.email} onChange={changeEventHandler} className="col-span-3" name="email" />
                        </div>
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="number" className='text-right'>Phone No.</Label>
                            <Input id="number" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3" name="phoneNumber" />
                        </div>
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className='text-right'>Bio</Label>
                            <Input id="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3" name="bio" />
                        </div>
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className='text-right'>Interested In</Label>
                            <Input id="skills" placeholder="Enter words, separated by commas" value={input.skills} onChange={changeEventHandler} className="col-span-3" name="skills" />
                        </div>
                    </div>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-4">

                            <Label htmlFor="profile" className="w-1/4 text-right ">
                                Profile
                            </Label>


                            <Input
                                accept="image/*"
                                onChange={changeFileHandler}
                                type="file"
                                id="profile"
                                className="cursor-pointer form-control w-3/4 border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {
                            !loading ? (<Button type="submit" className='w-full my-4 bg-[#3168c7] hover:bg-[#2b58b1]'>Update</Button>) : (<Button className='w-full bg-[#3168c7] hover:bg-[#2b58b1]  my-4'><Loader2 className='mr-2 h-3 w-4 animate-spin' /> Please wait</Button>)
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog