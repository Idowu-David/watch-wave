import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db"; // Correct relative path

export interface IUser {
  id: string;
  username: string;
  email: string;
  password_hash: string;
}
interface UserCreationAttributes extends Optional<IUser, "id"> {}

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: string;
  public username!: string;
  public email!: string;
  public password_hash!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
  }
);

export default User;
