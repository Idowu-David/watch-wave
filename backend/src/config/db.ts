import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";




const sequelize = new Sequelize(
  process.env.DATABASE_NAME || "entertainment_tracker_dev",
  process.env.DATABASE_USER || "burhandeen",
  process.env.DATABASE_PASSWORD || "2005",
  {
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "5432"),
    dialect: "postgres",
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);


export default sequelize;
