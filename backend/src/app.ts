import User from "./modules/auth/user.model";
import Watchlist from "./modules/watchlist/watchlist.model";
import sequelize from "./config/db";

const models = {
	User,
	Watchlist
};

export { sequelize };
export default models;