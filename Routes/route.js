import Router from 'express'
import * as auth from '../Controller/authcontroller.js'
import * as blog from '../Controller/blogcontroller.js'
import authenticate from '../Middleware/authenticate.js'

const router = Router()

router.route('/register').post(auth.register)

router.route('/login').post(auth.login)

router.route('/post-blog').post( authenticate, blog.postBlog )

router.route('/get-blog').get( blog.getAllBlogs )

router.route('/get-blogs/:id').get( authenticate, blog.getBlogById )

router.route('/delete-blog/:id').delete( authenticate, blog.deleteBlog )

router.route('/edit-blog/:id').put( authenticate, blog.editBlog )

export default router