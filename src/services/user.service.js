import * as userRepo from '../repositories/user.repository.js';

function sanitizeUser(user) {
    if (!user) return null;
    const { password, ...rest } = user.toObject();
    return rest;
}

export const getUsers = async () => {
    const users = await userRepo.getUsers();
    return users.map(sanitizeUser);
};

export const createUser = async (userData) => {
    const existingUser = await userRepo.getUserByEmail(userData.email);
    if(existingUser){
        const err = new Error("El correo electrónico ya está registrado");
        err.status = 422;
        throw err;
    }
    const newUser = await userRepo.createUser(userData);
    return sanitizeUser(newUser);

};

export const getUserById = async (id) => {
    const user = await userRepo.getUserById(id);
    return user ? sanitizeUser(user) : null;
};

export const updateUser = async (id, userData) => {
    const updatedUser = await userRepo.updateUser(id, userData);
    return updatedUser ? sanitizeUser(updatedUser) : null;
};

export const deleteUser = async (id) => {
    const deletedUser = await userRepo.deleteUser(id);
    return deletedUser ? true : false;
};
