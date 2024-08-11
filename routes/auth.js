const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Login attempt:', { username, password });

    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log('User not found:', username);
      return res.status(400).render('login', { error: 'Invalid username or password' });
    }

    console.log('User found:', user.username);
    console.log('Stored hashed password:', user.password);
    console.log('Comparing password:', password);
    console.log('Stored hash:', user.password);
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', validPassword);

    if (!validPassword) {
      console.log('Invalid password for user:', username);
      return res.status(400).render('login', { error: 'Invalid username or password' });
    }

    req.session.userId = user.id;
    console.log('Session ID:', req.session.id);
    console.log('Login successful for user:', user.username);

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).render('login', { error: 'An error occurred during login' });
  }
});

// Handle sign-up
router.get('/signup', (req, res) => {
  console.log('GET /signup route hit');
  res.render('signup'); // Renders the signup page
});

router.post('/signup', async (req, res) => {
  console.log('POST /signup route hit'); // Debug log
  const { username, password } = req.body;

  try {
    console.log('Sign-up attempt for user:', username);

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      console.log('Username already exists:', username);
      return res.status(400).render('signup', { error: 'Username already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({ username, password: hashedPassword });

    console.log('User signed up:', username, password);

    res.redirect('/login'); // Redirect to the login page after successful sign-up
  } catch (error) {
    console.error('Sign-up error:', error);
    res.status(500).render('signup', { error: 'An error occurred during sign-up' });
  }
});

// Handle logout
router.post('/logout', (req, res) => {
  console.log('POST /logout route hit');
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('An error occurred during logout');
    }
    res.redirect('/login');
  });
});

module.exports = router;

