const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Ensure this path is correct

// Route to view an individual post
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).render('404', { error: 'Post not found' }); // Handle post not found
    }

    res.render('post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'An error occurred while fetching the post' });
  }
});

module.exports = router;
