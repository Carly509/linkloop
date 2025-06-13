const express = require('express');
const router = express.Router();
const { getProfile, createProfile, updateProfile, deleteProfile } = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware');

router.get('/:userId', getProfile);
router.post('/', auth, createProfile);
router.put('/:userId', auth, updateProfile);
router.delete('/:userId', auth, deleteProfile);

module.exports = router;
