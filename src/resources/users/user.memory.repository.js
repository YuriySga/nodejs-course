const DB = require("../../common/inMemoryDb");
const taskService = require("../tasks/task.service");
const User = require("./user.model");

const getAll = async () => DB.userDB;
const get = async (id) => DB.userDB.find(user=>user.id === id);

const create = async (user) => {
  const newUser = new User(user);
  DB.userDB.push(newUser);
  return get(newUser.id);
};

const del = async (id) => {
  const userIndex = DB.userDB.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    DB.userDB.splice(userIndex, 1);
    await taskService.clearTaskUser(id);
    return 204;
  };

  return 404;  
};

const update = async (user) => del(user.id)
  .then(status => {    
    if (status === 204) {
      const newUser = new User(user);
      return create(newUser);
    };

    return undefined;
  });

module.exports = { getAll, get, create, update, del };
