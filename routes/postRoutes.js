const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Route to get a specific post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          as: 'comments', // Ensure this matches the alias used in the association
        },
      ],
    });
    if (post) {
      res.render('post', { post });
    } else {
      res.status(404).render('404', { error: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'An error occurred' });
  }
});

router.delete('/:id', (req, res) => {
  console.log(`DELETE request to /post/${req.params.id}`); // Debug log
  // your existing code
});

module.exports = router;