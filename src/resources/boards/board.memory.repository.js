/**
 * A module work with task repositories
 * @module boardRepo
 */

const DB = require("../../common/inMemoryDb");
const Column = require("../columns/column.model");
const taskService = require("../tasks/task.service");
const Board = require("./board.model");

/**
 * Returns the array of all Boards
 * @returns {Promise<Board[]>} Return Promise all Boards
 */
const getAll = async () => DB.boardDB;

/**
 * Returns the Board on id
 * @param {string} id Board id
 * @returns {Promise<Board>} Return Promise Board
 */
const get = async (id) => DB.boardDB.find(board=>board.id === id);

/**
 * Create the Board in data base
 * @param {Board} board New Board params
 * @returns {Promise<get>} Return Promise get function
 */
const create = async (board) => {
  const newBoard = new Board(
    {
      ...board, columns: board.columns.map(item => new Column(item))
    }
  );

  DB.boardDB.push(newBoard);
  return get(newBoard.id);
}

/**
 * Delete Board on id
 * @param {string} id Board id
 * @returns {Promise<number>} return Promise status code
 */
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

/** update
 * Update Board in data base
 * @param {Board} board Board data
 * @returns {Promise<undefined | create>} Return Promise undefined or "create" board function
 */
const update = async (board) => del(board.id)
  .then(status => {
    if (status === 404) {
      return undefined;
    }  

    return create(board);
  });

module.exports = { getAll, create, get, del, update };
