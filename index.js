require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productsRouter = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/products', productsRouter);
app.use('/api/auth', require('./routes/auth'));

// Serve client in production
const path = require('path');
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
