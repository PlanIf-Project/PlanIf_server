import express from 'express';
import Auth from '../persistencia/auth';
import Disciplina from '../models/disciplina';
import disciplinasPersistencia from '../persistencia/disciplinas-persistencia';

const disciplinasRouter = express.Router()

disciplinasRouter.post('/criarDisciplina', Auth, (req, res) => {
    const disciplina: Disciplina = req.body;
    disciplinasPersistencia.criar(disciplina, (t) => {
        if (t) {
            res.status(200).json(t);
        } else {
            res.status(400).send();
        }
    });
});

disciplinasRouter.get('/listarDisciplinas/:idUsuario', Auth, (req, res) => {
    const idUsuario: number = +req.params.idUsuario;
    disciplinasPersistencia.lerTodos(idUsuario, (disciplinas) => res.json(disciplinas));
});

disciplinasRouter.get('/verDisciplina/:id', Auth, (req, res) => {
    const id: number = +req.params.id;
    disciplinasPersistencia.ler(id, (disciplina) => {
        if (disciplina) {
            res.json(disciplina);
        } else {
            res.status(404).send();
        }
    });
});

disciplinasRouter.put('/editarDisciplina', Auth, (req, res) => {
    const id: number = req.body.id;
    disciplinasPersistencia.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send();
        } else {
            res.json(id).send();
        }
    });
});

disciplinasRouter.delete('/excluirDisciplina/:id', Auth, (req, res) => {
    const id: number =+req.params.id;
    disciplinasPersistencia.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send();
        } else {
            res.status(204).send();
        }
    });
});

export default disciplinasRouter;