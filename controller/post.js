import * as postRepository from '../data/post.js';

export const getPosts = (req, res, next) => {
    const username = req.query.username;
    console.log(username)
    const data = username ? postRepository.getAllByUsername(username) :
        postRepository.getAll();
    res.status(200).json(data);
}

export const getPost = (req, res, next) => {
    const id = req.params.id;
    const post = postRepository.getById(id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `Post id(${id}) not found` });
    }
}

export const createPost = (req, res, next) => {
    const { text, name, username } = req.body;
    const post = postRepository.create(text, name, username);
    res.status(201).json(post);
}

export const updatePost = (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const post = postRepository.update(id, text);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `Post id(${id}) not found` })
    }
}

export const deletePost = (req, res, next) => {
    const id = req.params.id;
    postRepository.remove(id);
    res.sendStatus(204)
}