const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const authMiddleware = require('../middleware/authMiddleware'); // Import your auth middleware

// Ensure user is authenticated for all routes
router.use(authMiddleware);

// Dashboard route
router.get('/', async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId);
    const posts = await Post.findAll({
      where: { userId: req.session.userId },
      include: [User], // Include user if necessary
    });

    res.render('dashboard', { posts });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).render('dashboard', { error: 'An error occurred while fetching posts' });
  }
});

// Handle creating a new post
router.post('/new-post', async (req, res) => {
  const { title, content } = req.body;
  try {
    await Post.create({
      title,
      content,
      userId: req.session.userId, // Adjust according to your model relationship
    });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('dashboard', { error: 'An error occurred while creating the post' });
  }
});

module.exports = router;
