import React from "react";
import Navbar from "./ui/shared/Navbar";
import Footer from "./Footer";

const Contact = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto  rounded-2xl lg:p-8'>
                <section class="max-w-4xl mx-auto p-6 ">
                    <h1 class="text-4xl font-bold text-gray-800 mb-4">Get in Touch with <span class="text-[#3168c7]">[thesocialbook]</span> :</h1>
                    <p class="text-gray-700 text-lg leading-relaxed mb-6">
                        Have questions, suggestions, or collaboration ideas? We’d love to hear from you! Use the below links to reach out, and we’ll get back to you as soon as possible.
                    </p>

                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                    <ul class="list-none space-y-2 text-gray-700 text-lg">
                        <li><span class="font-semibold">Email:</span> <a href="mailto:yashsharan2013@gmail.com" class="text-blue-600 hover:underline">yashsharan2013@gmail.com</a></li>
                        <li><span class="font-semibold">Follow Us:</span>
                            <a href="https://www.youtube.com/@SigmaRulesNew" class="text-blue-600 hover:underline mx-1">Youtube</a> 
                        </li>
                    </ul>

                   
                </section>
            </div>

            <Footer />
        </div>
    )
}

export default Contact