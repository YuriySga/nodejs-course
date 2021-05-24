const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const create = (board) => boardsRepo.create(board);
const get = (id) => boardsRepo.get(id);
const del = (id) => boardsRepo.del(id);
const update = (board) => boardsRepo.update(board);

module.exports = { getAll, create, get, del, update };