import express from 'express';

const router = express.Router();

router.use(express.json());

router.post('/calculate-bmi', (req, res) => {
  const { height, weight } = req.body;
  console.log(height, weight)

  if (!height || !weight) {
    return res.status(400).json({ error: 'Please provide height and weight' });
  }

  const bmi = weight / ((height / 100) * (height / 100));
  let category = '';

  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Normal weight';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obesity';
  }

  return res.json({ bmi: bmi.toFixed(2), category });
});

export default router;

