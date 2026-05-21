import { body, param, validationResult } from "express-validator";

const productRules = [
    body("userId")
        .exists({ checkFalsy: true })
        .withMessage("El ID del usuario es obligatorio")
        .isInt({ gt: 0 })
        .withMessage("El ID del usuario debe ser un número entero positivo"),
    body("productId")
        .exists({ checkFalsy: true })
        .withMessage("El ID del producto es obligatorio")
        .isInt({ gt: 0 })
        .withMessage("El ID del producto debe ser un número entero positivo"),
    body("price")
        .exists({ checkFalsy: true })
        .withMessage("El precio es obligatorio")
        .isFloat({ gt: 0 })
        .withMessage("El precio debe ser un número positivo"),
    body("amount")
        .exists({ checkFalsy: true })
        .withMessage("La cantidad es obligatoria")
        .isInt({ gt: 0 })
        .withMessage("La cantidad debe ser un número entero positivo"),
];

const idRules = [
    param("id")
        .exists({ checkFalsy: true })
        .withMessage("El ID es obligatorio")
        .isInt({ gt: 0 })
        .withMessage("El ID debe ser un número entero positivo"),
];

function checkValidation(schemas) {
    return async (req, res, next) => {
        const schemaList = Array.isArray(schemas)
        ? schemas
        : [schemas || productRules];
        const chains = schemaList.flat();

        for (const chain of chains) {
        // express-validator chains expose .run(req)
        // run each chain to populate req with validation results
        // eslint-disable-next-line no-await-in-loop
        await chain.run(req);
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ success: false, errors: errors.array().map((e) => e.msg) });
        }

        next();
    };
}

export { checkValidation, idRules, productRules };
