"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tasks_router_1 = __importDefault(require("./routes/tasks/tasks.router"));
const user_router_1 = __importDefault(require("./routes/users/user.router"));
const app = (0, express_1.default)();
var allowedOrigins = ['http://localhost:8000'];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.get('/', (req, res) => { res.status(200).send('Tasks App'); });
app.use(tasks_router_1.default);
app.use(user_router_1.default);
exports.default = app;
