import * as cartRepo from "../repositories/cart.repository.js";
import * as productRepo from "../repositories/product.repository.js";

function calcTotal(cart) {
    if (!cart || !cart.items.length) return 0;
    return cart.items.reduce((sum, item) => {
        const price = item.product?.price || 0;
        return sum + (price * item.quantity);
    }, 0);
}

export const getCart = async (userId) => {
    let cart = await cartRepo.findByUser(userId);
    if (!cart) cart = await cartRepo.createCart(userId);
    return { cart, total: calcTotal(cart) };
}

export const addToCart = async (userId, productId, quantity = 1) => {
    const product = await productRepo.getProductById(productId);
    if (!product) {
        const err = new Error('Producto no encontrado');
        err.status = 404;
        throw err;
    }
    if (quantity < 1) {
        const err = new Error('La cantidad debe ser al menos 1');
        err.status = 400;
        throw err;
    }
    const cart = await cartRepo.addItem(userId, productId, quantity);
    return { cart, total: calcTotal(cart) };
};

export const removeFromCart = async (userId, productId) => {
    const cart = await cartRepo.removeItem(userId, productId);
    return { cart, total: calcTotal(cart) };
};

export const emptyCart = async (userId) => {
    return cartRepo.clearCart(userId);
};