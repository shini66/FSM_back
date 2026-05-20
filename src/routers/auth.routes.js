import { Router } from 'express';
import * as userService from '../services/user.service.js';
import { userRules, loginRules, checkValidation } from '../validations/user.validation.js';

const routerAuth = Router();

routerAuth.post('/register', checkValidation(userRules), async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
});

routerAuth.post('/login', checkValidation(loginRules), async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);
        res.status(200).json({ success: true, ...result });
    } catch (err) {
        next(err);
    }
});

export default routerAuth;