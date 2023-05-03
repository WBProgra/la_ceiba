import { Router } from "express";
import { getCategory, deleteCategory, postCategory, viewCategory, updateCategory } from "../controllers/category.controller.js";

const router = Router();
router.get("/category", getCategory);
router.post("/category/", postCategory);
router.delete("/category/:id", deleteCategory);
router.get("/category/:id", viewCategory);
router.put("/category/:id", updateCategory);

export default router;
