import express from 'express';
import 'express-async-errors';
import * as postRepository from '../data/post.js';

const router = express.Router();

// GET /posts
// GET /posts?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username;
    console.log(username)
    const data = username ? postRepository.getAllByUsername(username) :
        postRepository.getAll();
    res.status(200).json(data);
})
// GET /posts/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const post = postRepository.getById(id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `Post id(${id}) not found` });
    }
})
// POST /posts
router.post('/', (req, res, next) => {
    const { text, name, username } = req.body;
    const post = postRepository.create(text, name, username);
    res.status(201).json(post);
})
// PUT /posts/:id
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const post = postRepository.update(id, text);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `Post id(${id}) not found` })
    }
})
// DELETE /posts/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    postRepository.remove(id);
    res.sendStatus(204)
})

export default router;
