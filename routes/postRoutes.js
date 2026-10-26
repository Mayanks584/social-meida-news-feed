// ---------- Maps URLs to controller functions ----------
const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');

router.get('/', controller.getFeed);                    // GET  /api/articles
router.post('/', controller.createArticle);             // POST /api/articles
router.post('/:id/like', controller.likeArticle);       // POST /api/articles/1/like
router.post('/:id/comments', controller.addComment);    // POST /api/articles/1/comments

module.exports = router;
