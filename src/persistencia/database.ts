import sqlite3 from 'sqlite3';

const DBSOURCE = 'db.sqlite';
const SQL_USUARIOS_CREATE = `
    CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )`;
const SQL_TAREFAS_CREATE = `
    CREATE TABLE tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        data DATE,
        descricao TEXT,
        feito BOOLEAN,
        idUsuario INTEGER NOT NULL,
        foreign key(idUsuario) references usuarios(id)
    )`;

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Base de dados conectada com sucesso.')
        database.run(SQL_USUARIOS_CREATE, (err) => {
            if (!err) {
                console.log('Tabela usuarios criada com sucesso.');
            } 
        });
        database.run(SQL_TAREFAS_CREATE, (err) => {
            if (!err) {
                console.log('Tabela tarefas criada com sucesso.');
            } 
        });
    }
});

export default database;