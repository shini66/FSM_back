import { body, param, validationResult } from "express-validator";

const userRules = [

    body("username")
        .trim()
        .notEmpty().withMessage("El nombre de usuario es obligatorio")
        .isLength({ min: 3 }).withMessage("El nombre de usuario debe tener al menos 3 caracteres")
        .isString().withMessage("El nombre de usuario debe ser una cadena de texto"),

    body("email")
        .trim()
        .notEmpty().withMessage("El correo electrónico es obligatorio")
        .isEmail().withMessage("El correo electrónico no es válido")
        .normalizeEmail(),


    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

const idRules = [
    param("id")
        .notEmpty().withMessage("El ID es obligatorio")
        .isInt({ gt: 0 }).withMessage("El ID debe ser un número entero positivo"),
];

function checkValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
    }
    next();
}

export { checkValidation, userRules, idRules };
