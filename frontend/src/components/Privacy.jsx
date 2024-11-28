import React from "react";
import Navbar from "./ui/shared/Navbar";
import Footer from "./Footer";

const Privacy = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto rounded-2xl  lg:p-8'>
                <section class="max-w-4xl mx-auto p-6 bg-white rounded-lg ">
                    <h1 class="text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
                    <p class="text-gray-700 text-lg leading-relaxed mb-8">
                        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
                    </p>

                    <div class="space-y-6">
                  
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                We may collect the following types of information:
                            </p>
                            <ul class="list-disc list-inside text-gray-700 text-lg mt-2 space-y-2">
                                <li><strong>Personal Information:</strong> Such as your name, email address, and any other details you provide through forms.</li>
                                <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent, and actions taken.</li>
                                <li><strong>Cookies:</strong> Small data files stored on your device to enhance your browsing experience.</li>
                            </ul>
                        </div>

                    
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                We use the information we collect to:
                            </p>
                            <ul class="list-disc list-inside text-gray-700 text-lg mt-2 space-y-2">
                                <li>Provide and improve our services.</li>
                                <li>Respond to your inquiries and requests.</li>
                                <li>Analyze website usage to enhance user experience.</li>
                                <li>Send updates, newsletters, and promotional materials (only if you’ve opted in).</li>
                            </ul>
                        </div>

                        
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">3. Sharing Your Information</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                We do not sell, rent, or share your personal information with third parties, except in the following cases:
                            </p>
                            <ul class="list-disc list-inside text-gray-700 text-lg mt-2 space-y-2">
                                <li>With service providers who help us operate our website (e.g., hosting services).</li>
                                <li>To comply with legal obligations or protect our rights.</li>
                            </ul>
                        </div>

                       
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">4. Your Rights</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                You have the right to:
                            </p>
                            <ul class="list-disc list-inside text-gray-700 text-lg mt-2 space-y-2">
                                <li>Access the personal information we have about you.</li>
                                <li>Request corrections or updates to your information.</li>
                                <li>Opt-out of receiving promotional communications.</li>
                                <li>Request deletion of your personal data, subject to applicable laws.</li>
                            </ul>
                        </div>

                      
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">5. Security</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                We take reasonable measures to protect your information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                            </p>
                        </div>

                    
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">6. Changes to This Policy</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it regularly.
                            </p>
                        </div>

                      
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">7. Contact Us</h2>
                            <p class="text-gray-700 text-lg mt-2">
                                If you have any questions about this Privacy Policy, please <a href="/contact" class="text-blue-600 hover:underline">contact us</a>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Privacy