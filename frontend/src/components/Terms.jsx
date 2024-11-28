import React from "react";
import Navbar from "./ui/shared/Navbar";
import Footer from "./Footer";

const Terms = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto rounded-2xl lg:p-8'>
                <section class="max-w-4xl mx-auto p-6 bg-white rounded-lg ">
                    <h1 class="text-4xl font-bold text-gray-800 mb-6">Terms and Conditions</h1>
                    <p class="text-gray-700 text-lg leading-relaxed mb-8">
                        Welcome to <span class="bg-[#3168c7] text-white p-1">[thesocialbook]</span>. By accessing or using our website and services, you agree to the following terms and conditions. Please read them carefully.
                    </p>

                    <div class="space-y-6">
                
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                By using this website, you agree to comply with and be bound by these terms. If you do not agree, please do not use our website or services.
                            </p>
                        </div>

                      
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">2. Intellectual Property</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                All content on this website is the property of <span class="bg-[#3168c7] text-white p-1">[thesocialbook]</span>. You may not copy, distribute, or use this content for commercial purposes without explicit permission.
                            </p>
                        </div>

               
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">3. User Conduct</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                You agree to use our website for lawful purposes only. Any abusive, fraudulent, or harmful behavior, including spamming and hacking, is strictly prohibited.
                            </p>
                        </div>

     
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">4. Limitation of Liability</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                We strive to provide accurate and helpful content, but we do not guarantee its completeness or accuracy. We are not liable for any damages resulting from the use of our content or services.
                            </p>
                        </div>

                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">5. Changes to Terms</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                We reserve the right to update or modify these terms at any time. Changes will be effective immediately upon posting. Please review this page regularly for updates.
                            </p>
                        </div>

            
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">6. Contact Us</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                If you have any questions about these terms, feel free to <a href="/contact" class="text-blue-600 hover:underline">contact us</a>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Terms