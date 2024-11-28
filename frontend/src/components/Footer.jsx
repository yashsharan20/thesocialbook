import React from 'react'

const Footer = () => {
    return (
        <footer className='border-t py-8 '>
            <div className='container mx-auto px-4'>

            <div class="flex items-center justify-between mx-auto max-w-5xl ">
            <div class="d-block mx-auto items-center gap-2">
                <ul class="flex text-center text-[#7aaafc] items-center gap-3">
                    <li><a href="/about">about</a></li>
                    <li><a href="/contact">contact</a></li>
                    <li><a href="/faq">faq</a></li>
                    <li><a href="/terms">terms</a></li>
                    <li><a href="/privacy">privacy</a></li>
                </ul>
                
               </div>
            </div>

                <div className='text-center justify-between items-center'>
                    <div className='mb-5 md:mb-0'>
                        <h2 className='text-sm'>a Yash Sharan production</h2>
                        <p className='text-sm'>Thesocialbook &copy; 2024</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer 