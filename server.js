require('dotenv').config();

const sequelize = require('./config/connection');

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection error:', err));

const express = require('express');
const exphbs = require('express-handlebars').create; // Import the create function
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize the handlebars engine
const hbs = exphbs({
  // Add any handlebars options here
  defaultLayout: 'main',
  extname: '.handlebars'
});

app.engine('handlebars', hbs.engine); // Use the engine property
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Import and use routes
const routes = require('./routes');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
