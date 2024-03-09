const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 

let items = [
    { id: 1, title: "Example Title 1", description: "Example Description 1" },
];


// Create
app.post('/item', (req, res) => {
  const item = req.body; 
  console.log("Creating item:", item);
  items.push(item);
  res.status(201).send(item);
});

// Read
app.get('/item', (req, res) => {
  res.status(200).json(items);
});

// Update
app.put('/item/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body; 
  console.log("Updating item with id:", id, " to:", updatedItem);
  items = items.map(item => item.id == id ? updatedItem : item);
  res.status(200).send(updatedItem);
});

// Delete
app.delete('/item/:id', (req, res) => {
  const { id } = req.params;
  console.log("Deleting item with id:", id);
  items = items.filter(item => item.id != id);
  res.status(204).send();
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}


module.exports = app;
