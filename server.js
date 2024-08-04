require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars').create; // Import the create function
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management (if needed)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Handlebars setup
const hbs = exphbs({
  defaultLayout: 'main',
  extname: '.handlebars',
});

app.engine('handlebars', hbs.engine); // Use the engine property
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes'); // Ensure this points to the correct file

app.use('/', authRoutes);
app.use('/', mainRoutes); // This will handle other routes like homepage

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
