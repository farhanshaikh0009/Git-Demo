const express = require('express');
const router = express.Router();
exports.router = router;
const { body, validationResult } = require('express-validator');
const User = require('./user-moduel'); // Corrected the file name
const constants = require('../../units/constant');
const models = {
  User: User,
  // Add other models if needed
};

const getModel = (collection) => {
  if (models[collection]) {
    return models[collection];
  }
  throw new Error(`Model for collection "${collection}" not found`);
};

router.get('/', async (req, res) => {
  const { collection } = req.params;
  console.log(`Fetching all users`);
  try {
    const documents = await User.find();
    res.status(200).json({
      status: { message: constants.statusSuccess },
      data: documents,
    });
  } catch (error) {
    res.status(500).json({
      status: { message: `${constants.unexpectedError}: ${error.message}` },
      data: null,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { collection, id } = req.params;
  try {
    const document = await Model.findById(id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', 
    [
        body('name').notEmpty().withMessage('Name Is Required'),
        body('age').notEmpty().withMessage('Age Is Required'),
        body('email').isEmail().withMessage('Valid Email Is Required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json({ message: 'User added successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

router.put("/:id",
    [
        body('name').notEmpty().withMessage('Name Is Required'),
        body('age').notEmpty().withMessage('Age Is Required'),
        body('email').isEmail().withMessage('Valid Email Is Required'),
    ],
    async (req, res) => {
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({
                message: 'User updated successfully',
                user: updatedUser,
            });
        } catch (error) {
            res.status(500).json({ message: `Error updating user: ${error.message}` });
        }
    }
);

module.exports = router;
