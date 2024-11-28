import React from "react";
import Navbar from "./ui/shared/Navbar";
import Footer from "./Footer";

const About = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto  rounded-2xl lg:p-8'>
                <section class="max-w-4xl mx-auto p-6 rounded-lg mt-10">
                    <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to <span class="text-[#3168c7]">[thesocialbook]</span> :</h1>
                    <p class="text-gray-700 text-lg leading-relaxed mb-6">
                        On this website, you can select your favorite choices and then find people who share similar interests. This is a great way to connect with individuals who are very much like you.
                    </p>

                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">What You’ll Find Here:</h2>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 text-lg">
                        <li><span class="font-semibold">Home Page</span>: On this page, you can make your favorite choices.</li>
                        <li><span class="font-semibold">Search User Page</span>: Search for other users on the website.</li>
                        <li><span class="font-semibold">Similar Choices Page</span>: Find your similarities with other users and see how closely their choices match yours. You can also view their choices here.</li>
                        <li><span class="font-semibold">Profile Page</span>: Update your profile picture and other related information.</li>
                    </ul>

                    <p class="text-gray-700 text-lg leading-relaxed mt-6">
                        To get started, click on signup to register. If you have already registered, you can log in.
                    </p>

                  
                </section>
            </div>

            <Footer />
        </div>
    )
}

export default About