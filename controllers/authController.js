const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'socialdb';

exports.register = async (req, res) => {
     //#swagger.tags = ['Auth']
  const { email, password } = req.body;
  try {
    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection('users').findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({ email, password: hashedPassword });
    res.status(201).json({ userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
     //#swagger.tags = ['Auth']
  const { email, password } = req.body;
  try {
    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
