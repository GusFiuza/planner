const conexao = require('../infraestrutura/conexao')

conexao.all(`CREATE TABLE IF NOT EXISTS task (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_father INTEGER NOT NULL,
    task_text TEXT NOT NULL);`, (err) => {
    if (err) {
        console.log("Erro na criação da tabela task: " + err)
    } else {
        console.log('Tabela task criada com sucesso')
    }
})

class task {
    lista(res) {
        const sql = `SELECT * FROM task;`

        conexao.all(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        });
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM task WHERE task_id=${id}`

        conexao.all(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado[0])
            }
        })
    }

    adiciona(parm, res) {
        const sql = 'INSERT INTO task (task_father, task_text) VALUES (?, ?);'

        conexao.all(sql, Object.values(parm), (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                conexao.all("SELECT seq FROM sqlite_sequence WHERE name = 'task';", (erro, resultado) => {
                    if (erro) {
                        res.status(400).json(erro)
                    } else {
                        res.status(201).json(resultado[0].seq)
                    }
                })
            }
        })
    }

    exclui(id, res) {
        const sql = `DELETE FROM task WHERE task_id=${id}`

        conexao.all(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }
}

module.exports = new task