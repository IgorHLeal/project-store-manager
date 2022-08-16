const connection = require('./connection');

const salesModel = {
  async exists(id) {
    const query = 'SELECT 1 FROM StoreManager.sales WHERE id = ?';
    const [sale] = await connection.execute(query, [id]);
    return sale;
  },

  async listSales() {
    const query = `
      SELECT
        sp.sale_id AS saleId,
        s.date,
        sp.product_id AS productId,
        sp.quantity
      FROM
        StoreManager.sales AS s
          INNER JOIN
        StoreManager.sales_products AS sp ON s.id = sp.sale_id;
    `;
    const [sales] = await connection.execute(query);
    return sales;
  },

  async getSalesById(id) {
    const query = `
      SELECT
        s.date, sp.product_id AS productId, sp.quantity
      FROM
        StoreManager.sales AS s
          INNER JOIN
        StoreManager.sales_products AS sp ON s.id = sp.sale_id
      WHERE
        sp.sale_id = ?;
    `;
    const [sale] = await connection.execute(query, [id]);
    return sale;
  },

  async addSales(sales) {
    const salesTableQuery = `
      INSERT INTO
        StoreManager.sales (date)
      VALUES (NOW());
      `;
    const [{ insertId }] = await connection.execute(salesTableQuery);

    const salesProductsTableQuery = `
      INSERT INTO
        StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES ?;
    `;

    await connection.execute(salesProductsTableQuery, [
      sales.map(({ productId, quantity }) => [insertId, productId, quantity]),
    ]);
    return insertId;
  },
};

module.exports = salesModel;
