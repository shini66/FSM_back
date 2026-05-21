import Cart from "../models/cart.model.js";

export async function findByUser(userId) {
    return Cart.findOne({ user: userId }).populate('items.product', 'name price description');
}

export async function createCart(userId) {
    const cart = new Cart({ user: userId, items: [] });
    return cart.save();
}

export async function addItem(userId, productId, quantity) {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(
        i => i.product.toString() === productId
    );

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }
    cart.dateUpdated = Date.now();
    return (await cart.save()).populate('items.product', 'name price description');
}

export async function removeItem(userId, productId) {
    return Cart.findOneAndUpdate(
        { user: userId },
        {
            $pull: { items: { product: productId } },
            dateUpdated: Date.now(),
        },
        { new: true }
    ).populate('items.product', 'name price description');
}

export async function clearCart(userId) {
    return Cart.findOneAndUpdate(
        { user: userId },
        { items: [], dateUpdated: Date.now() },
        { new: true }
    );
}