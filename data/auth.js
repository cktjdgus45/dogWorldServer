//abc123 : $2b$12$zFYHgd7ApQ210axtYI9B1eAZhR0HWfov5gBjYVE2eopuaGgD/Ai3.
//token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MDI1Mjc4Njk5NTUiLCJpYXQiOjE3MDI1Mjc4NjksImV4cCI6MTcwMjcwMDY2OX0.CQImtWcLl-HYybm7YAvX1mf7L4rIWCUV40Eu11xHLow
let users = [
    {
        id: "1", //������� ������ ���̵� (database)
        password: "$2b$12$zFYHgd7ApQ210axtYI9B1eAZhR0HWfov5gBjYVE2eopuaGgD/Ai3.", //����� ��й�ȣ
        email: "cktjdgus45@naver.com", //�̸���
        name: "������", //����� �̸�
        username: "popo", //����� �г���
        url: "https://picsum.photos/300/300"//����� �������� ���� url
    },
    {
        id: "2", //������� ������ ���̵� (database)
        password: "$2b$12$zFYHgd7ApQ210axtYI9B1eAZhR0HWfov5gBjYVE2eopuaGgD/Ai3.", //����� ��й�ȣ
        email: "cktjdgus456@naver.com", //�̸���
        name: "������2", //����� �̸�
        username: "popory", //����� �г���
        url: "https://picsum.photos/300/300"//����� �������� ���� url
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
        id: Date.now().toString(), //������� ������ ���̵� (database)
        password, //����� ��й�ȣ
        email, //�̸���
        name, //����� �̸�
        username, //����� �г���
        url: "https://picsum.photos/300/300" //����� �������� ���� url
    }
    users = [user, ...users];
    return user.id;
}