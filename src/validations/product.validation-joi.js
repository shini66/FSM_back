import Joi from "joi";

const productRules = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.base": "El nombre debe ser una cadena de texto",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser un número positivo",
    "any.required": "El precio es obligatorio",
  }),
  category: Joi.string().min(5).required().messages({
    "string.empty": "La categoría es obligatoria",
    "string.min": "La categoría debe tener al menos 5 caracteres",
  }),
});

const idRules = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "El ID debe ser un número",
    "number.integer": "El ID debe ser un número entero",
    "number.positive": "El ID debe ser un número positivo",
    "any.required": "El ID es obligatorio",
  }),
});

function checkValidation(schemas) {
  return (req, res, next) => {
    const schemaList = Array.isArray(schemas)
      ? schemas
      : [schemas || productRules];
    const errors = [];

    for (const schema of schemaList) {
      // Determinar si el esquema apunta a params (id) o body
      const desc =
        schema && typeof schema.describe === "function"
          ? schema.describe()
          : null;
      const keys = desc && desc.keys ? Object.keys(desc.keys) : [];
      const target =
        keys.length === 1 && keys[0] === "id" ? req.params : req.body;

      const { error } = schema.validate(target, {
        abortEarly: false,
        convert: true,
      });
      if (error) {
        errors.push(...error.details.map((detail) => detail.message));
      }
    }

    if (errors.length > 0) {
      return res.status(422).json({ success: false, errors });
    }

    next();
  };
}

export { checkValidation, idRules, productRules };
