const { randomUUID } = require('crypto');

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