const express = require('express')

const app = express()

const puerto = 5000
app.use(express.json());

app.get('/products', (req, res) => {

  res.json({
    description: 'Productos',
    items: [
      { id: 1, nombre: 'Taza de Harry Potter', precio: 300 },
      { id: 2, nombre: 'FIFA 22 PS5', precio: 1000 },
      { id: 3, nombre: 'Figura Goku Super Saiyan', precio: 100 },
    
      { id: 4, nombre: 'Zelda Breath of the Wild', precio: 200 },
      { id: 5, nombre: 'Skin Valorant', precio: 120 },
      { id: 6, nombre: 'Taza de Star Wars', precio: 220 }
    ]
  });  // Responder con el JSON
});

app.listen(puerto, () => {
  console.log(`Servidor levantado en el puerto ${puerto}`);
});

let productos = [
  { id: 1, nombre: 'Taza de Harry Potter', precio: 300 },
  { id: 2, nombre: 'FIFA 22 PS5', precio: 1000 },
  { id: 3, nombre: 'Figura Goku Super Saiyan', precio: 100 },
  { id: 4, nombre: 'Zelda Breath of the Wild', precio: 200 },
  { id: 5, nombre: 'Skin Valorant', precio: 120 },
  { id: 6, nombre: 'Taza de Star Wars', precio: 220 }
];
 //Endpoint para crear un nuevo producto
 app.post('/products', (req, res) => {
  const { nombre, precio } = req.body;

  // Validación simple
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Nombre y precio son requeridos' });
  }

  const nuevoProducto = {
    id: productos.length + 1,  // ID auto-incremental
    nombre,
    precio
  };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);  // Respondemos con el producto creado
});

//Endpoint para actualizar un producto
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  // Buscamos el producto por ID
  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Actualizamos el producto
  if (nombre) producto.nombre = nombre;
  if (precio) producto.precio = precio;

  res.json(producto);  // Respondemos con el producto actualizado
});

//Endpoint para eliminar un producto
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  // Buscamos el producto por ID
  const productoIndex = productos.findIndex(p => p.id === parseInt(id));

  if (productoIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Eliminamos el producto
  productos.splice(productoIndex, 1);
  res.status(204).send();  // Respondemos con un No Content
});

//Filtrator de productos por precio
app.get('/products/filter', (req, res) => {
  const { min, max } = req.query;

  // Filtramos los productos por precio
  const productosFiltrados = productos.filter(producto => {
    return (!min || producto.precio >= parseFloat(min)) &&
           (!max || producto.precio <= parseFloat(max));
  });

  res.json(productosFiltrados);  // Respondemos con los productos filtrados
});

//Filtrar productos con precios entre 50 y 200
app.get('/products/price-range', (req, res) => {
  const productosFiltrados = productos.filter(p => p.precio >= 50 && p.precio <= 250);
  res.json(productosFiltrados);

});

//Filtar productos por ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(producto);  // Respondemos con el producto encontrado
});

//filtar por nombre
app.get('/products/search', (req, res) => {
  const { nombre } = req.query;

  // Filtramos los productos por nombre
  const productosFiltrados = productos.filter(producto => {
    return producto.nombre.toLowerCase().includes(nombre.toLowerCase());
  });

  res.json(productosFiltrados);  // Respondemos con los productos filtrados
});
//levantamos

app.listen(puerto, () => {
  console.log(`Servidor levantado en el puerto ${puerto}`);
});

