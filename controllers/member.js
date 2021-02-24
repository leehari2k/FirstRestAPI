const Member = require('../models/user.model')
const Course = require('../models/post.model')
const {
    HTTP_STATUS_CODE
} = require('../constant')

const createMember = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const course = await Course.findById(courseId)

        const newMember = new Member({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            phone: req.body.phone,
            course: courseId
        })
        await newMember.save()

        course.members.push(newMember._id)
        await course.save()

        return res.status(HTTP_STATUS_CODE.CREATE).json(newMember)       
    } catch (err) {
        next(err)
    }
}
const getAllMembers = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const course = await Course.findById(courseId).populate('members')

        return res.status(HTTP_STATUS_CODE.OK).json({
            course_members: course.members
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createMember,
    getAllMembers
}