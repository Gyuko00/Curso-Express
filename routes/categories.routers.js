const express = require('express');

const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

const CategoriesService = require('./../services/categories.services');
const service = new CategoriesService;

const router = express.Router();

// Categories get desde la raíz "/categories"
router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

// Categories get desde la raíz "/categories" con un ID específico "/:id"
router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  });

// Categories get con un ID específico de una categoría y un ID específico de un producto
router.get('/:idCategoria/products/:idProducto', (req, res) => {
  const { idCategoria, idProducto } = req.params;
  res.status(200).json({
    idCategoria,
    idProducto,
  });
});

// Categories post desde la raíz "/categories"
router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  });

// Categories patch desde la raíz "/categories" con un ID específico para actualizar datos
router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.status(202).json(category);
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }

  });

// Categories delete desde la raíz "/categories" con un ID específico "/:id"
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.status(202).json(rta);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }

});

module.exports = router;
