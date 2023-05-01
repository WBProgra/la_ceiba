import { Router } from "express";
import { deleteProduct, getProduct, postProduct, updateProduct, viewProduct } from "../controllers/product.contorller.js";

const router = Router();
router.get("/product", getProduct);
router.post("/product/", postProduct);
router.delete("/product/:id", deleteProduct);
router.get("/product/:id", viewProduct);
router.put("/product/:id", updateProduct);

export default router;
