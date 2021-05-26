const boardsRepo = require('./board.memory.repository');

const getAll = async () => boardsRepo.getAll();
const create = async (board) => boardsRepo.create(board);
const get = async (id) => boardsRepo.get(id);
const del = async (id) => boardsRepo.del(id);
const update = async (board) => boardsRepo.update(board);

module.exports = { getAll, create, get, del, update };