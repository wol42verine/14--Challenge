const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error while destroying session:', err);
      return res.status(500).send('An error occurred while logging out');
    }
    res.redirect('/'); // Redirect to homepage or login page
  });
});

module.exports = router;
