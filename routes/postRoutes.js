
const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');

router.get('/', controller.getFeed);                   
router.post('/', controller.createArticle);            
router.post('/:id/like', controller.likeArticle);       
router.post('/:id/comments', controller.addComment);   

module.exports = router;
