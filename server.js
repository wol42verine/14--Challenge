const express = require('express');
const { engine } = require('express-handlebars'); // Correct import
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars setup
app.engine('handlebars', engine()); // Use `engine` from `express-handlebars`
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Import and use routes
const postRoutes = require('./routes/postRoutes');
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
