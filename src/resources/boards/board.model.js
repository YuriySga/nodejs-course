const { randomUUID } = require('crypto');
const Column = require('../columns/column.model');

class Board {
    constructor({
      id = randomUUID(),
      title = 'Board TITLE',
      columns = [new Column()],
    } = {}) {
      this.id = id;
      this.title = title;
      this.columns = columns;
    }
  }
  
  module.exports = Board;