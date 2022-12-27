import express from 'express';
import cors from 'cors';
import usuariosRouter from './routers/usuarios-router';
import tarefasRouter from './routers/tarefas-router';
import disciplinasRouter from './routers/disciplinas-router';
require('dotenv/config');

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:5173']
}))

app.use('/usuarios', usuariosRouter);
app.use('/tarefas', tarefasRouter);
app.use('/disciplinas', disciplinasRouter);

app.use((req, res) => {
    res.status(404)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})