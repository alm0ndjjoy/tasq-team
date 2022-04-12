const taskManager = new TaskManager(0);
const newTaskForm = document.querySelector('#newTaskForm');
const tasksList = document.querySelector("#tasksList")

taskManager.load();
taskManager.render();

newTaskForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault(); 
  
  const name = document.getElementById("taskName").value;
  const description = document.getElementById("description").value;
  const assignedTo = document.getElementById("assignedto").value;
  const priortyLevel = document.getElementById("priority").value;
  const status = document.getElementById("status").value;
  const dueDate = document.getElementById('newTaskDueDate').value;
  taskManager.validate(name, description, assignedTo, priortyLevel, status, dueDate);

})

tasksList.addEventListener("click", (event) => {
  if (event.target.classList.contains('done-button')){
    const parentTask = event.target.parentElement.parentElement;
    console.log(parentTask)
    const taskId = Number(parentTask.dataset.taskId);
    console.log(taskId)
    const task = taskManager.getTaskById(taskId);
    task.status = "DONE";
    taskManager.save();
    taskManager.render();
  }
  if(event.target.classList.contains('delete-button')){
    const parentTask = event.target.parentElement.parentElement; 
    const taskId = Number(parentTask.dataset.taskId)
    taskManager.deleteTask(taskId)
    $('#deleteToast').toast('show')
    taskManager.save();
    taskManager.render(); 
  }
})

