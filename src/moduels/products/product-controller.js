const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Product = require('./product-model');
const constants = require('../../units/constant');
const User = require('../users/user-moduel');
const models = {
    Product: Product,
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
    const documents = await Product.find();
    res.status(200).json({
      status: { message: constants.statusSuccess , status: 200 },
      data: documents,
    });
  } catch (error) {
    res.status(500).json({
      status: { message: `${constants.unexpectedError}: ${error.message}`, status: 500 },
      data: null,
    });
  }
});


router.post('/', 
    [
        body('name').notEmpty().withMessage('Name Is Reuierd'),
        body('category').notEmpty().withMessage('title Is Reuierd'),
        body('price').notEmpty().withMessage('Price Field Is Reuierd'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        try {
            const newDocument = new Product(req.body);
            await newDocument.save();
            res.status(201).json({ 
                status: {message: 'Product added successfully' },
                data:  newDocument,
            });
        } catch (error) {
            res.status(500).json({
                status: { message: `${constants.unexpectedError}: ${error.message}`, status: 500 },
                data: null,
              });
        }
    });

module.exports = router;
