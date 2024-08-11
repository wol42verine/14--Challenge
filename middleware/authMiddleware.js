const authMiddleware = (req, res, next) => {
  console.log('Auth Middleware:', req.session.userId);
  if (req.session.userId) {
    return next(); // User is authenticated, proceed to the next middleware
  } else {
    res.redirect('/login'); // Redirect to login if not authenticated
  }
};

module.exports = authMiddleware;
