const DB = require("../../common/inMemoryDb");
const Column = require("../columns/column.model");
const taskService = require("../tasks/task.service");
const Board = require("./board.model");

const getAll = async () => DB.boardDB;
const get = async (id) => DB.boardDB.find(board=>board.id === id);

const create = async (board) => {
  const newBoard = new Board(
    {
      ...board, columns: board.columns.map(item => new Column(item))
    }
  );

  DB.boardDB.push(newBoard);
  return get(newBoard.id);
}

const del = async (id) => {
  const boardIndex = DB.boardDB.findIndex(board => board.id === id);
  if (boardIndex !== -1) {
    const deletedBoard = DB.boardDB.splice(boardIndex, 1);
    const boardTasks = await taskService.getAll(deletedBoard[0].id);

    if (boardTasks) {
      boardTasks.map(task=>taskService.del(task.id));
    };

    return 204;
  };

  return 404;  
};

const update = async (board) => del(board.id)
  .then(status => {
    if (status === 404) {
      return undefined;
    }  

    return create(board);
  });

module.exports = { getAll, create, get, del, update };
