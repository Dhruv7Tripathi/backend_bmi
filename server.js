import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import bmiRoutes from './BMI/bmi.js'; // Import BMI routes

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: ['http://localhost:5173', '*', 'https://dhr-bmi.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bmi', bmiRoutes);

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(email, password);
    return res.json("hello");
  } catch (error) {
    console.log("Error");
    return res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

