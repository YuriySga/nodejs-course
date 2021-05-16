const taskRepo = require('./task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);
const get = id => taskRepo.get(id);
const create = task => taskRepo.create(task);
const del = id => taskRepo.del(id);
const update = taskData => taskRepo.update(taskData);

const clearTaskUser = userId => taskRepo.clearTaskUser(userId);

module.exports = { getAll, create, get, del, update, clearTaskUser };
