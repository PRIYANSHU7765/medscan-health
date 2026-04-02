import { query } from './index.js';

const createTables = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS medicines (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      generic_name TEXT,
      dosage TEXT,
      form TEXT,
      manufacturer TEXT,
      price NUMERIC(10,2),
      stock INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS prescriptions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      medicine_id INTEGER REFERENCES medicines(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL,
      issued_at TIMESTAMPTZ DEFAULT NOW(),
      status TEXT DEFAULT 'active'
    );
  `);

  console.log('PostgreSQL schema initialized');
};

createTables()
  .catch((err) => {
    console.error('Error creating tables:', err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
