const taskRepo = require('./task.memory.repository');

const getAll = async boardId => taskRepo.getAll(boardId);
const get = async id => taskRepo.get(id);
const create = async task => taskRepo.create(task);
const del = async id => taskRepo.del(id);
const update = async taskData => taskRepo.update(taskData);

const clearTaskUser = async userId => taskRepo.clearTaskUser(userId);

module.exports = { getAll, create, get, del, update, clearTaskUser };
