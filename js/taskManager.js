const createTaskHtml = (name, description, assignedTo, priorityLevel, status, dueDate, id,imgLink) => {
  const html = `
    <li class="list-group-item mb-2" data-task-id=${id} >
        <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
            <div class="row justify-content-start ml-2"> 
              <img src=${imgLink} style='width:40px; border-radius:50%;'/> 
  <div class="w-100"></div>
            <small>Assigned To: ${assignedTo}</small>
            </div>
         
            <span class="badge ${status === 'DONE' ? 'badge-success': 'badge-danger'}">${status}</span>
        </div>
        <div class="d-flex w-100 mb-3 justify-content-between">
            <h5 class='d-inline col-5'>${name}</h5>
            <small>Due: ${dueDate}</small>
            <small>Priority: ${priorityLevel}</small>
            <small>Status: ${status}</small>
        </div>
        <p class="col-5">${description}</p>
        <div class="d-flex w-100 justify-content-end">
            <button class="${status==='DONE'? 'invisible' : 'visible'} btn btn-outline-success done-button mr-1 visible">Mark As Done</button>
            <button class="btn btn-outline-danger delete-button">Delete</button>
        </div>
    </li>
`

  return html; 
}

class TaskManager {
  constructor(currentId = 0){
    this.tasks = [];
    this.currentId = currentId;
}
  
  addTask(name, description, assignedTo, priorityLevel, status, dueDate){
      const task = {
             // Increment the currentId property
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            priorityLevel: priorityLevel,
            status: status,
            dueDate: dueDate,
      }
            this.tasks.push(task);
  }
  
  render(){
    const taskHtmlList = [];
    const memberImages = { 'Alemnesh Dadi':'https://res.cloudinary.com/alm0ndjjoy/image/upload/v1649345693/Screen_Shot_2022-04-07_at_11.34.49_AM_e9g9iq.png',
                          'Bo Latt':' https://res.cloudinary.com/dgodqlhv2/image/upload/v1649187954/bo%20latt%20picture%20/profile_eva88j.jpg','Ryan Christian Fernandez': 'https://res.cloudinary.com/task4team/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1649343159/samples/1589303550966_ghrhnc.jpg ryan', 'Joyce Huang':'https://res.cloudinary.com/alm0ndjjoy/image/upload/v1645986883/portfolio-joyce.codes-imgs/IMG_5378_xpaxdg.jpg','Roxanne Moreira':'https://res.cloudinary.com/dbkhqvqde/image/upload/v1646674650/IMG_1702_va9wye.jpg','Vanessa Righi':'https://res.cloudinary.com/dxkge8jkp/image/upload/v1646674710/IMG_2836_b1m11q.jpg','Bezawit Tamiru':'https://res.cloudinary.com/dmlkc2pxe/image/upload/v1646676997/photos/photo_2022-03-07_12-53-30_f3ws4n.jpg','Ky Morris':'https://cdn.discordapp.com/attachments/568112556582109195/959177051049427004/20220331_154441.jpg', 'Afua Anochi':'https://res.cloudinary.com/alm0ndjjoy/image/upload/v1649345693/Screen_Shot_2022-04-07_at_11.34.49_AM_e9g9iq.png' }

    this.tasks.map(task => {
      const date = new Date(task.dueDate);
      console.log(task.assignedTo)
      const taskHtml = createTaskHtml(task.name, task.description,task.assignedTo, task.priorityLevel, task.status, task.dueDate, task.id,memberImages[task.assignedTo])
      taskHtmlList.push(taskHtml)
    })

    const tasksHtml = taskHtmlList.join('\n')
    const taskList =document.getElementById("tasksList")
    taskList.innerHTML = tasksHtml;
  }

  validate(name, description, assignedTo, priortyLevel, status, dueDate){
    if (!name || !description || !assignedTo  || !dueDate){
      $('#endModal').modal('show');
    } else {
      this.addTask(name, description, assignedTo, priortyLevel, status, dueDate)
      this.save();
      $('#addToast').toast('show')
      this.load();
      this.render();
    }
  }
  getTaskById(taskId){
    let foundTask;
    this.tasks.map(eachTask => {
      let task = eachTask;
      if(task.id === taskId){
        foundTask = task
      }
    })
    return foundTask
    
  }
  save(){
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksJson);
    const currentId = this.currentId.toString();
    localStorage.setItem("currentId", currentId);    
  }

  load(){
    if(localStorage.getItem("tasks")){
         const tasks = localStorage.getItem("tasks");
         const tasksJson = JSON.parse(tasks);
         this.tasks = tasksJson;  
    }
    if(localStorage.getItem('currentId')) {
      const currentId  = Number(localStorage.getItem('currentId'));
      this.currentId = currentId; 
    } 
  }

  deleteTask(taskId){
    this.tasks  = this.tasks.filter(task => {
      return task.id != taskId
    })
  }
}

const closeModal = () => {
  return $('#endModal').modal('hide')
}


module.exports = {
  TaskManager
}


