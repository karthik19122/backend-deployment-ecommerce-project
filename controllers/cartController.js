
const saveCartItems = async (req, res) => {
  try {
    console.log('Received checkout request:', req.body);

    const userId = req.user._id;
    const { cartItems, totalAmount } = req.body;

    console.log('Cart items to save:', cartItems);

    const cartItemsToSave = cartItems.map(item => ({
      productName: item.name, 
      quantity: item.quantity,
      price: item.price,
    }));
what
    console.log('Mapped cart items:', cartItemsToSave);

    
    await Cart.create({
      userId,
      items: cartItemsToSave,
      total: totalAmount,
    });

    res.status(201).json({ success: true, message: 'Cart items saved successfully' });
  } catch (error) {
    console.error('Error saving cart items:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { saveCartItems };
