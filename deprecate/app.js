import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('¡Bienvenidos al servidor!');
});

app.get('/from', (req, res) => {
    res.sendFile('f.html', { root: __dirname });
});

app.post('/from', (req, res) => {
    console.log('Cuerpo de la solicitud:', req.body);
    const { name, email, msg } = req.body;
    console.log('Datos recibidos', { name, email, msg });
    res.json({ message: 'Datos recibidos correctamente', data: { name, email, msg } });
});

app.get('/test', (req, res) => {
    console.log(req.body);
    res.send('This is a test endpoint');
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default app;