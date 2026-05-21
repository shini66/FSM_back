import { Router } from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { userRules, idRules, checkValidation } from '../validations/user.validation.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const routerCart = Router();

routerCart.use(verifyToken);

routerCart.get('/', cartController.getCart);
routerCart.post('/add', cartController.addItem);
routerCart.delete('/item/:productId', cartController.removeItem);
routerCart.delete('/clean', cartController.clearCart);

export default routerCart;