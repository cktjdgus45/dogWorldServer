import express from 'express';
import 'express-async-errors';
import * as postController from '../controller/post.js';

const router = express.Router();

// GET /posts
// GET /posts?username=:username
router.get('/', postController.getPosts);

// GET /posts/:id
router.get('/:id', postController.getPost);

// POST /posts
router.post('/', postController.createPost);

// PUT /posts/:id
router.put('/:id', postController.updatePost);

// DELETE /posts/:id
router.delete('/:id', postController.deletePost);

export default router;
