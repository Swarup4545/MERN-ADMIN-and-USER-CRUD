import express from 'express';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController';
import { protect, adminOnly } from '../middelware/authMiddleware';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/employees', protect, getEmployees);
router.post('/employees', protect, adminOnly, upload.single('image'), createEmployee);
router.put('/employees/:id', protect, adminOnly, upload.single('image'), updateEmployee);
router.delete('/employees/:id', protect, adminOnly, deleteEmployee);

export default router;
