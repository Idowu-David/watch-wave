import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: "postgres",
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Sequelize PostgreSQL connection established.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
}

export default sequelize;
