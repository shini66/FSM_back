import { body, param, validationResult } from "express-validator";

const productRules = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),
  body("price")
    .exists({ checkFalsy: true })
    .withMessage("El precio es obligatorio")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número positivo"),
  body("category")
    .exists({ checkFalsy: true })
    .withMessage("La categoría es obligatoria")
    .isString()
    .withMessage("La categoría debe ser una cadena de texto")
    .isLength({ min: 5 })
    .withMessage("La categoría debe tener al menos 5 caracteres"),
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
