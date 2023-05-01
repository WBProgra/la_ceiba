import { Sequelize } from "sequelize";
import { sequelize } from "../db.js";

const Category = sequelize.define(
  "Category",
  {
    CategoryID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: { type: Sequelize.STRING, allowNull: false },
    description: Sequelize.STRING,
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

export default Category;
