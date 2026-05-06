import * as userRepo from '../repositories/user.repository.js';

export const getAll = async () => {
    return await userRepo.findAll();
};

export const getById = async (id) => {
    const users = await userRepo.findAll();
    return users.find(user => user.id === parseInt(id));
}