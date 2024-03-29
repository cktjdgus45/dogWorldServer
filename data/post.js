import * as userRepository from '../data/auth.js'
import { db } from '../db/database.js';


const SELECT_JOIN = 'SELECT ps.id,ps.text,ps.createdAt,ps.userId,ps.fileUrl,us.username,us.name,us.url FROM posts as ps JOIN users as us ON ps.userId=us.id';
const COMMENT_JOIN = 'SELECT cm.id,cm.text,cm.createdAt,us.name,us.username,us.url FROM comments as cm JOIN users as us ON cm.userId = us.id';
const ORDER_DESC = 'ORDER BY ps.createdAt DESC';
export const getAll = async () => {
    return db
        .execute(`${SELECT_JOIN} ${ORDER_DESC}`)
        .then((result) => result[0]);
}
export const getAllByUsername = async (username) => {
    return db
        .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
        .then((result) => result[0]);
}

export const getById = async (id) => {
    return db
        .execute(`${SELECT_JOIN} WHERE ps.id=?`, [id])
        .then((result) => result[0][0]);
}
export const getCommentsById = async (postId) => {
    return db
        .execute(`${COMMENT_JOIN} WHERE cm.postId = ?`, [postId])
        .then((result) => result[0]);
}
export const create = async (text, fileUrl, userId) => {
    return db.execute('INSERT INTO posts (text,fileUrl,createdAt,userId) VALUES(?,?,?,?)', [text, fileUrl, new Date(), userId])
        // @ts-ignore
        .then((result) => getById(result[0].insertId))
}
export const createComments = async (text, postId, userId) => {
    return db.execute('INSERT INTO comments (postId,text,createdAt,userId) VALUES(?,?,?,?)', [postId, text, new Date(), userId])
        // @ts-ignore
        .then((result) => getCommentsById(postId));
}
export const update = async (id, text, fileUrl) => {
    return db.execute('UPDATE posts SET text=?,fileUrl=? WHERE id=?', [text, fileUrl, id])
        .then(() => getById(id));
}
export const remove = async (id) => {
    return db.execute('DELETE FROM posts WHERE id=?', [id]);
}