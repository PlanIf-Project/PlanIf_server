import Usuario from '../models/usuario'
import database from './database'
const usuariosPersistencia = {
    criar: (usuario: Usuario, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)'
        const params = [usuario.nome, usuario.email, usuario.senha]
        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },
    lerTodos: (callback: (usuarios: Usuario[]) => void) => {
        const sql = 'SELECT * FROM usuarios'
        const params: any[] = []
        database.all(sql, params, (_err, rows) => callback(rows))
    },
    ler: (id: number, callback: (usuario?: Usuario) => void) => {
        const sql = 'SELECT * FROM usuarios WHERE id = ?'
        const params = [id]
        database.get(sql, params, (_err, row) => callback(row))
    },
    atualizar: (id: number, usuario: Usuario, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?'
        const params = [usuario.nome, usuario.email, usuario.senha, id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM usuarios WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
}
export default usuariosPersistencia