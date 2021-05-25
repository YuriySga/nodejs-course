
const { randomUUID } = require('crypto');

/** Class create user. */
/**
 * Create user.
 * @param {string | undefined} id - The id value, if undefined: set random id .
 * @param {string} name - The name value.
 * @param {string} login - The login value.
 * @param {string} password - The password value. 
 */
class User {
  constructor({
    id = randomUUID(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return user data without password.
   * @param {User} user - The object user.
   * @return {User} A User object without password field.
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
