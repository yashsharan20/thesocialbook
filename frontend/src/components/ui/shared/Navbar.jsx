import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/shared/avatar"
import React, { useState } from 'react'
import { Button } from './button'

import { LogOut, User2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    const logoutHandler = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setUser(null));
          navigate('/');
          toast.success(res.data.message,{
            style: {
              color: '#3168c7',
            },
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || 'An error occurred',{
          style: {
            color: '#3168c7',
          },
        });
      }
    };
  
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen((prevState) => !prevState);
    };
  
    return (
      <div className="bg-[#3168c7]">
        <div className="flex items-center justify-between mx-auto max-w-5xl px-4 h-16 sm:h-20">
          <div>
            <Link to="/">
              <h1 className="text-xl sm:text-2xl font-bold text-white">[thesocialbook]</h1>
            </Link>
          </div>
          <button
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
  
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex text-white font-medium items-center gap-5">
              {user && user.role === 'recruiter' ? (
                <li><Link to="/admin/quiz">Quiz</Link></li>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/searchuser">Search User</Link></li>
                  {user && <li><Link to="/similar">Similar Choices</Link></li>}
                </>
              )}
            </ul>
  
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" className="text-[#3168c7] hover:text-[#3168c7]">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#5c86da] hover:bg-[#5c86da]">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer ml-2">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || 'https://res.cloudinary.com/dkxesrhdu/image/upload/v1731254256/zugr7skfzxjed1hvqbft.png'}
                      alt="profile"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] sm:w-[260px] z-50 mt-5 p-4 rounded-lg shadow-lg bg-white">
                  <div className="flex items-center gap-4 mb-4">
                  <Avatar className="cursor-pointer ml-2">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || 'https://res.cloudinary.com/dkxesrhdu/image/upload/v1731254256/zugr7skfzxjed1hvqbft.png'}
                      alt="profile"
                    />
                  </Avatar>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">{user?.fullname}</h4>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    {user?.role === 'student' && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      >
                        <User2 className="text-blue-500" />
                        <Button variant="link" className="text-blue-500 hover:underline">
                          View Profile
                        </Button>
                      </Link>
                    )}
                    <div
                      onClick={logoutHandler}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    >
                      <LogOut className="text-red-500" />
                      <Button
                        variant="link"
                        className="text-red-500 hover:underline"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
  
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-2">
            <ul className="flex flex-col gap-3 text-white font-medium">
              {user && user.role === 'recruiter' ? (
                <li><Link to="/admin/quiz">Quiz</Link></li>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/searchuser">Search User</Link></li>
                  {user && <li><Link to="/similar">Similar Choices</Link></li>}
                </>
              )}
            </ul>
            <div className="flex flex-col gap-3 mt-4">
              {!user ? (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="text-[#3168c7] hover:text-[#3168c7] w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[#5c86da] hover:bg-[#5c86da] w-full">
                      Signup
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                 <Link to="/profile">
                  <div className="flex items-center gap-3">
                <Avatar className="cursor-pointer ml-2">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || 'https://res.cloudinary.com/dkxesrhdu/image/upload/v1731254256/zugr7skfzxjed1hvqbft.png'}
                      alt="profile"
                    />
                  </Avatar>
                    <span className="text-white">{user?.fullname}</span>
                  </div>
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="text-red-500 hover:underline w-full text-left mt-3"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Navbar;