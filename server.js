require('dotenv').config();

const express = require('express');
const { create } = require('express-handlebars'); // Import the create function
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Import Sequelize store
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
const sess = {
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Handlebars setup
const hbs = create({
  defaultLayout: 'main',
  extname: '.handlebars',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});

// Set up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard'); // Import dashboard routes
const postRoutes = require('./routes/post'); // Import post routes
const mainRoutes = require('./routes'); // Ensure this points to the correct file

app.use('/dashboard', dashboardRoutes); // Dashboard routes
app.use('/post', postRoutes); // Post routes (make sure this is correct)
app.use('/', authRoutes); // Authentication routes (e.g., login, signup)
app.use('/', mainRoutes); // Other routes (e.g., homepage)

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
