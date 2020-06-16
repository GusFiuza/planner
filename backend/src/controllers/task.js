const Task = require('../models/task')

module.exports = app => {
    app.post('/task', (req, res) => {
        const task = req.body
        Task.adiciona(task, res)
    }) 

    app.delete('/task/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Task.exclui(id, res)
    })

    app.get('/task', (req, res) => {
        Task.lista(res)
    })

    app.get('/task/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Task.buscaPorId(id, res)
    })

    
}