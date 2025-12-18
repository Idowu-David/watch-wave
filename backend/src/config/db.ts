import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(
      process.env.DATABASE_NAME,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: "postgres",
        logging: false,
        define: {
          timestamps: true,
          underscored: true,
        },
      }
    );

export default sequelize;
