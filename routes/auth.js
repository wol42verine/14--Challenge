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

       // Temporarily bypass password validation
    const validPassword = true; // Bypass password validation
    console.log('Password valid:', validPassword);

    // const validPassword = await bcrypt.compare(password, user.password);
    // console.log('Password valid:', validPassword);

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

// Handle signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Sign-up attempt for user:', username);

    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      console.log('User already exists:', username);
      return res.status(400).render('signup', { error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    console.log('User signed up:', newUser.username);

    req.session.userId = newUser.id;
    console.log('Session ID:', req.session.id);
    console.log('Signup successful for user:', newUser.username);

    res.redirect('/login');
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).render('login', { error: 'An error occurred during signup' });
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

