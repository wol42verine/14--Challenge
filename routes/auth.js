const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user by username
    const user = await User.findOne({ where: { username } });
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).render('login', { error: 'Invalid username or password' });
    }
    
    // Set session data
    req.session.user = user; // Assuming session-based authentication
    
    // Redirect to the Dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('login', { error: 'An error occurred during login' });
  }
});

// Handle sign-up
router.get('/signup', (req, res) => {
  res.render('signup'); // Renders the signup page
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).render('signup', { error: 'Username already exists' });
    }

    // Create a new user
    await User.create({ username, password });

    res.redirect('/login'); // Redirect to the login page after successful sign-up
  } catch (error) {
    console.error(error);
    res.status(500).render('signup', { error: 'An error occurred during sign-up' });
  }
});

module.exports = router;
