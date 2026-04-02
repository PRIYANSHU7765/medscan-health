import { query } from '../db/index.js';

export const listUsers = async () => {
  const result = await query('SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY id');
  return result.rows;
};

export const createUser = async ({ name, email, passwordHash, role = 'user' }) => {
  const result = await query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, passwordHash, role],
  );
  return result.rows[0];
};

