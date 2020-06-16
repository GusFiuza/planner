socket = new WebSocket(`ws://${location.host}:8002/ws`)

socket.onmessage = function (event) {
    message = event.data.split('-')
    object = message[0]
    action = message[1]
    
    if (action == 'createTask') {
        taskData = dataQuery('task', object)
        createTask(taskData.task_id, 
            taskData.task_father, 
            taskData.task_text)
    }
    
    if (action == 'deleteTask') {
        document.getElementById('task' + object).remove()
    }
}

socket.onclose = event => console.log(`Sevidor desconectado. Código: ${event.code}`)

function changeBroadcast(objeto, acao) {
    socket.send(`${objeto}-${acao}`)
}
