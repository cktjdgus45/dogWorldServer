import express from 'express';
import 'express-async-errors';
import * as postController from '../controller/post.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /posts
// GET /posts?username=:username
router.get('/', isAuth, postController.getPosts);

// GET /posts/:id
router.get('/:id', isAuth, postController.getPost);

// POST /posts
router.post('/', isAuth, postController.createPost);

// PUT /posts/:id
router.put('/:id', isAuth, postController.updatePost);

// DELETE /posts/:id
router.delete('/:id', isAuth, postController.deletePost);

export default router;
