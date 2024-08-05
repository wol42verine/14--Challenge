const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcrypt'); // For password hashing

// Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user by username
    const user = await User.findOne({ where: { username } });
    
    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).render('login', { error: 'Invalid username or password' });
    }
    
    // Set session data (store only essential data)
    req.session.user = { id: user.id, username: user.username }; // Example of essential data
    
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

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({ username, password: hashedPassword });

    res.redirect('/login'); // Redirect to the login page after successful sign-up
  } catch (error) {
    console.error(error);
    res.status(500).render('signup', { error: 'An error occurred during sign-up' });
  }
});

// Handle logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).render('error', { error: 'An error occurred during logout' });
    }
    res.redirect('/login'); // Redirect to login page after logout
  });
});

module.exports = router;
