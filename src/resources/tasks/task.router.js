const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.get(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.sendStatus(404);
  };  
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(
    {      
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId,
    }
  );

  res.status(201).send(task);
});

router.route('/:id').delete(async (req, res) => {
  tasksService.del(req.params.id)
    .then(status => res.sendStatus(status));
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(
    { 
      id: req.params.id,
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId,
    }
  );

  if (task) {    
    res.status(200).send(task);

   } else {
     res.sendStatus(400);
   }
});








module.exports = router;
