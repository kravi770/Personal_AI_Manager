import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection = async () => {
  const URL = process.env.DB_STRING;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Database Connection successfully !');
  } catch (err) {
    console.log('error while connecting to database', err);
  }
};

export default Connection;
