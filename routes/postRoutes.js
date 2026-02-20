const express = require('express');
const router = express.Router();
const Post = require('./../models/post');
const { jwtauth } = require('../jwt');
router.post('/', jwtauth, async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                error: "Title and content are required"
            });
        }
        const newPost = new Post({
            title,
            content,
            author: req.user.id 
        });
        const savedPost = await newPost.save();
        return res.status(201).json({
            message: "Post created successfully",
            post: savedPost
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});
module.exports=router;