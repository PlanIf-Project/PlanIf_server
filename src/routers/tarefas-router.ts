import express from 'express';
import Auth from '../persistencia/auth';
import Tarefa from '../models/tarefa';
import tarefasPersistencia from '../persistencia/tarefas-persistencia';

const tarefasRouter = express.Router()

tarefasRouter.post('/criarTarefa', Auth, (req, res) => {
    const tarefa: Tarefa = req.body;
    console.log(tarefa)
    tarefasPersistencia.criar(tarefa, (t) => {
        if (t) {
            res.status(200).json(t);
        } else {
            res.status(400).send();
        }
    });
});

tarefasRouter.get('/listarTarefas/:idUsuario', Auth, (req, res) => {
    const idUsuario: number = +req.params.idUsuario;
    tarefasPersistencia.lerTodos(idUsuario, (tarefas) => res.json(tarefas));
});

tarefasRouter.get('/verTarefa/:id', Auth, (req, res) => {
    const id: number = +req.params.id;
    tarefasPersistencia.ler(id, (tarefa) => {
        if (tarefa) {
            res.json(tarefa);
        } else {
            res.status(404).send();
        }
    });
});

tarefasRouter.put('/editarTarefa', Auth, (req, res) => {
    const id: number = req.body.id;
    tarefasPersistencia.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send();
        } else {
            res.json(id).send();
        }
    });
});

tarefasRouter.delete('/excluirTarefa/:id', Auth, (req, res) => {
    const id: number =+req.params.id;
    tarefasPersistencia.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send();
        } else {
            res.status(204).send();
        }
    });
});

export default tarefasRouter;