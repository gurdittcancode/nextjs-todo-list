import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Successfully connected to database');
  } catch (err) {
    console.log('Error in connecting to database', err);
  }
};
