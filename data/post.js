let posts = [ //임시 DATABASE역할..
    {
        id: '1',
        text: '포포',
        createdAt: Date.now().toString(),
        name: 'popo',
        username: 'popo',
        url: "https://picsum.photos/300/300"
    },
    {
        id: '2',
        text: '포포리',
        createdAt: Date.now().toString(),
        name: 'popo2',
        username: 'popo2',
        url: "https://picsum.photos/300/300"
    },
];

export const getAll = async () => posts;
export const getAllByUsername = async (username) => posts.filter(post => post.username === username);
export const getById = async (id) => posts.find(post => post.id === id);
export const create = async (text, name, username) => {
    const post = {
        id: Date.now().toString(),
        text,
        createdAt: Date.now().toString(),
        name,
        username,
        url: "https://picsum.photos/300/300"
    }
    posts = [post, ...posts]; //data update
    return post;
}
export const update = async (id, text) => {
    const post = posts.find(post => post.id === id);
    if (post) {
        post.text = text;
    }
    return post;
}
export const remove = async (id) => {
    posts.filter(post => post.id !== id);
}