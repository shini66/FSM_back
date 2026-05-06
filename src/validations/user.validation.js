import { body, param, validationResult } from "express-validator";

const userValidationRules = [
    body("name").isString().withMessage("El nombre debe ser una cadena de texto"),
    body("email").isEmail().withMessage("El correo electrónico no es válido"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    param("id").custom((value, { req }) => {
        // En PUT el id es obligatorio; en otras peticiones es opcional pero si viene debe ser entero
        if (req.method === "PUT") {
        if (value === undefined || value === null || value === "") {
            throw new Error("El ID es obligatorio para peticiones PUT");
        }
        }
        if (value !== undefined && value !== null && value !== "") {
        if (!Number.isInteger(Number(value))) {
            throw new Error("El ID debe ser un número entero");
        }
        }
        return true;
    }),
];

function checkValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
    }
    next();
}

export { checkValidation, userValidationRules };
