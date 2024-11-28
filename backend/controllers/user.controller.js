import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, gender, password } = req.body
        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        const validatePhoneNumber = (phoneNumber) => {
            const phoneRegex = /^[0-9]{10}$/;
            return phoneRegex.test(phoneNumber);
        }

        if (!fullname || !email || !phoneNumber || !password || !gender) {
            return res.status(400).json({
                message: "Some fields are required",
                success: false
            })
        }

        if (fullname.length < 3) {
            return res.status(400).json({
                message: "Full name must be at least 3 characters long",
                success: false
            })
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            })
        }

        if (!validatePhoneNumber(phoneNumber)) {
            return res.status(400).json({
                message: "Phone number must be 10 digits",
                success: false
            })
        }


        const file = req.file
        let profilePhotoUrl = null;
        if(file)
        {
            const fileUri = getDataUri(file)
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
            profilePhotoUrl = cloudResponse.secure_url
        }
   
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            fullname,
            email,
            phoneNumber,
            gender,
            password: hashedPassword,
            role: 'student',
            profile: {
                profilePhoto: profilePhotoUrl,
            }
        })

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let role; 
        if (email === 'sharan@gmail.com') {
            role = 'recruiter';
        } else {
            role = 'student';
        }

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exists with current role",
                success: false
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome ${user.fullname}`,
                user,
                success: true
            })

    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body

        if (fullname.length < 3) {
            return res.status(400).json({
                message: "Full name must be at least 3 characters long",
                success: false
            })
        }

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            })
        }

        const validatePhoneNumber = (phoneNumber) => {
            const phoneRegex = /^[0-9]{10}$/;
            return phoneRegex.test(phoneNumber);
        }

        if (!validatePhoneNumber(phoneNumber)) {
            return res.status(400).json({
                message: "Phone number must be 10 digits",
                success: false
            })
        }



        const file = req.file
        let profilePhotoUrl = null;
        if(file)
        {
            const fileUri = getDataUri(file)
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
            profilePhotoUrl = cloudResponse.secure_url
        }


        let skillsArray;

        if (skills) {
            skillsArray = skills.split(",")
        }
        const userId = req.id
        let user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }


        if(email && email !== user.email)
        {
            const user_email = await User.findOne({email})
            if(user_email)
            {
                return res.status(400).json({
                    message:"User already exists with this email",
                    success:false
                })
            }
        }

        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        user.profile.bio = bio
        user.profile.skills = skillsArray
        if (profilePhotoUrl) user.profile.profilePhoto = profilePhotoUrl || user.profile.profilePhoto

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                { fullname: { $regex: keyword, $options: "i" } }
            ],
            role:"student"
        }
        const users = await User.find(query).sort({ createdAt: -1 })
        if (!users) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        return res.status(200).json({
            users,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getUserById = async (req, res) => {

    try {
        
        const userid = req.params.id
        const user = await User.findById(userid)
        console.log(user)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        return res.status(200).json({ user, success: true })
    } catch (error) {
        console.log(error)
    }
}