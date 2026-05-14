import Product from '../models/Product.model.js';

export async function createProduct(data) {
    const newProduct = new Product(data);
    return await newProduct.save();
}

export async function getProducts() {
    return await Product.find();
}

export async function getProductById(id) {
    return await Product.findById(id);
}

export async function updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
}