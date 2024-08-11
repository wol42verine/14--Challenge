// middleware/sessionTimeout.js
// module.exports = (req, res, next) => {
//     if (req.session && req.session.cookie && req.session.cookie.expires) {
//       const now = new Date();
//       if (now > req.session.cookie.expires) {
//         req.session.destroy(err => {
//           if (err) {
//             console.error('Session destroy error:', err);
//           }
//           return res.redirect('/login'); // Redirect to login page after timeout
//         });
//       } else {
//         req.session.cookie.expires = new Date(now.getTime() + 5 * 60 * 1000); // Extend session
//       }
//     }
//     next();
//   };
  
const sessionTimeout = (req, res, next) => {
  console.log('Session Timeout Middleware:', req.session.cookie.expires);
  // Add your session timeout logic here
  next();
};

module.exports = sessionTimeout;
