const express = require("express");
const router = express.Router();
const Post = require('../models/Post');

// we don't need to do `/posts` because we've already declared in app.js


// Get back all the posts.
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
// Submit a post.
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    // 1st way
    // const savedPost = await post.save().then(data => {
    //     res.status(200).json(data);
    // }).catch(err => {
    //     res.status(404).json({ message: err });
    // });
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
// Get back a single post.
router.get('/:postId', async (req, res) => {
    console.log(req.params.postId);
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
// Delete Post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.status(200).json(removedPost);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// Update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title, description: req.body.description } });
        res.status(200).json(updatePost);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// the code below has actual route of `/posts/specific`
// router.get('/specific', (req, res) => {
//     res.send(`Specific Post`);
// });

// the line below is same as above but old syntax
module.exports = router;