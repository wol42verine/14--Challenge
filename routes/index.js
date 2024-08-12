const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll(); // Retrieve all posts
    const user = req.session.user; // Get the logged-in user from the session
    res.render('homepage', { posts, user }); // Render the homepage view with posts and user
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
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     // Example authentication logic (replace with real logic)
//     const user = await User.findOne({ where: { username } });
//     if (user && user.password === password) {
//       // Login successful
//       req.session.user = user; // Store user in session
//       res.redirect('/dashboard'); // Redirect to homepage or another page
//     } else {
//       // Login failed
//       res.status(401).render('login', { error: 'Invalid username or password' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred during login.' });
//   }
// });

module.exports = router;
