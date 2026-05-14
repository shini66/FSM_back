import * as productRepo from '../repositories/product.repository.js';

//function generateId() {
//    return products.length > 0 ? Math.max(...products.map((product) => product.id)) + 1 : 1;
//}

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
    return await productRepo.getProducts();
};

export const createProduct = async (productData) => {
    const newProduct = await productRepo.createProduct(productData);
    assignPrice(newProduct);
    return newProduct;
};

export const getProductById = async (id) => {
    return await productRepo.getProductById(id);
};

export const updateProduct = async (id, productData) => {
    const updatedProduct = await productRepo.updateProduct(id, productData);
    if (updatedProduct) {
        assignPrice(updatedProduct);
    }
    return updatedProduct;
};

export const deleteProduct = async (id) => {
    return await productRepo.deleteProduct(id);
};
