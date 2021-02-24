const {
    HTTP_STATUS_CODE
} = require('../constant')

const User = require('../models/user.model')

const create = async (req, res, next) => {
    try {
        const {} = req.body.value
        const obj = {}
        const newUser = new User({obj})
        const result = await newUser.save()

        if (!result) throw new Object({
            message: 'Create failed',
            status: HTTP_STATUS_CODE.BAD_REQUEST,
        })

        return res.status(HTTP_STATUS_CODE.CREATE).json(ewUser)       
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const users = await User.findById({})
        return res.status(HTTP_STATUS_CODE.OK).json({ users })
    } catch (err) {
        next(err)
    }
}

const getOne = async (req, res, next) => {
    try {
        const { userID } = req.params
        const user = await User.findById(userID)
        if (!user) throw new Object({
            message: 'Not found',
            status: HTTP_STATUS_CODE.NOT_FOUND,
        })
        return res.status(HTTP_STATUS_CODE.OK).json(user)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const { userID } = req.params
        const user = await User.findById(userID)
        if (!user) throw new Object({
            message: 'Not found',
            status: HTTP_STATUS_CODE.NOT_FOUND,
        })

        const result = await User.findByIdAndRemove(userID)
        if (!result) throw new Object({
            message: 'Remove failed',
            status: HTTP_STATUS_CODE.BAD_REQUEST,
        })
        return res.status(HTTP_STATUS_CODE.OK).json({ success: true })

    } catch (err) {
        next(err)
    }
}

const removeAll = async (req, res, next) => {
    try {
        const result = await User.deleteMany()
        if (!result) throw new Object({
            message: 'Remove failed',
            status: HTTP_STATUS_CODE.BAD_REQUEST,
        })
        return res.status(HTTP_STATUS_CODE.OK).json({ success: true })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const { userID } = req.params
        const user = await User.findById(userID)
        if (!user) throw new Object({
            message: 'Not found',
            status: HTTP_STATUS_CODE.NOT_FOUND,
        })

        const newUser = req.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        if (!result) throw new Object({
            message: 'Update failed',
            status: HTTP_STATUS_CODE.BAD_REQUEST,
        })
        return res.status(HTTP_STATUS_CODE.OK).json({ success: true })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    create,
    getAll,
    getOne,
    update,
    remove,
    removeAll,
}