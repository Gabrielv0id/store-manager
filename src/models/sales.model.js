const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(`
    SELECT
      s.id AS saleId,
      DATE_FORMAT(s.date, '%Y-%m-%dT%H:%i:%s.000Z') AS date,
      sp.product_id AS productId,
      sp.quantity
    FROM
      StoreManager.sales s
      JOIN StoreManager.sales_products sp ON s.id = sp.sale_id
    ORDER BY saleId ASC, productId ASC;
  `);
  return result;
};

const findById = async (saleId) => {
    const [result] = await connection
    .execute(`
    SELECT
      DATE_FORMAT(s.date, '%Y-%m-%dT%H:%i:%s.000Z') AS date,
      sp.product_id AS productId,
      sp.quantity
    FROM
      StoreManager.sales s
      JOIN StoreManager.sales_products sp ON s.id = sp.sale_id
    WHERE s.id = ?;
  `, [saleId]);
  return result;
};

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

const insertSalesProducts = async (saleId, productId, quantity) => {
    const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return insertId;
};

const remove = async (id) => {
  const result = await
    connection.execute('DELETE FROM StoreManager.sales WHERE id = ?',
      [id]);
  
  return result;
};

const update = async (id, productId, quantity) => {
  const result = await
    connection.execute(`UPDATE StoreManager.sales_products SET quantity = ? 
      WHERE sale_id = ? AND product_id = ? `,
      [quantity, id, productId]); 
  
  return result;
};

module.exports = {
  insertSales,
  insertSalesProducts,
  findAll,
  findById,
  remove,
  update,
};