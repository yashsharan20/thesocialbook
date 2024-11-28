import React, { useState } from 'react'
import Navbar from './ui/shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, EditIcon, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from '@radix-ui/react-label'

import { useSelector } from 'react-redux'

import useGetUserById from '@/hooks/useGetUserById'
import { useParams } from 'react-router-dom'
import Footer from './Footer'

const Userprofile = () => {

    const { id } = useParams(); 
    useGetUserById(id)

    const {profileuser} = useSelector(store=>store.auth)
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
                                profileuser?.profile?.profilePhoto ||
                                "https://res.cloudinary.com/dkxesrhdu/image/upload/v1731254256/zugr7skfzxjed1hvqbft.png"
                            }
                            alt="profile"
                        />
                    </Avatar>

                    <div>
                        <h1 className="font-medium text-xl">{profileuser?.fullname}</h1>
                        <p>
                            {profileuser?.profile?.bio}
                        </p>
                    </div>
                </div>
            </div>
            <div className='my-5'>
                <div className='flex items-center gap-3 my-2'>
                    <Mail />
                    <span>{profileuser?.email}</span>
                </div>

                <div className='flex items-center gap-3 my-2'>
                    <Contact />
                    <span>{profileuser?.phoneNumber}</span>
                </div>
            </div>
            <div className='my-5'>

                <div className='lg:flex items-center gap-1'>
                    <h1>Interested In :   </h1>
                    {
                        profileuser?.skills?.length !== 0 ? profileuser?.profile?.skills?.map((item, index) => {
                            return <Badge className="bg-[#3168c7] hover:bg-[#2b58b1]" key={index}>{item}</Badge>
                        }) : (<span>NA</span>)
                    }
                </div>
            </div>


        </div>
      
        <Footer />
    </div>
    )
}

export default Userprofile