import Disciplina from '../models/disciplina';
import database from './database';

const disciplinasPersistencia = {
    criar: (disciplina: Disciplina, callback: (t?: Disciplina) => void) => {
        const sql = 'INSERT INTO disciplinas (nome, descricao, idUsuario) VALUES (?, ?, ?)';
        const params = [disciplina.nome, disciplina.descricao, disciplina.idUsuario];
        database.run(sql, params, function(_err) {
            const sql1 = 'SELECT * FROM disciplinas WHERE id = ?';
            database.get(sql1, [this.lastID], (_err2, row) => {
                callback(row);
            });
           
        });
    },
    lerTodos: (idUsuario: number, callback: (disciplinas: Disciplina[]) => void) => {
        const sql = 'SELECT * FROM disciplinas WHERE idUsuario = ?';
        const params = [idUsuario];
        database.all(sql, params, (_err, rows) => callback(rows));
    },
    ler: (id: number, callback: (disciplina?: Disciplina) => void) => {
        const sql = 'SELECT * FROM disciplinas WHERE id = ?';
        const params = [id];
        database.get(sql, params, (_err, row) => callback(row));
    },
    atualizar: (id: number, disciplina: Disciplina, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE disciplinas SET nome = ?, descricao = ? WHERE id = ?';
        const params = [disciplina.nome, disciplina.descricao, id];
        database.run(sql, params, function(_err) {
            callback(this.changes === 0);
        })
    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM disciplinas WHERE id = ?';
        const params = [id];
        database.run(sql, params, function(_err) {
            callback(this.changes === 0);
        })
    }
}

export default disciplinasPersistencia;