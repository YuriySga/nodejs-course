const { randomUUID } = require('crypto');

/** Class create column. */
/**
 * Create column.
 * @param {string | undefined} id - The id value, if undefined: set random id .
 * @param {string} title - The title value.
 * @param {string} order - The order value.
 */
class Column {
    constructor({
      id = randomUUID(),
      title = 'TITLE COLUMN',
      order = 0,
    } = {}) {
      this.id = id;
      this.title = title;
      this.order = order;
    }
  }
  
  module.exports = Column;