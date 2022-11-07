import express from 'express'
import Usuario from '../models/usuario'
import usuariosPersistencia from '../persistencia/usuarios-persistencia'

const usuariosRouter = express.Router()
usuariosRouter.post('/usuarios', (req, res) => {
    const usuario: Usuario = req.body
    usuariosPersistencia.criar(usuario, (id) => {
        if (id) {
            res.status(201).location(`/usuarios/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})
usuariosRouter.get('/usuarios', (req, res) => {
    usuariosPersistencia.lerTodos((usuarios) => res.json(usuarios))
})
usuariosRouter.get('/usuarios/:id', (req, res) => {
    const id: number = +req.params.id
    usuariosPersistencia.ler(id, (usuario) => {
        if (usuario) {
            res.json(usuario)
        } else {
            res.status(404).send()
        }
    })
})
usuariosRouter.put('/usuarios/:id', (req, res) => {
    const id: number = +req.params.id
    usuariosPersistencia.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
usuariosRouter.delete('/usuarios/:id', (req, res) => {
    const id: number = +req.params.id
    usuariosPersistencia.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
export default usuariosRouter