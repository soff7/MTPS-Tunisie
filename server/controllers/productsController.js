exports.getProducts = (req, res) => {
  res.json({ message: 'getProducts endpoint' });
};

exports.getProductById = (req, res) => {
  res.json({ message: `getProductById endpoint for id ${req.params.id}` });
};

exports.createProduct = (req, res) => {
  res.json({ message: 'createProduct endpoint' });
};

exports.updateProduct = (req, res) => {
  res.json({ message: `updateProduct endpoint for id ${req.params.id}` });
};

exports.deleteProduct = (req, res) => {
  res.json({ message: `deleteProduct endpoint for id ${req.params.id}` });
};

exports.testRoute = (req, res) => {
  res.json({ message: 'Test route for products API' });
};
