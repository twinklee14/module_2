const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    author: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;