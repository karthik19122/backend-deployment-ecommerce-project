
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const Cart = require('./models/cartModel'); // Import your Cart model

mongoose.set('strictQuery', false);

const app = express();
const port = 4000;

mongoose.connect('mongodb+srv://karthiknaidu:4321@cluster0.juca7wd.mongodb.net/fiestadb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('open', () => console.log('Connected to DB'));
db.on('error', () => console.log('Error occurred'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).send();
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/checkout', async (req, res) => {
  try {
    console.log('Received checkout request:', req.body);

    const { userId, cartItems, totalAmount } = req.body;

    
    const newCart = new Cart({
      userId, 
      items: cartItems,
      total: totalAmount,
    });

    await newCart.save();

    res.status(200).json({ success: true, message: 'Checkout successful!' });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
