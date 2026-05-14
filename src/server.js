import app from "./app.js";
import { env } from './config/env.js';
import { connectDB } from "./config/db.js";

const PORT = env.PORT;

// Conectar a la base de datos
connectDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});