const express = require('express');

const boom = require('@hapi/boom');

const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema');

const UsersService = require('./../services/users.services');
const service = new UsersService;

const router = express.Router();

// Users get desde raíz "/users"
router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

// Users get desde raíz "/users" con un ID específico
router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

// Users post desde raíz "/users"
router.post('/', validatorHandler(createUserSchema, 'body'),
async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser);
})

// Users patch desde la raíz "/users" con un ID específico "/:id"
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.status(202).json(user);
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }

  });

// Users detele desde la raíz "/users" con un ID específico "/:id"
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.status(202).json(rta);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

});

module.exports = router;
