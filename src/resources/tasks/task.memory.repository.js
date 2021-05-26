/**
 * A module work with task repositories
 * @module taskRepo
 */

const DB = require("../../common/inMemoryDb");
const Task = require("./task.model");

/**
 * Returns the array of all Tasks on board id
 * @param {string} boardId 
 * @returns {Task[]}
 */
const getAll = async (boardId) => DB.taskDB.filter(task => task.boardId === boardId);

/**
 * Returns the Task on id
 * @param {string} taskId
 * @returns {Task}
 */
const get = async (taskId) => DB.taskDB.find(task => task.id === taskId);

/**
 * Create the Task in data base
 * @param {Task} task
 * @returns {get} Return get function
 */
const create = async (task) => {
  const newTask = new Task(task)
  DB.taskDB.push(newTask);
  return get(newTask.id);
};

/**
 * Delete Task on id
 * @param {string} id
 * @returns {number} return status code
 */
const del = async id => {
  const taskIndex = DB.taskDB.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    DB.taskDB.splice(taskIndex, 1);
    return 204;
  };

  return 404;  
};

/** update
 * Update Task in data base
 * @param {Task} taskData
 * @returns {undefined | create} Return undefined or "create" task function
 */
const update = async taskData => 
   del(taskData.id)
    .then(status => {    
      if (status === 204) {
        return create(new Task(taskData));
      } 

      return undefined;
    });

/** clear
 * clearing tasks from the user
 * @param {string} userId
 * @returns {undefined | create} Return undefined or "create" task function
 */    
const clearTaskUser = async userId => {
  const userTasks = DB.taskDB.filter(task => task.userId === userId);
  userTasks.map(task => update({...task, userId: null}));
};

module.exports = { getAll, get, create, del, update, clearTaskUser };
