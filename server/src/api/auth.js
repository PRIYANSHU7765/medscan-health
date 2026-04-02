import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  return res.json({ message: 'Auth not implemented yet. Add JWT and password hashing.' });
});

router.post('/register', (req, res) => {
  return res.json({ message: 'Auth not implemented yet. Add user creation logic.' });
});

export default router;
