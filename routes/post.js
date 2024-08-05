const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment'); // Import Comment model

// Route to view an individual post along with its comments
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [{ model: Comment, as: 'comments' }] // Ensure the alias is correct
    });

    if (!post) {
      return res.status(404).render('404', { error: 'Post not found' });
    }

    res.render('post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'An error occurred while fetching the post' });
  }
});

// Route to delete a post
router.delete('/:id', async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect('/dashboard'); // Redirect to the dashboard or another page
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the post');
  }
});

// Route to add a comment to a post
router.post('/:postId/comments', async (req, res) => {
  const { content } = req.body;
  try {
    await Comment.create({
      content,
      postId: req.params.postId,
      userId: req.session.user.id, // Assuming user ID is in session
    });
    res.redirect(`/post/${req.params.postId}`); // Redirect to the post page
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while adding the comment');
  }
});

module.exports = router;
