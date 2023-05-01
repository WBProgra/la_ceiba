import { Sequelize } from "sequelize";
import { sequelize } from "../db.js";
import Product from "./product.js";
import Category from "./category.js";

const ProductsCategory = sequelize.define(
  "ProductsCategory",
  {
    ProductsCategoryID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductID: { type: Sequelize.INTEGER, allowNull: false },
    CategoryID: { type: Sequelize.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);

ProductsCategory.belongsTo(Product, {
  foreignKey: "ProductID",
});

ProductsCategory.belongsTo(Category, {
  foreignKey: "CategoryID",
});

export default ProductsCategory;
