import express from 'express'
import Usuario from '../models/usuario'
import usuariosPersistencia from '../persistencia/usuarios-persistencia'

const usuariosRouter = express.Router()

usuariosRouter.post('/criarUsuario', (req, res) => {
    const usuario: Usuario = req.body;
    usuariosPersistencia.getEmail(usuario.email, (user) => {
        if(!user) {
            usuariosPersistencia.criar(usuario, (id) => {
                if (id) {
                    res.json(id).send();
                } else {
                    res.status(400).send();
                }
            });
        }
        else {
            res.status(400).send("Email já cadastrado!");
        }
    });
});

usuariosRouter.get('/listarUsuarios', (req, res) => {
    usuariosPersistencia.lerTodos((usuarios) => res.json(usuarios));
});

usuariosRouter.get('/verUsuario/:id', (req, res) => {
    const id: number = +req.params.id;
    usuariosPersistencia.ler(id, (usuario) => {
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).send();
        }
    });
});

usuariosRouter.put('/editarUsuario', (req, res) => {
    const id: number = req.body.id;
    usuariosPersistencia.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send();
        } else {
            res.json(id).send();
        }
    });
});

usuariosRouter.delete('/apagarUsuario', (req, res) => {
    const id: number = req.body.id;
    usuariosPersistencia.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send();
        } else {
            res.status(204).send();
        }
    });
});

usuariosRouter.post('/login', (req, res) => {
    const usuario: Usuario = req.body;
    usuariosPersistencia.login(usuario, (user) => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("Usuário não cadastrado!");
        }
    });
});

export default usuariosRouter