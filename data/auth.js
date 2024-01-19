import { db } from '../db/database.js';

export const findByUsername = async (username) => {
    return db.execute('SELECT * FROM users WHERE username=?', [username])
        .then(result => {
            return result[0][0];
        })
}
export const findById = async (verifiedJwtPayloadId) => {
    return db.execute('SELECT * FROM users WHERE id=?', [verifiedJwtPayloadId])//?=[]
        .then(result => {
            return result[0][0];
        })
}
export const updateById = async (id, username, url) => {
    return db.execute('UPDATE users SET username=?, url=? WHERE id=?', [username, url, id])
        .then(() => findById(id));
}
export const createUser = async ({ username, password, name, email, url }) => {
    return db.execute('INSERT INTO users (username,password,name,email,url) VALUES (?,?,?,?,?)', [
        username, password, name, email, url
    ]).then((result) => {
        // @ts-ignore
        return result[0].insertId;
    });
}