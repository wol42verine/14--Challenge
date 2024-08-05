// middleware/authMiddleware.js
module.exports = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login'); // Redirect to login page if not authenticated
    }
    next();
  };
  