const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'socialdb';
exports.createComment = async (req, res) => {
    //#swagger.tags = ['Comments']
    try {
        await client.connect();
        const db = client.db(dbName);
        const { content, postId } = req.body;

        // Verify post exists
        const postExists = await db.collection('posts').findOne({
            _id: new ObjectId(postId)
        });
        if (!postExists) return res.status(404).json({ message: 'Post not found' });

        const result = await db.collection('comments').insertOne({
            content,
            post: new ObjectId(postId),
            author: new ObjectId(req.user.id),
            createdAt: new Date()
        });

        res.status(201).json({ commentId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPostComments = async (req, res) => {
    //#swagger.tags = ['Comments']
    try {
        await client.connect();
        const db = client.db(dbName);
        const comments = await db.collection('comments')
            .find({ post: new ObjectId(req.query.postId) })
            .toArray();

        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateComment = async (req, res) => {
    //#swagger.tags = ['Comments']
    try {
        await client.connect();
        const db = client.db(dbName);
        const commentId = new ObjectId(req.params.id);
        const { content } = req.body;

        const comment = await db.collection('comments').findOne({ _id: commentId });
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        if (!comment.author.equals(new ObjectId(req.user.id))) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const result = await db.collection('comments').updateOne(
            { _id: commentId },
            { $set: { content } }
        );
        if (result.matchedCount === 0) return res.status(404).json({ message: 'Comment not found' });

        res.json({ message: 'Comment updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteComment = async (req, res) => {
    //#swagger.tags = ['Comments']
    try {
        await client.connect();
        const db = client.db(dbName);
        const commentId = new ObjectId(req.params.id);

        const comment = await db.collection('comments').findOne({ _id: commentId });
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        if (!comment.author.equals(new ObjectId(req.user.id))) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const result = await db.collection('comments').deleteOne({ _id: commentId });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Comment not found' });

        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
