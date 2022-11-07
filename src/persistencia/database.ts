import sqlite3 from 'sqlite3'
const DBSOURCE = 'db.sqlite'
const SQL_USUARIOS_CREATE = `
    CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL
    )`
const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Base de dados conectada com sucesso.')
        database.run(SQL_USUARIOS_CREATE, (err) => {
            if (!err) {
                console.log('Tabela usuarios criada com sucesso.')
            } 
        })
    }
})
export default database