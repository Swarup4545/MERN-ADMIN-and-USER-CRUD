import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './confilg/db';
import authRoutes from './routes/authRoutes';
import employeeRoutes from './routes/employeeRoutes';
import path from 'path';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api',employeeRoutes)

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Base route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
