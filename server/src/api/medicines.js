import { Router } from 'express';
import * as medicineService from '../services/medicineService.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const medicines = await medicineService.listMedicines();
    res.json(medicines);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const medicine = await medicineService.createMedicine(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    next(err);
  }
});

export default router;
