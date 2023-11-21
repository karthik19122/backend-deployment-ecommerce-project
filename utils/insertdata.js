const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://karthiknaidu:4321@cluster0.mongodb.net/fiestadb?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(async (err) => {
  if (err) throw err;

  const db = client.db('fiestadb');

  try {
    const userInsertResult = await db.collection('userdata').insertOne({
      username: 'john_doe',
      email: 'john@example.com',
    });

    const productInsertResult = await db.collection('products').insertOne({
      name: 'Product Name',
      price: 29.99,
    
    });

    const cartInsertResult = await db.collection('carts').insertOne({
      userId: userInsertResult.insertedId, 
      items: [
        {
          productId: productInsertResult.insertedId, 
          quantity: 2,
        },
       
      ],
      totalAmount: 59.98,
    });

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    
    client.close();
  }
});
