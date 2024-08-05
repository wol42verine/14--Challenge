// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
  if (req.session.user) {
    // User is logged in, proceed to the next middleware or route handler
    return next();
  }
  
  // User is not logged in, redirect to the login page with a message
  res.render('login', { error: 'Please log in to access this page.' });
};

module.exports = authMiddleware;
