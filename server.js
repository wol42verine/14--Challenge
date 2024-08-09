// server.js
const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const authMiddleware = require('./middleware/authMiddleware'); // Import the middleware
const sessionTimeout = require('./middleware/sessionTimeout'); // Import the session timeout middleware
const methodOverride = require('method-override');
const { User, Post } = require('./models'); // Import models and associations


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Support for method overrides

// Session management
const sess = {
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 5 * 60 * 1000, // Set session timeout to 5 minutes (in milliseconds)
    secure: false, // Use true if HTTPS is enabled
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess)); // Apply session middleware

app.use(sessionTimeout); // Apply session timeout middleware

// Handlebars setup
const hbs = create({
  defaultLayout: 'main',
  extname: '.handlebars',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const postRoutes = require('./routes/post');
const mainRoutes = require('./routes');

// Public routes (e.g., login, signup)
app.use('/login', authRoutes); // Authentication routes (e.g., login, signup)

// Protected routes
app.use('/dashboard', authMiddleware, dashboardRoutes); // Apply auth middleware to dashboard routes
app.use('/post', authMiddleware, postRoutes); // Apply auth middleware to posts routes

// Home route should be public
app.use('/', mainRoutes); // Other routes (e.g., homepage)

// Database connection
// sequelize.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch(err => console.error('Database connection error:', err));

// Database connection and synchronization
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');

    // Synchronize the database
    return sequelize.sync({ force: false }); // Use { force: true } to drop and recreate tables
  })
  .then(() => {
    console.log('Database synchronized');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
