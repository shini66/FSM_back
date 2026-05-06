import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { userValidationRules, checkValidation } from '../validations/user.validation.js';

const routerUser = Router();

routerUser.get('/', userController.getUsers);
routerUser.post('/', userValidationRules, checkValidation, userController.createUser);
routerUser.get('/:id', userController.getUserById);
routerUser.put('/:id', userValidationRules, checkValidation, userController.updateUser);
routerUser.delete('/:id', userController.deleteUser);

export default routerUser;