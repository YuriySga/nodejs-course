const DB = require("../../common/inMemoryDb");
const Task = require("./task.model");

const getAll = async (boardId) => DB.taskDB.filter(task => task.boardId === boardId);
const get = async (taskId) => DB.taskDB.find(task => task.id === taskId);

const create = async (task) => {
  const newTask = new Task(task)
  DB.taskDB.push(newTask);
  return get(newTask.id);
};

const del = async id => {
  const taskIndex = DB.taskDB.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    DB.taskDB.splice(taskIndex, 1);
    return 204;
  };

  return 404;  
};

const update = async taskData => 
   del(taskData.id)
    .then(status => {    
      if (status === 204) {
        return create(new Task(taskData));
      } 

      return undefined;
    });

const clearTaskUser = async userId => {
  const userTasks = DB.taskDB.filter(task => task.userId === userId);
  userTasks.map(task => update({...task, userId: null}));
};

module.exports = { getAll, get, create, del, update, clearTaskUser };
