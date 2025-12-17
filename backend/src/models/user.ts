import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../config/db"

class User extends Model {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		password: { type: DataTypes.STRING, allowNull: false },
	},
	{
		sequelize,
		tableName: "users",
		modelName: "User",
		timestamps: true,
	}
);

export default User;
