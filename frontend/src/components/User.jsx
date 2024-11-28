import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Button } from "./ui/button";
import { BadgeCheck, PersonStandingIcon } from "lucide-react";
import { Badge } from './ui/badge'
import { useNavigate } from "react-router-dom";

const User = ({ user }) => {

    const navigate = useNavigate()
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
    }

   

    return (
        <div>
            <div className='p-9
             d-none  shadow-xl border border-[#5c86da]'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-[#5c86da]'>{daysAgoFunction(user?.createdAt) === 0 ? "Today" : `${daysAgoFunction(user?.createdAt)} days ago`}</p>
                    <Button variant="outline text-[#5c86da]" className=" text-[#5c86da]" size="icon"><BadgeCheck /></Button>
                </div>

                <div className='flex items-center gap-2 my-2'>
                    <Button variant="outline" size="icon">
                        <Avatar>
                            <AvatarImage src={user?.profile?.profilePhoto || "https://res.cloudinary.com/dkxesrhdu/image/upload/v1731254256/zugr7skfzxjed1hvqbft.png"} />
                        </Avatar>
                    </Button>
                    <div>
                        <h1 className='font-medium text-md'>{user?.fullname}</h1>
                    </div>
                </div>

                <div className='flex items-center gap-2 mt-4'>
                    <span className="text-sm"> <PersonStandingIcon className="text-[#5c86da]" /> </span>  <Badge className={'text-[#5c86da]'} variant="ghost">{user?.gender == 'male' ? 'Male' : 'Female'}</Badge>
                </div>
                <div className='flex items-center gap-4 mt-4'>
                    <Button onClick={() => navigate(`/userprofile/${user?._id}`)} className=" text-white bg-[#3168c7] hover:bg-[#3168c7]">View Profile</Button>
                </div>
            </div>
        </div>
    )
}
export default User