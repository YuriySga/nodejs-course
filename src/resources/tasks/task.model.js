const { randomUUID } = require('crypto');

/** Class create task. */
/**
 * Create task.
 * @param {string | undefined} id - The id value, if undefined: set random id .
 * @param {string} title - The title value.
 * @param {string} order - The order value.
 * @param {string} description - The description value. 
 * @param {string} userId - The userId value. 
 * @param {string} boardId - The boardId value. 
 * @param {string} columnId - The columnId value. 
 */
class Task {
  constructor({
    id = randomUUID(),
    title = 'TASK TITLE',
    order = 0,
    description = 'task description',
    userId = 'id-userId-id',
    boardId = 'id-boardId-id',
    columnId = 'id-columnId-id',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
