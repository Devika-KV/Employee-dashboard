const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ message: 'Missing credentials' });
  if(username === ADMIN_USER && password === ADMIN_PASS){
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
