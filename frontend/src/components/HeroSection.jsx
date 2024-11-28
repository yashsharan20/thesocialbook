import React, { useState } from 'react'
import { Button } from './ui/shared/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () =>
{
  const [query,setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () =>
  {
    dispatch(setSearchQuery(query))
    navigate('/browse')
  }

    return (
      <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
          
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full item-center gap-4 mx-auto'>
            <input type="text"
            onChange={(e)=>setQuery(e.target.value)}
            placeholder='Find your dream jobs' className='outline-none border-none w-full' />
            <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                <Search className='w-5 h-5'/>
            </Button>
        </div>
        </div>
      </div>
    )
}

export default HeroSection