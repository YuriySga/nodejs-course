const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
   res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
 if (user) { 
    res.json(User.toResponse(user));

  } else {
    res.sendStatus(404).send('User not found');
  } 
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    {      
      login: req.body.login,
      password: req.body.password,
      name: req.body.name,
    }
  );

  res.status(201).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(
    {
      id: req.params.id,
      login: req.body.login,
      password: req.body.password,
      name: req.body.name,
    }
  );

  if (user) {    
    res.status(200).send(User.toResponse(user));

   } else {
     res.status(400).send('Bad request');
   }
});

router.route('/:id').delete(async (req, res) => {
  usersService.del(req.params.id)
    .then(status => res.sendStatus(status));
});

module.exports = router;
