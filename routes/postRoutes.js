const router = require('express').Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
// Add other routes for creating, updating, deleting posts

module.exports = router;
