const express = require('express');
const router = express.Router();
const User = require('./user-moduel'); // Corrected the file name

// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const { name, age, email } = req.body;
//     if (!name || !age || !email) {
//       return res.status(400).json({ error: 'All fields are required!' });
//     }
//     const newUser = new User({ name, age, email });
//     const savedUser = await newUser.save();
//     res.status(201).json({ message: 'User added successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

module.exports = router;
