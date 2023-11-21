
const express = require('express');
const Cart = require('../models/cartModel');

const cartRoute = express.Router();

cartRoute.post('/checkout', async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    const totalPrice = calculateTotalPrice(cartItems);

    const newCart = new Cart({ userId, cartItems, totalPrice });
    await newCart.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

cartRoute.get('/carts/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const carts = await Cart.find({ userId });

    res.status(200).json({ success: true, carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

cartRoute.put('/carts/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const updatedData = req.body.updatedData; 
    const updatedCart = await Cart.findByIdAndUpdate(cartId, updatedData, { new: true });

    res.status(200).json({ success: true, message: 'Cart updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

cartRoute.delete('/carts/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
     await Cart.findByIdAndDelete(cartId);
    res.status(200).json({ success: true, message: 'Cart deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
const calculateTotalPrice = (cartItems) => {
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  return totalPrice;
};
module.exports = cartRoute;
