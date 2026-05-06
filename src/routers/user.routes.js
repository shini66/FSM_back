import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { userRules, idRules, checkValidation } from '../validations/user.validation.js';

const routerUser = Router();

routerUser.get('/', userController.getUsers);
routerUser.post('/', userRules, checkValidation, userController.createUser);
routerUser.get('/:id', idRules, checkValidation, userController.getUserById);
routerUser.put('/:id', idRules, userRules, checkValidation, userController.updateUser);
routerUser.delete('/:id', idRules, checkValidation, userController.deleteUser);

export default routerUser;