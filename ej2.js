const express = require('express')

const app = express()

const puerto = 3000

//Ruta: Raiz del sitio
app.get('/', (req, res) => {
  res.send('Welcome to the site');
});

app.listen(puerto, () => {
  console.log(`Servidor levantado en el puerto ${puerto}`);
});

//Ruta: Productos GET
app.get('/products', (req, res) => {
  res.send('product list');
});


//Ruta: Productos POST
app.post('/products', (req, res) => {
  res.send('product created');
});

//Ruta: Productos PUT
app.put('/products', (req, res) => {
  res.send('product updated');
});

//Ruta: Productos DELETE
app.delete('/products', (req, res) => {
  res.send('product deleted');
})
;
//Ruta: Productos GET
app.get('/users', (req, res) => {
  res.send('list users');
});

//Ruta: Productos POST
app.post('/users', (req, res) => {
  res.send('user created');
});
//Ruta: Productos PUT
app.put('/users', (req, res) => {
  res.send('user updated');
});
//Ruta: Productos DELETE
app.delete('/users', (req, res) => {
  res.send('user deleted');
}); 

