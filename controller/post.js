import * as postRepository from '../data/post.js';

export const getPosts = async (req, res, next) => {
    const username = req.query.username;
    console.log(username)
    const data = await (username ? postRepository.getAllByUsername(username) :
        postRepository.getAll());
    res.status(200).json(data);
}

export const getPost = async (req, res, next) => {
    const id = req.params.id;
    const post = await postRepository.getById(id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `Post id(${id}) not found` });
    }
}

export const createPost = async (req, res, next) => {
    const { text } = req.body;
    const post = await postRepository.create(text, req.userId);
    res.status(201).json(post);
}

export const updatePost = async (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const post = await postRepository.update(id, text);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `Post id(${id}) not found` })
    }
}

export const deletePost = async (req, res, next) => {
    const id = req.params.id;
    await postRepository.remove(id);
    res.sendStatus(204)
}