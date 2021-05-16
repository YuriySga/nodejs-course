const router = require('express').Router({ mergeParams: true });
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
    const boards = await boardsService.getAll();   
    res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.get(req.params.id);
  if (board) {    
    res.status(200).send(board); 

  } else {
    res.status(404).send('Board not found');
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create({
        title: req.body.title,
        columns: req.body.columns,        
  });
 
  res.status(201).send(board);
});

router.route('/:id').delete(async (req, res) => {
  boardsService.del(req.params.id)
    .then(status => res.sendStatus(status));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update({
    id: req.params.id,
    title: req.body.title,
    columns: req.body.columns,
  });

  if (board) {
    res.status(200).send(board);

   } else {     
     res.sendStatus(400).send('Bad request');
   }
});









module.exports = router;