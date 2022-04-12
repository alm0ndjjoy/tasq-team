const { TaskManager } = require("../js/taskManager.js");
const {expect} = require('chai');
const taskManager = new TaskManager; 

describe('TaskManager Constructor',() => {
  it('should have tasks property', () => {       expect(taskManager.hasOwnProperty('tasks')).to.be.eq(true)
  })

  it('should have currentId property', () => {    expect(taskManager.hasOwnProperty('currentId')).to.be.eq(true)
  })   
})

describe('addTask method',() => {
    it('adds tasks to the task manager',() => {
      console.log('Before adding task \n tasks = ',taskManager.tasks)
        taskManager.addTask('Go to Costco','Taste samples','Bo','low','todo','22/03/22');
            console.log('After adding task \n tasks = ',taskManager.tasks)

        expect(taskManager.tasks).to.deep.equal([{
         id: 0,
        name: 'Go to Costco',
        description: 'Taste samples',
        assignedTo: 'Bo',
        priorityLevel: 'low',
        status: 'todo',
        dueDate: '22/03/22'
        }]) 
    })
});

describe('Delete method', function(done)  {
  it('should delete task from tasks array',() => {
    taskManager.tasks = [{
             id: 1,
        name: 'Go to Walart',
        description: 'Buy rice',
        assignedTo: 'Bo',
        priorityLevel: 'low',
        status: 'todo',
        dueDate: '22/03/22'
        }]
    console.log('before deleting \n tasks = ',taskManager.tasks);
    taskManager.deleteTask(1)
    console.log('after deleting \n tasks = ',taskManager.tasks);
    expect(taskManager.tasks).to.deep.equal([])
  })
})

describe('getTaskById Method',() => {
  it('should return task', () => {
    console.log('get task ID: 1')
     taskManager.tasks = [{
        id: 1,
        name: 'Go to Costco',
        description: 'Buy rice',
        assignedTo: 'Bo',
        priorityLevel: 'low',
        status: 'todo',
        dueDate: '22/03/22'
        }]
    console.log('result',taskManager.getTaskById(1))
    expect(taskManager.getTaskById(1)).to.deep.equal({
        id: 1,
        name: 'Go to Costco',
        description: 'Buy rice',
        assignedTo: 'Bo',
        priorityLevel: 'low',
        status: 'todo',
        dueDate: '22/03/22'
        })
  })
})
