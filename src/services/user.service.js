//import * as userRepo from '../repositories/user.repository.js';

let users = [
    { id: 1, name: "Juan", email: "juan@example.com", password: "pass123" },
    { id: 2, name: "Maria", email: "maria@example.com", password: "maria456" },
    { id: 3, name: "Carlos", email: "carlos@example.com", password: "carlos789" },
    { id: 4, name: "Laura", email: "laura@example.com", password: "laura321" },
    { id: 5, name: "Ana", email: "ana@example.com", password: "ana654" },
    { id: 6, name: "Pedro", email: "pedro@example.com", password: "pedro987" },
    { id: 7, name: "Lucas", email: "lucas@example.com", password: "lucas111" },
    { id: 8, name: "Sofia", email: "sofia@example.com", password: "sofia222" },
    { id: 9, name: "Diego", email: "diego@example.com", password: "diego333" },
    { id: 10, name: "Valentina", email: "valentina@example.com", password: "val10" },
];

function generateId() {
    return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
}

function sanitizeUser(user) {
    if (!user) return null;
    const { password, ...rest } = user;
    return rest;
}

export const getUsers = async () => {
    return users.map(sanitizeUser);
};

export const createUser = async (userData) => {
    const newUser = { ...userData, id: generateId() };
    users.push(newUser);
    return sanitizeUser(newUser);
};

export const getUserById = async (id) => {
    const index = users.findIndex((user) => user.id === parseInt(id));
    return index !== -1 ? sanitizeUser(users[index]) : null;
};

export const updateUser = async (id, userData) => {
    const index = users.findIndex((user) => user.id === parseInt(id));
    if (index !== -1) {
        users[index] = { ...users[index], ...userData };
        return sanitizeUser(users[index]);
    }
    return null;
};

export const deleteUser = async (id) => {
    const index = users.findIndex((user) => user.id === parseInt(id));
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
};
