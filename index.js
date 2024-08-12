const express = require('express');

// Api que gestionará las rutas establecidas en la carpeta "routes"
const routerApi = require('./routes');

// App Main
const app = express();

// Puerto en el que se está corriendo la App
const port = 3000;

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

// Con ésta línea se permite pasar parámetros en formato Json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola, este es mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// Se pasa la App para el funcionamiento del router
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port es: ' + port);
});
