import { clerkClient } from '@clerk/express'
import Course from '../models/Course.js'
import { v2 as cloudinary } from 'cloudinary'
import { Purchase } from '../models/Purchase.js'

// Update role to educator
export const updateRoleToEducator = async (req, res) => {
    try {

        const { userId } = await req.auth()

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator',
            }
        })

        res.json({
            success: true,
            message: 'You can publish a course now'
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Add new course
export const addCourse = async (req, res) => {
    try {

        const { courseData } = req.body
        const imageFile = req.file

        const { userId: educatorId } = await req.auth()

        if (!imageFile) {
            return res.json({
                success: false,
                message: 'Thumbnail Not Attached'
            })
        }

        const parsedCourseData = JSON.parse(courseData)

        parsedCourseData.educator = educatorId

        const newCourse = await Course.create(parsedCourseData)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        newCourse.courseThumbnail = imageUpload.secure_url

        await newCourse.save()

        res.json({
            success: true,
            message: 'Course Added'
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Get educator courses
export const getEducatorCourses = async (req, res) => {
    try {

        const { userId: educator } = await req.auth()

        const courses = await Course.find({ educator })

        res.json({
            success: true,
            courses
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Get educator dashboard data
export const educatorDashboardData = async (req, res) => {
    try {

        const { userId: educator } = await req.auth()

        const courses = await Course.find({ educator })

        const totalCourses = courses.length

        const courseIds = courses.map(course => course._id)

        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        })

        const totalEarnings = purchases.reduce(
            (sum, purchase) => sum + purchase.amount,
            0
        )

        res.json({
            success: true,
            dashboardData: {
                totalCourses,
                totalEarnings
            }
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Get enrolled students
export const getEnrolledStudentData = async (req, res) => {
    try {

        const { userId: educator } = await req.auth()

        const courses = await Course.find({ educator })

        const courseIds = courses.map(course => course._id)

        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        })
            .populate('userId', 'name imageUrl')
            .populate('courseId', 'courseTitle')

        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }))

        res.json({
            success: true,
            enrolledStudents
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}