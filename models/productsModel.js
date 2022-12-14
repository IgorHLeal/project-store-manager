const connection = require('./connection');

const productsModel = {
  listProducts: async () => {
    const query = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.execute(query);
    return products;
  },

  getProductsById: async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[product]] = await connection.execute(query, [id]);
    return product;
  },

  getProductsByName: async (search) => {
    const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
    const [products] = await connection.execute(query, [`%${search}%`]);
    return products;
  },

  addProducts: async (name) => {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(query, [name]);
    return insertId;
  },

  updateProducts: async (id, name) => {
    const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    await connection.execute(query, [name, id]);
  },

  deleteProcucts: async (id) => {
    const query = 'DELETE FROM StoreManager.products WHERE id = ?';
    await connection.execute(query, [id]);
  },
};

module.exports = productsModel;
