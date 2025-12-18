"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscoverMovies = exports.getTrendingMovies = exports.getsearchMovies = exports.getTopRatedMovies = void 0;
const axios_1 = __importDefault(require("axios"));
//get top rated movie
const getTopRatedMovies = async (page = 1) => {
    const response = await axios_1.default.get(`${process.env.TMDB_BASE_URL}/movie/top_rated`, {
        params: {
            api_key: process.env.TMDB_API_KEY,
            page,
        },
    });
    return response.data;
};
exports.getTopRatedMovies = getTopRatedMovies;
// get search movie
const getsearchMovies = async (page) => {
    const response = await axios_1.default.get(`${process.env.TMDB_BASE_URL}/search/movie`, {
        params: {
            api_key: process.env.TMDB_API_KEY,
            page: page
        }
    });
    return response.data;
};
exports.getsearchMovies = getsearchMovies;
// get trending movie
const getTrendingMovies = async (time = "day") => {
    const response = await axios_1.default.get(`${process.env.TMDB_BASE_URL}/trending/movie/${time}`, {
        params: {
            api_key: process.env.TMDB_API_KEY,
        },
    });
    return response.data;
};
exports.getTrendingMovies = getTrendingMovies;
//watched movie
// export const getWatchedMovies = async (page: number = 1) => {
//   const response = await axios.get(
//   `${process.env.TMDB_BASE_URL}/watched/movie`, {
//     params: {
//       api_key: process.env.TMDB_API_KEY,
//       page: page
//     }
//   },
// );
// return response.data;
// };
// discover movie
const getDiscoverMovies = async (page = 1) => {
    const response = await axios_1.default.get(`${process.env.TMDB_BASE_URL}/discover/movie`, {
        params: {
            api_key: process.env.TMDB_API_KEY,
            page: page,
        },
    });
    console.log("TMDB RESPONSE: ", response);
    return response.data;
};
exports.getDiscoverMovies = getDiscoverMovies;
