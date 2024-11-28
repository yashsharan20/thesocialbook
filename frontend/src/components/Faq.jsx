import React from "react";
import Navbar from "./ui/shared/Navbar";
import Footer from "./Footer";

const Faq = () =>
{
    return (
        <div>
        <Navbar />
        <div className='max-w-4xl mx-auto rounded-2xl lg:p-8'>
        <section class="max-w-4xl mx-auto p-6 bg-white rounded-lg  ">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h1>
    <p class="text-gray-700 text-lg leading-relaxed mb-8">
        Got questions? We’ve got answers! Check out the frequently asked questions below. If you don’t find what you’re looking for, feel free to <a href="/contact" class="text-blue-600 hover:underline">contact us</a>.
    </p>

    <div class="space-y-6">

    <div>
        <h2 class="text-2xl font-semibold text-gray-800">How can I create an account?</h2>
        <p class="text-gray-700 text-lg mt-2">
            To create an account, you'll need to provide your full name, email, phone number, password, and gender.
        </p>
    </div>

    <div>
        <h2 class="text-2xl font-semibold text-gray-800">How can I search for other users?</h2>
        <p class="text-gray-700 text-lg mt-2">
            You can search for other users by visiting the search user page.
        </p>
    </div>

    <div>
        <h2 class="text-2xl font-semibold text-gray-800">How many quizzes are available on this website?</h2>
        <p class="text-gray-700 text-lg mt-2">
            Quizzes are regularly updated by our team.
        </p>
    </div>

    <div>
        <h2 class="text-2xl font-semibold text-gray-800">How can I update my profile?</h2>
        <p class="text-gray-700 text-lg mt-2">
            You can update your profile, bio, interests, and other profile-related information on the profile page.
        </p>
    </div>

    <div>
    <h2 class="text-2xl font-semibold text-gray-800">Can I view other users' selected choices?</h2>
    <p class="text-gray-700 text-lg mt-2">
        Yes, you can view the choices selected by other users. Simply visit  Similar Choices page and then you can see the choices they've made.
    </p>
</div>

</div>

</section>
        </div>
        <Footer />
    </div>
    )
} 

export default Faq