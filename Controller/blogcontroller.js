import { Blog } from '../Model/model.js';

export const postBlog = async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({ error: 'Title and body are required.' });
        }

        const blog = new Blog({
            title,
            author: req.user._id,
            body,
        });

        await blog.save();

        return res.status(201).json({ 
            message: 'Blog posted successfully.', 
            data: blog 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Internal server error.',
            error: error
        });
    }
};


export const editBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found.' });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized: You are not the author of this blog.' });
        }

        blog.title = title ?? blog.title;
        blog.body = body ?? blog.body;

        await blog.save();

        return res.status(200).json({ 
            msg: 'Blog edited successfully.',
            data: blog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized: You are not the author of this blog.' });
        }

        const deletedBlog = await Blog.findByIdAndDelete(id);

        return res.status(200).json({ 
            msg: 'Blog deleted successfully.', 
            data: deletedBlog 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Internal server error.',
            error: error 
        });
    }
};


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();

        return res.status(200).json({ 
            message: 'Success',
            data: blogs 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Internal server error.',
            error: error
        });
    }
};


export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ 
                message: "Blog not found"
            });
        }

        return res.status(200).json({ 
            message: "Success",
            data: blog 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Internal server error.',
            error: error
        });
    }
};
