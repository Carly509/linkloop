const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'socialdb';

exports.getProfile = async (req, res) => {
     //#swagger.tags = ['Profiles']
  try {
    await client.connect();
    const db = client.db(dbName);
    const profile = await db.collection('profiles').findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProfile = async (req, res) => {
     //#swagger.tags = ['Profiles']
  const { userId, bio, avatar } = req.body;
  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('profiles').insertOne({ userId, bio, avatar });
    res.status(201).json({ profileId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
     //#swagger.tags = ['Profiles']
  const { bio, avatar } = req.body;
  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('profiles').updateOne(
      { userId: req.params.userId },
      { $set: { bio, avatar } }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Profile not found' });
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
     //#swagger.tags = ['Profiles']
  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('profiles').deleteOne({ userId: req.params.userId });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Profile not found' });
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
