import { Router } from 'express';
import * as userService from '../services/userService.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

export default router;
