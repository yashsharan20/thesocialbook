import React, { useState } from 'react';
import Navbar from './ui/shared/Navbar';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchuserQuery } from '@/redux/authSlice';
import Footer from './Footer';

const SearchUser = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const searchUserHandler = () => {
      dispatch(setSearchuserQuery(query));
      navigate("/browseuser");
    };
  
    return (
      <div>
        <Navbar />
        <div className="text-center pb-60 px-4 sm:px-6">
          <div className="flex flex-col my-16 sm:my-20 gap-6">
            <h1 className="text-3xl mt-16 sm:text-5xl font-bold ">
              <span className="text-[#3168c7]">Search Any User !</span>
            </h1>
            <div className="flex w-full sm:w-[40%] mx-auto shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4">
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Quick search user"
                className="outline-none border-none w-full py-2 text-sm sm:text-base" required
              />
              <Button
                onClick={searchUserHandler}
                className="rounded-r-full text-white bg-[#3168c7] hover:bg-[#5c86da] py-2 px-4"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default SearchUser;