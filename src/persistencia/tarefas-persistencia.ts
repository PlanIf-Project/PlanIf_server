import Tarefa from '../models/tarefa';
import database from './database';

const tarefasPersistencia = {
    criar: (tarefa: Tarefa, callback: (t?: Tarefa) => void) => {
        const sql = 'INSERT INTO tarefas (nome, data, descricao, idUsuario) VALUES (?, ?, ?, ?)';
        const params = [tarefa.nome, tarefa.data, tarefa.descricao, tarefa.idUsuario];
        database.run(sql, params, function(_err) {
            const sql1 = 'SELECT * FROM tarefas WHERE id = ?';
            database.get(sql1, [this.lastID], (_err2, row) => {
                callback(row);
            });
           
        });
    },
    lerTodos: (idUsuario: number, callback: (tarefas: Tarefa[]) => void) => {
        const sql = 'SELECT * FROM tarefas WHERE idUsuario = ?';
        const params = [idUsuario];
        database.all(sql, params, (_err, rows) => callback(rows));
    },
    ler: (id: number, callback: (tarefa?: Tarefa) => void) => {
        const sql = 'SELECT * FROM tarefas WHERE id = ?';
        const params = [id];
        database.get(sql, params, (_err, row) => callback(row));
    },
    atualizar: (id: number, tarefa: Tarefa, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE tarefas SET nome = ?, data = ?, descricao = ? WHERE id = ?';
        const params = [tarefa.nome, tarefa.data, tarefa.descricao, id];
        database.run(sql, params, function(_err) {
            callback(this.changes === 0);
        })
    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM tarefas WHERE id = ?';
        const params = [id];
        database.run(sql, params, function(_err) {
            callback(this.changes === 0);
        })
    }
}

export default tarefasPersistencia;