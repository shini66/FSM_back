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
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("La descripción es obligatoria")
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres"),
];

const idRules = [
  param("id")
    .exists({ checkFalsy: true })
    .withMessage("El ID es obligatorio")
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
