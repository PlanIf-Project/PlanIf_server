import express from 'express';
import Tarefa from '../models/tarefas';
import Auth from '../persistencia/auth';
import tarefasPersistencia from '../persistencia/tarefas-persistencia';

const tarefasrouter = express.Router();

tarefasrouter.post('/criarTarefa', (req, res) => {
    const tarefa: Tarefa = req.body;
    tarefasPersistencia.criar(tarefa, (t) => {
        if (t) {
             res.status(200).json(t);
        } else {
            res.status(400).send();
        }
    });
});
       

tarefasrouter.get('/listarTarefas', Auth, (req, res) => {
    tarefasPersistencia.lerTodos((tarefas) => res.json(tarefas));
});

tarefasrouter.get('/verTarefa/:id', Auth, (req, res) => {
    const id: number = +req.params.id;
    tarefasPersistencia.ler(id, (tarefa) => {
        if (tarefa) {
            res.json(tarefa);
        } else {
            res.status(404).send();
        }
    });
});

tarefasrouter.put('/editarTarefa', Auth, (req, res) => {
    const id: number = req.body.id;
    tarefasPersistencia.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send();
        } else {
            res.json(id).send();
        }
    });
});

tarefasrouter.delete('/excluirtarefa/:id', Auth, (req, res) => {
    const id: number =+req.params.id;
    tarefasPersistencia.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send();
        } else {
            res.status(204).send();
        }
    });
});

export default tarefasrouter;