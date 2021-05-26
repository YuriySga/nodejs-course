const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();
const get = async (id) => usersRepo.get(id);
const create = async (user) => usersRepo.create(user);
const update = async (user) => usersRepo.update(user);
const del = async (id) => usersRepo.del(id);

module.exports = { getAll, get, create, update, del };
