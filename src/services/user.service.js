import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepo from '../repositories/user.repository.js';
import { env } from '../config/env.js';

function sanitizeUser(user) {
    if (!user) return null;
    const { password, ...rest } = user.toObject();
    return rest;
}

export const loginUser = async (email, password) => {
    const user = await userRepo.getUserByEmail(email);
    if (!user) {
        const err = new Error("Correo electrónico o contraseña incorrectos");
        err.status = 401;
        throw err;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        const err = new Error("Correo electrónico o contraseña incorrectos");
        err.status = 401;
        throw err;
    }
    const token = jwt.sign({ id: user._id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
    return { user: sanitizeUser(user), token };
};

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
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await userRepo.createUser({ ...userData, password: hashedPassword });
    return sanitizeUser(newUser);
}

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
