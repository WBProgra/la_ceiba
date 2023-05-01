import Category from "./models/category.js";
import Product from "./models/product.js";
import ProductsCategory from "./models/protucts_category.js";
const createEmpleadosTable = async () => {
  try {
    await Category.sync({ alter: true });
    await Product.sync({ alter: true });
    await ProductsCategory.sync({ alter: true });
    console.log("Migrations created!!");
  } catch (error) {
    console.error("Migrations Fail D:", error);
  }
};

createEmpleadosTable();