import React, { useEffect } from 'react';
import Navbar from './ui/shared/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllUsers from '@/hooks/useGetAllUsers';
import { setSearchuserQuery } from '@/redux/authSlice';
import User from './User.jsx';
import { motion } from 'framer-motion';
import Footer from './Footer';


const Browseruser = () => {
    const { allUsers, searchuserQuery, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    useGetAllUsers();
  
    return (
      <div>
        <Navbar />
        <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6">
          <h1 className="font-bold text-xl sm:text-2xl my-10 text-center">
            Search Result: {searchuserQuery} ({allUsers.length})
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-5">
            {allUsers.map((alluser) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={alluser?._id}
              >
                <User key={alluser._id} user={alluser} />
              </motion.div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Browseruser;