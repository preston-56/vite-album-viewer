"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Album_1 = __importDefault(require("./Album"));
exports.Album = Album_1.default;
const Photo_1 = __importDefault(require("./Photo"));
exports.Photo = Photo_1.default;
const initModels = () => {
    User_1.default.hasMany(Album_1.default, { foreignKey: 'userId' });
    Album_1.default.belongsTo(User_1.default, { foreignKey: 'userId' });
    Album_1.default.hasMany(Photo_1.default, { foreignKey: 'albumId' });
    Photo_1.default.belongsTo(Album_1.default, { foreignKey: 'albumId' });
};
exports.initModels = initModels;
