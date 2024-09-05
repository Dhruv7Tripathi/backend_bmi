import express from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import connectDB from '../config/db.js';
// import app from '../BMI/bmi.js';

const router = express.Router();

router.use(express.json())

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)

  try {

    connectDB();

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      email,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      'yourSecretKey',
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    console.log(email, password)
    return res.json("hello")
  } catch (error) {
    console.log("ERror")
    return res.json(error)
  }

  //   try {
  //     let user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(400).json({ msg: 'Invalid Credentials' });
  //     }

  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       return res.status(400).json({ msg: 'Invalid Credentials' });
  //     }

  //     const payload = {
  //       user: {
  //         id: user.id,
  //       },
  //     };

  //     jwt.sign(
  //       payload,
  //       'yourSecretKey',
  //       { expiresIn: 360000 },
  //       (err, token) => {
  //         if (err) throw err;
  //         res.json({ token });
  //       }
  //     );
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server error');
  //   }
});

export default router;
