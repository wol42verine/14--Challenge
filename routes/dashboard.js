const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post'); // Assuming you have a Post model

// Ensure user is authenticated
const withAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

// Dashboard route
router.get('/', withAuth, async (req, res) => {
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
router.post('/new-post', withAuth, async (req, res) => {
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
