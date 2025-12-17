import User from "./models/user";
import Watchlist from "./models/watchlist";
import sequelize from "./config/db";

const models = {
	User,
	Watchlist
};

export { sequelize };
export default models;