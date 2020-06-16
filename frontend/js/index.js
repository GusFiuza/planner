function pageLoad() {
  data = dataQuery('task', 0)
  for (i = 0; i < data.length; i++) {
    createTask(data[i].task_id, data[i].task_father, data[i].task_text)
  }
}

function bodyClick(ev) {
  if ((ev.target.getAttribute('class') == 'day') || (ev.target.getAttribute('class') == 'monthlyTasks')) {
    taskText = prompt('What is our task?')
    if (taskText != null) {
      taskData = 'taskFather=' + ev.target.id.replace('day','') + '&taskText=' + taskText
      taskId = dataChange('post', 'task', taskData, 0)
      changeBroadcast(taskId, 'createTask')
    }
  }
  if (ev.target.getAttribute('class') == 'deleteControl') {
    task = ev.target.parentElement
    dataChange('delete', 'task', '', task.id.replace('task', ''))
    changeBroadcast(task.id.replace('task', ''), 'deleteTask')
  }
}

function createTask(task_id, father_id, text) {
  task = document.createElement('div')
  deleteTask = document.createElement('div')
  task.setAttribute('id', 'task' + task_id)
  task.setAttribute('class', 'task')
  deleteTask.setAttribute('class', 'deleteControl')
  deleteTask.textContent = 'X'
  task.textContent = text
  task.appendChild(deleteTask)
  document.getElementById('day' + father_id).appendChild(task)
}
