import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import { productRules, idRules, checkValidation } from '../validations/product.validation-joi.js';

const routerProduct = Router();

routerProduct.get('/', productController.getProducts);
routerProduct.post('/', checkValidation(productRules), productController.createProduct);
routerProduct.get('/:id', checkValidation(idRules), productController.getProductById);
routerProduct.put('/:id', checkValidation([idRules, productRules]), productController.updateProduct);
routerProduct.delete('/:id', checkValidation(idRules), productController.deleteProduct);

export default routerProduct;