"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({ status: 'Model house API online🔥' });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Login: ', email);
    if (email === 'test@test.com' && password === '123') {
        res.json({ success: true, token: 'fake-jwt-123' });
    }
    else {
        res.status(401).json({ success: false });
    }
});
app.listen(PORT, () => {
    console.log(`Backend running: http://localhost:${PORT}`);
});
