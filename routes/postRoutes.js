const router = require('express').Router();
const { Post } = require('../models'); // Adjust the path as needed

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll(); // Retrieve all posts
    res.render('homepage', { posts }); // Render the homepage view with posts
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching posts.' });
  }
});

module.exports = router;
