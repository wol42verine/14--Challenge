const authMiddleware = (req, res, next) => {
  if (req.session.userId) {
    return next(); // User is logged in, proceed to the next middleware or route
  }
  // User is not logged in, redirect to the login page with a message
  res.redirect('/login'); // Use redirect instead of rendering the login page with an error message
};

module.exports = authMiddleware;
