
const { randomUUID } = require('crypto');

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
