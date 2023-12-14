//abc123 : $2b$12$zFYHgd7ApQ210axtYI9B1eAZhR0HWfov5gBjYVE2eopuaGgD/Ai3.
//token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MDI1Mjc4Njk5NTUiLCJpYXQiOjE3MDI1Mjc4NjksImV4cCI6MTcwMjcwMDY2OX0.CQImtWcLl-HYybm7YAvX1mf7L4rIWCUV40Eu11xHLow
let users = [
    {
        id: "1", //사용자의 고유한 아이디 (database)
        password: "$2b$12$zFYHgd7ApQ210axtYI9B1eAZhR0HWfov5gBjYVE2eopuaGgD/Ai3.", //사용자 비밀번호
        email: "cktjdgus45@naver.com", //이메일
        name: "차성현", //사용자 이름
        username: "popo", //사용자 닉네임
        url: "https://picsum.photos/300/300"//사용자 프로파일 사진 url
    },
    {
        id: "2", //사용자의 고유한 아이디 (database)
        password: "$2b$12$zFYHgd7ApQ210axtYI9B1eAZhR0HWfov5gBjYVE2eopuaGgD/Ai3.", //사용자 비밀번호
        email: "cktjdgus456@naver.com", //이메일
        name: "차성현2", //사용자 이름
        username: "popory", //사용자 닉네임
        url: "https://picsum.photos/300/300"//사용자 프로파일 사진 url
    },

]

export const findByUsername = async (username) => {
    const user = users.find(user => user.username === username);
    return users.find(user => user.username === username);
}
export const findById = async (verifiedJwtPayloadId) => {
    return users.find(user => user.id === verifiedJwtPayloadId);
}

export const createUser = async ({ username, password, name, email, url }) => {
    const user = {
        id: Date.now().toString(), //사용자의 고유한 아이디 (database)
        password, //사용자 비밀번호
        email, //이메일
        name, //사용자 이름
        username, //사용자 닉네임
        url: "https://picsum.photos/300/300" //사용자 프로파일 사진 url
    }
    users = [user, ...users];
    return user.id;
}