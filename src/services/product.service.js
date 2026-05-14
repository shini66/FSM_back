import * as productRepo from '../repositories/product.repository.js';

let products = [
    { id: 1, name: "Laptop", price: "$10", category: "Electronics" },
    { id: 2, name: "Book", price: "$20", category: "Books" },
];

function generateId() {
    return products.length > 0 ? Math.max(...products.map((product) => product.id)) + 1 : 1;
}

function assignPrice(product) {
    if (!product || product.price === undefined || product.price === null) return;

    const p = product.price;
    if (typeof p === "number") {
        product.price = `$${p}`;
        return;
    }

    if (typeof p === "string") {
        const trimmed = p.trim();
        if (trimmed.startsWith('$')) {
            product.price = trimmed;
            return;
        }
        // si es una cadena numérica como "10" o "10.5", añadir '$'
        if (/^\d+(?:\.\d+)?$/.test(trimmed)) {
            product.price = `$${trimmed}`;
            return;
        }
        // dejarlo tal cual si no cumple formatos anteriores
        product.price = trimmed;
    }
}

export const getProducts = async () => {
    return products;
};

export const createProduct = async (productData) => {
    const newProduct = { ...productData, id: generateId() };
    assignPrice(newProduct);
    products.push(newProduct);
    return newProduct;
};

export const getProductById = async (id) => {
    const index = products.findIndex((product) => product.id === parseInt(id));
    return index !== -1 ? products[index] : null;
};

export const updateProduct = async (id, productData) => {
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        assignPrice(products[index]);
        return products[index];
    }
    return null;
};

export const deleteProduct = async (id) => {
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) {
        products.splice(index, 1);
        return true;
    }
    return false;
};
