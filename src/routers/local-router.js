const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

function getModel(collectionName) {
    collectionName = 'users';
    const models = {
        users: require('../moduels/users/user-moduel'),
        products: require('../moduels/products/product-model'),
    };

    const model = models[collectionName];
    if (!model) {
        throw new Error(`Model for collection "${collectionName}" not found.`);
    }
    return model;
}

router.get('/', async (req, res) => {
    const { collection } = req.params;
    console.log(`Fetching collection: ${req.params.collectionName}`);
    try {
        const Model = getModel(collection);
        const documents = await Model.find();
        console.log(`Documents fetched: ${documents.length}`);
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({message: 'Error fetching Data:' + error.message});
    }
});

router.get('/:id', async (req, res) => {
    const { collection, id } = req.params;
    try {
        const Model = getModel(collection);
        const document = await Model.findById(id);
        if (!document) {
            return res.status(404).json({message: 'Document not found'});
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

router.post('/', 
    [
        body('name').notEmpty().withMessage('Name Is Reuierd'),
        body('age').notEmpty().withMessage('age Is Reuierd'),
        body('email').isEmail().withMessage('valid Email Is Reuierd'),
    ],
    async (req, res) => {
        const { collection } = req.params;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        try {
            const Model = getModel(collection);
            const newDocument = new Model(req.body);
            await newDocument.save();
            res.status(201).json({ message: 'User added successfully' , user: newDocument});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

router.put("/:id",
    [
        body('name').notEmpty().withMessage('Name Is Reuierd'),
        body('age').notEmpty().withMessage('age Is Reuierd'),
        body('email').isEmail().withMessage('valid Email Is Reuierd'),
    ],
    async (req, res) => {
        const { collection, id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }

        try {
            const Model = getModel(collection);
            const updatedDocument = await Model.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedDocument) {
                return res.status(404).json({ message: 'Document not found' });
            }
            res.status(200).json({
                message: 'Document updated successfully',
                document: updatedDocument,
            });
        } catch (error) {
            res.status(500).json({ message: `Error updating document: ${error.message}` });
        }
    }
);

router.delete('/:id', async (req, res) => {
    const { collection, id } = req.params;
    try {
        const Model = getModel(collection);
        const deletedDocument = await Model.findByIdAndDelete(id);
        if (!deletedDocument) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'Document deleted successfully', document: deletedDocument });
    } catch (error) {
        res.status(500).json({ message: `Error deleting document: ${error.message}` });
    }
});

module.exports = router;