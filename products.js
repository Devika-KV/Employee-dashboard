const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create product
router.post('/', auth, async (req, res) => {
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = new Product({ name, description, price, category, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if(!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

