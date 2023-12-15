import * as userRepository from '../data/auth.js'

let posts = [ //임시 DATABASE역할..
    {
        id: '1',
        text: '포포',
        createdAt: new Date().toString(),
        // name: 'popo',
        // username: 'popo',
        // url: "https://picsum.photos/300/300" user 와 post를 분리.
        userId: '1',
    },
    {
        id: '2',
        text: '포포리',
        createdAt: new Date().toString(),
        // name: 'popo2',
        // username: 'popo2',
        // url: "https://picsum.photos/300/300",  user 와 post를 분리.
        userId: '2',
    },
];

export const getAll = async () => {
    return Promise.all(
        posts.map(async (post) => {
            // @ts-ignore
            const { username, name, url } = await userRepository.findById(post.userId);
            return { ...post, username, name, url };
        })
    )
}
export const getAllByUsername = async (username) => {
    return getAll().then((posts) => posts.filter((post) => post.username === username));
}

export const getById = async (id) => {
    const myPost = posts.find((post) => post.id === id);
    if (!myPost) {
        return null;
    }
    // @ts-ignore
    const { username, name, url } = await userRepository.findById(myPost.userId);
    return { ...myPost, username, name, url };
}
export const create = async (text, userId) => {
    const post = {
        id: Date.now().toString(),
        text,
        createdAt: Date.now().toString(),
        userId,
    }
    posts = [post, ...posts]; //data update
    return getById(post.id);
}
export const update = async (id, text) => {
    const post = posts.find(post => post.id === id);
    if (!post) {
        return null;
    }
    post.text = text;
    return getById(post.id);
}
export const remove = async (id) => {
    posts.filter(post => post.id !== id);
}