import User from '../models/User.model.js';

export async function createUser(data) {
    const newUser = new User(data);
    return await newUser.save();
}

export async function getUsers() {
    return await User.find();
}

export async function getUserById(id) {
    return await User.findById(id);
}

export async function getUserByEmail(email) {
    return await User.findOne({ email });
}

export async function updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteUser(id) {
    return await User.findByIdAndDelete(id);
}