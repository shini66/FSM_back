import * as cartService from '../services/cart.service.js';

export const getCart = async (req, res, next) => {
    try {
        const result = await cartService.getCart(req.user.id);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

export const addItem = async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body;
        if (!productId) {
            return res.status(400).json({ success: false, error: 'productId es requerido' });
        }
        const result = await cartService.addToCart(req.user.id, productId, Number(quantity));
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

export const removeItem = async (req, res, next) => {
    try {
        const result = await cartService.removeFromCart(req.user.id, req.params.productId);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        console.log(`Vaciando carrito para usuario ${req.user.id}`);
        await cartService.emptyCart(req.user.id);
        res.status(200).json({ success: true, message: 'Carrito vaciado correctamente' });
    } catch (error) {
        next(error);
    }
};