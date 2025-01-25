import express from "express"
import sendResponce from "../helpers/sendResponce.js"
import Joi from "joi"
import Blog from "../models/Blog.js"
import authenticateUser from "../middlewares/authenticateUser.js"
import { upload } from "../middlewares/multer_middlware.js"

const router = express.Router()

const blogSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    tag: Joi.string().required(),
    image: Joi.optional()  // Allow image field
});

router.post("/addBlog", authenticateUser, upload.single('blog_image'), (req, res) => {
    try {

        const { title, description, tag } = req.body
        console.log({
            title,
            description,
            tag,
            image: req.image
        })

        const newBlog = new Blog({
            title,
            description,
            tag,
        })

        return sendResponce(res, 202, false, {}, "blog created successfully")
    } catch (error) {
        console.log("===========Internal Server Error==========", error)
        return sendResponce(res, 404, error, null, "Internal Server Error")
    }
})


router.post("/fetchBlogs", authenticateUser, async (req, res) => {
    try {
        try {

            const { title, description, tag } = req.body
            console.log({
                title,
                description,
                tag,
                image: req.image
            })

            return sendResponce(res, 202, false, {}, "blog created successfully")
        } catch (error) {
            console.log("===========Internal Server Error==========", error)
            return sendResponce(res, 404, error, null, "Internal Server Error")
        }

        return sendResponce(res, 202, false, blogs, "blog fetched successfully")
    } catch (error) {
        console.log("===========Internal Server Error==========", error)
        return sendResponce(res, 402, true, null, `Internal server error ${error}`, error)
    }
})

router.post("/updateBlog:id", (req, res) => {

})

router.get("/fetchAllBlogs", async (req, res) => {
    try {
        const blogs = await Blog.find()

        return sendResponce(res, 202, false, blogs, "blogs fetched successfully")
    } catch (error) {
        console.log("===========Internal Server Error==========", error)
        return sendResponce(res, 402, true, null, `Internal server error ${error}`, error)
    }
})



export { router as blogsRoutes }