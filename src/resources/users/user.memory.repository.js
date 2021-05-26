/**
 * A module work with user repositories
 * @module userRepo
 */

const DB = require("../../common/inMemoryDb");
const taskService = require("../tasks/task.service");
const User = require("./user.model");

/**
 * Returns the array of all Users
 * @returns {Promise<User[]>} Return all Users
 */
const getAll = async () => DB.userDB;

/**
 * Returns the User on id
 * @param {string} id User id
 * @returns {Promise<User>} Return User
 */
const get = async (id) => DB.userDB.find(user=>user.id === id);

/**
 * Create the User in data base
 * @param {User} user new User params
 * @returns {Promise<get>} Return get function
 */
const create = async (user) => {
  const newUser = new User(user);
  DB.userDB.push(newUser);
  return get(newUser.id);
};

/**
 * Delete User on id
 * @param {string} id User id
 * @returns {Promise<number>} return status code
 */
const del = async (id) => {
  const userIndex = DB.userDB.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    DB.userDB.splice(userIndex, 1);
    await taskService.clearTaskUser(id);
    return 204;
  };

  return 404;  
};

/** update
 * Update User in data base
 * @param {User} user User data
 * @returns {Promise<undefined | create>} Return undefined or "create" user function
 */
const update = async (user) => del(user.id)
  .then(status => {    
    if (status === 204) {
      const newUser = new User(user);
      return create(newUser);
    };

    return undefined;
  });

module.exports = { getAll, get, create, update, del };