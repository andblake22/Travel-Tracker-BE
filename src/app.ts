// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import rateLimit from 'express-rate-limit';

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes),
(cors({
  origin: 'http://your-frontend-url-goes-here.com', // Allow only your frontend domain
  credentials: true,
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Apply rate limiter to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later."
});

app.use(limiter);
