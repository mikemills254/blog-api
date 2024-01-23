import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User' 
    },
    body: { 
        type: String, 
        required: true 
    }
}, { timestamps: true }); 

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide a username']
    },
    password: {
        type: String,
        minlength: [8, 'Password should be at least 8 characters'],
        required: [true, 'Please provide a password']
    },
    email: {
        type: String,   
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        required: [true, 'Please provide an email address']
    },
    blogs: {
        type: [BlogSchema]
    }
});

const User = mongoose.model('User', UserSchema);
const Blog = mongoose.model('Blog', BlogSchema);

export { User, Blog };
