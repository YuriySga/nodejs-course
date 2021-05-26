const { randomUUID } = require('crypto');
const Column = require('../columns/column.model');

/** Class create board. */
/**
 * Create board.
 * @param {string | undefined} id - The id value, if undefined: set random id .
 * @param {string} title - The title value.
 * @param {Columns[]} columns - The array of columns on the board.
 */
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