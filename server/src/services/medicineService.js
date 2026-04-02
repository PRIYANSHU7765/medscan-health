import { query } from '../db/index.js';

export const listMedicines = async () => {
  const result = await query('SELECT * FROM medicines ORDER BY id');
  return result.rows;
};

export const createMedicine = async ({ name, genericName, dosage, form, manufacturer, price, stock }) => {
  const result = await query(
    `INSERT INTO medicines (name, generic_name, dosage, form, manufacturer, price, stock)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [name, genericName, dosage, form, manufacturer, price, stock ?? 0],
  );
  return result.rows[0];
};

