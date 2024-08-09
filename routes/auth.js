const express = require('express');
const session = require('express-session');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcrypt'); // For password hashing
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Middleware setup
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(session({
  secret: '17011701', // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

console.log('Middleware setup complete');

// Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).render('login', { error: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).render('login', { error: 'Invalid username or password' });
    }

    req.session.userId = user.id;
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

    console.log('User signed up:', username);

    res.redirect('/login'); // Redirect to the login page after successful sign-up
  } catch (error) {
    console.error('Sign-up error:', error);
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
