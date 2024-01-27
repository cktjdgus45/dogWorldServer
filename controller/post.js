import * as postRepository from '../data/post.js';
import { handleUpload } from '../utils/cloudinary.js';

export const getPosts = async (req, res, next) => {
    const username = req.query.username;
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
    let fileUrl;
    if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cloudinaryResponse = await handleUpload(dataURI);
        fileUrl = cloudinaryResponse.secure_url;
    }
    console.log(fileUrl);
    const post = await postRepository.create(text, fileUrl ?? "", req.userId);
    res.status(201).json(post);
}

export const updatePost = async (req, res, next) => {
    const postId = req.params.id;
    let fileUrl;
    const { text, existUrl } = req.body;
    if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cloudinaryResponse = await handleUpload(dataURI);
        fileUrl = cloudinaryResponse.secure_url;
    } else {
        fileUrl = existUrl
    }
    const post = await postRepository.getById(postId);
    if (!post) {
        return res.sendStatus(404);
    }
    if (post.userId !== req.userId) {
        return res.sendStatus(403);
        //HTTP 403 is an HTTP status code meaning access
        // to the requested resource is forbidden.
    }
    const updatedPost = await postRepository.update(postId, text, fileUrl ?? "");
    res.status(200).json(updatedPost);
    res.status(404).json({ message: `Post id(${postId}) not found` })
}

export const deletePost = async (req, res, next) => {
    const id = req.params.id;
    const post = await postRepository.getById(id);
    if (!post) {
        return res.sendStatus(404);
    }
    if (post.userId !== req.userId) {
        return res.sendStatus(403);
        //HTTP 403 is an HTTP status code meaning access
        // to the requested resource is forbidden.
    }
    await postRepository.remove(id);
    res.sendStatus(204)
}