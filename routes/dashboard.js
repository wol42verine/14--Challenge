const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Import your Post model
const authMiddleware = require('../middleware/authMiddleware'); // Import your auth middleware

// Ensure user is authenticated for all routes
router.use(authMiddleware);

// Dashboard route
router.get('/', async (req, res) => {
  try {
    const user = req.session.user;
    const posts = await Post.findAll({
      where: { userId: user.id }, // Adjust according to your model relationship
    });

    res.render('dashboard', {
      user,
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('dashboard', { error: 'An error occurred while loading the dashboard' });
  }
});

// Handle creating a new post
router.post('/new-post', async (req, res) => {
  const { title, content } = req.body;
  try {
    await Post.create({
      title,
      content,
      userId: req.session.user.id, // Adjust according to your model relationship
    });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('dashboard', { error: 'An error occurred while creating the post' });
  }
});

module.exports = router;
