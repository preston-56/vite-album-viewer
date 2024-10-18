"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const index_js_1 = require("./models/index.js");
const users_1 = __importDefault(require("./routes/users"));
const albums_1 = __importDefault(require("./routes/albums"));
const photos_1 = __importDefault(require("./routes/photos"));
const app = express_1.default();
const PORT = process.env.PORT || 4000;
app.use(cors_1.default({
    origin: "*",
    credentials: true
}));
app.use(express_1.default.json());
config_1.sequelize
    .authenticate()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Database connection has been established successfully.");
    index_js_1.initModels();
    yield config_1.sequelize.sync();
}))
    .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
});
app.use("/api/users", users_1.default);
app.use("/api/albums", albums_1.default);
app.use("/api/photos", photos_1.default);
// Catch-all route for 404 errors
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
