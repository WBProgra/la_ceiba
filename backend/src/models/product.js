import { Sequelize } from "sequelize";
import { sequelize } from "../db.js";

const Product = sequelize.define(
  "Product",
  {
    ProductID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: { type: Sequelize.STRING, allowNull: false },
    description: Sequelize.STRING,
    expiration_date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    supplier: Sequelize.STRING,
    nit_supplier: Sequelize.STRING,
    quantity: { type: Sequelize.INTEGER, allowNull: false },
    price_cost: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    price_sale: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    existence: { type: Sequelize.INTEGER, allowNull: false },

    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

export default Product;
