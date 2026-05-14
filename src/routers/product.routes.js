import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import {
  checkValidation,
  idRules,
  productRules,
} from "../validations/product.validation.js";

const routerProduct = Router();

routerProduct.get("/", productController.getProducts);
routerProduct.post(
  "/",
  checkValidation(productRules),
  productController.createProduct,
);
routerProduct.get(
  "/:id",
  checkValidation(idRules),
  productController.getProductById,
);
routerProduct.put(
  "/:id",
  checkValidation([idRules, productRules]),
  productController.updateProduct,
);
routerProduct.delete(
  "/:id",
  checkValidation(idRules),
  productController.deleteProduct,
);

export default routerProduct;
