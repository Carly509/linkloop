const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'socialdb';

exports.createPost = async (req, res) => {
    //#swagger.tags = ['Posts']
    try {
        await client.connect();
        const db = client.db(dbName);
        const { content } = req.body;
        const result = await db.collection('posts').insertOne({
            content,
            author: new ObjectId(req.user.id), // <-- FIXED
            createdAt: new Date()
        });
        res.status(201).json({ postId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllPosts = async (req, res) => {
    //#swagger.tags = ['Posts']
    try {
        await client.connect();
        const db = client.db(dbName);
        const posts = await db.collection('posts').find({}).toArray();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getPost = async (req, res) => {
    //#swagger.tags = ['Posts']
    try {
        await client.connect();
        const db = client.db(dbName);
        const post = await db.collection('posts').findOne({
            _id: new ObjectId(req.params.id) // <-- FIXED
        });

        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    //#swagger.tags = ['Posts']
    try {
        await client.connect();
        const db = client.db(dbName);
        const postId = new ObjectId(req.params.id); // <-- FIXED

        // Authorization check
        const existingPost = await db.collection('posts').findOne({ _id: postId });
        if (!existingPost.author.equals(new ObjectId(req.user.id))) { // <-- FIXED
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const result = await db.collection('posts').updateOne(
            { _id: postId },
            { $set: { content: req.body.content } }
        );

        if (result.matchedCount === 0) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    //#swagger.tags = ['Posts']
    try {
        await client.connect();
        const db = client.db(dbName);
        const postId = new ObjectId(req.params.id); // <-- FIXED

        const post = await db.collection('posts').findOne({ _id: postId });
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (!post.author.equals(new ObjectId(req.user.id))) { // <-- FIXED
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Delete the post
        const result = await db.collection('posts').deleteOne({ _id: postId });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Post not found' });

        // Optionally, also delete associated comments
        await db.collection('comments').deleteMany({ post: postId });

        res.json({ message: 'Post and associated comments deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
