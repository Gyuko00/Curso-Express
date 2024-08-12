const express = require('express');

const ProductsService = require('./../services/product.services');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const service = new ProductsService;

// Gestión de rutas con librería "Router" de express
const router = express.Router();

// Products post desde raíz "/products" con límite en la lista de productos
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// Los endpoints específicos deben ir ANTES de los endpoints dinámicos

// Endpoint específico "/productos/filtro"
router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro');
});

// Endpoint dinámico /productos/:id, para buscar un producto con un ID específico
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

// Products post desde raíz "/products"
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  });

// Products patch desde la raíz "/products" con un ID específico "/:id", el patch funciona para modificar un campo en específico
// -> a diferencia del en el que se deben modificar absolutamente todos los campos de un objeto
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(202).json(product);
  } catch (error) {
    next(error);
  }
});

// Products delete desde la raíz "/products" con un ID específico
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
