const express = require('express');
const router = express.Router();
const { getUser, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/:id', auth, getUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
