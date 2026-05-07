import * as productService from '../services/product.service.js';

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    if(!newProduct) {
      return res.status(400).json({ message: "Error al crear el producto" });
    }
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const updatedProduct = await productService.updateProduct(productId, productData);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deleted = await productService.deleteProduct(productId);
    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.status(200).json({ message: "Producto eliminado correctamente" });
    }
  } catch (error) {
    next(error);
  }
};

export { getProductById, getProducts, createProduct, updateProduct, deleteProduct };
