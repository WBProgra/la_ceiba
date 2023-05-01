import { DataTypes, Op, Sequelize } from "sequelize";
import Category from "./models/category.js";
const sequelize = new Sequelize("prueba_test", "root", "@Abc12345", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  dialectOptions: {
    requestTimeout: 300100,
    options: {
      useUTC: false,
      timezone: "localtime",
      dateFirst: 1,
      enableArithAbort: false,
      dateStrings: true,
      typeCast: true,
      requestTimeout: 300100,
      instanceName: "DEV",
    },
  },
  pool: {
    max: 5,
    min: 0,
    require: 30010,
    idle: 10000,
  },
  logging: false,
});

// Sincroniza todos los modelos con la base de datos
sequelize.sync().then(() => {
  console.log("Tablas creadas automáticamente si no existen.");
}).catch((error) => {
  console.error("Error al sincronizar las tablas:", error);
});

export { DataTypes, sequelize, Op };
