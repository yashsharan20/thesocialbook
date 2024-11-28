import React, { useEffect, useState } from 'react'
import Navbar from './ui/shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Edit, Edit2, EditIcon, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import Footer from './Footer'
import { Navigate, useNavigate } from 'react-router-dom'


const Profile = () => {
    const isResume = true;
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()
 

    useEffect(()=>{
        if(!user)
        {
            navigate("/")
        }
    })

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-[#82a7e7] rounded-2xl my-16 p-10'>
                <div className='flex justify-between'>
                    <div className="flex items-center gap-4">

                        <Avatar className="w-[124px] h-[124px] flex-shrink-0">
                            <AvatarImage
                                className="w-full h-full object-cover rounded-full"
                                src={
                                    user?.profile?.profilePhoto ||
                                    "https://res.cloudinary.com/dkxesrhdu/image/upload/v1731254256/zugr7skfzxjed1hvqbft.png"
                                }
                                alt="profile"
                            />
                        </Avatar>

                        <div>
                            <h1 className="font-medium text-xl">{user?.fullname}</h1>
                            <p>
                                {user?.profile?.bio}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        className='text-right ms-4 border border-[#3168c7] text-[#3168c7] hover:text-[#2b58b1] text-sm px-2 py-1'
                        variant="outline"
                    >
                        <EditIcon className="w-4 h-4" />
                    </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>

                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>

                    <div className='lg:flex items-center gap-1'>
                        <h1>Interested In :   </h1>
                        {
                            user?.skills?.length !== 0 ? user?.profile?.skills?.map((item, index) => {
                                return <Badge className="bg-[#3168c7] hover:bg-[#2b58b1]" key={index}>{item}</Badge>
                            }) : (<span>NA</span>)
                        }
                    </div>
                </div>


            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <Footer/>
        </div>

    )
}

export default Profile