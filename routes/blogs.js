import express from "express"
import sendResponce from "../helpers/sendResponce.js"
import Joi from "joi"
import Blog from "../models/Blog.js"

const router = express.Router()

const blogSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    tag: Joi.string().required(),
})

router.post("/addBlog", (req, res) => {
    try {
        const { value, error } = blogSchema.validate(req.body)
        console.log(req.user.id)
        if (error) return sendResponce(res, 402, true, null, error.message)

        const { title, description, tag } = value
        const user = {
            title,
            description,
            tag,
            user: req.user.id
        }
        console.log({ ...user })
        let newBlog = new Blog({ ...user })
        newBlog = newBlog.save()

        return sendResponce(res, 202, false, newBlog, "blog created successfully")
    } catch (error) {
        console.log("===========Internal Server Error==========", error)
        return sendResponce(res, 404, error, null, "Internal Server Error")
    }
})


router.post("/fetchBlogs", async (req, res) => {
    try {
        const blogs = await Blog.findOne({ user: req.user.id })

        return sendResponce(res, 202, false, blogs, "blog fetched successfully")
    } catch (error) {
        console.log("===========Internal Server Error==========", error)
        return sendResponce(res, 404, error, null, "Internal Server Error")
    }
})



export { router as blogsRoutes }