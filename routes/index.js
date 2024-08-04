const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll(); // Retrieve all posts
    res.render('homepage', { posts }); // Render the homepage view with posts
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching posts.' });
  }
});

// GET route for login page
router.get('/login', (req, res) => {
  res.render('login'); // Ensure 'login.handlebars' exists in the 'views' directory
});

// POST route for login handling
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Add your login logic here
  // For example, authenticate the user and redirect or show an error message
  try {
    // Example authentication logic (replace with real logic)
    const user = await User.findOne({ where: { username } });
    if (user && user.password === password) {
      // Login successful
      res.redirect('/'); // Redirect to homepage or another page
    } else {
      // Login failed
      res.status(401).render('login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
});

module.exports = router;
