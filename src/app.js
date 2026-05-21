import cors from "cors";
import express from "express";
import routerUser from "./routers/user.routes.js";
import routerProduct from "./routers/product.routes.js";
import routerAuth from "./routers/auth.routes.js";
import routerCart from "./routers/cart.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} (${req.path}) URL: ${req.url} - Headers: ${JSON.stringify(req.headers)} - Body: ${JSON.stringify(req.body)}`);
    next();
});

app.use("/api", routerAuth);
app.use("/api/users", routerUser);
app.use("/api/products", routerProduct);
app.use("/api/cart", routerCart);

app.use((req, res) => {
    res.status(404).json({ success: false, error: "Recurso no encontrado" });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    
    res.status(status).json({ success: false, error: message });
});

export default app;
