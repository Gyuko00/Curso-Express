const express = require('express');

// Se importan los módulos necesarios indispensables para el routing
const productsRouter = require('./products.routers');
const usersRouter = require('./users.routers');
const categoriesRouter = require('./categories.routers');

// Función que se encara de gestionar los Endpoints de la App, asínga la ruta base
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports= routerApi;
