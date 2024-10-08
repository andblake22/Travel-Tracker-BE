import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
    });
    console.log('MongoDB connected');
  } catch (error) {
    throw new Error(`Error connecting to DB: ${error}`)
  }
};

export default connectDB;
