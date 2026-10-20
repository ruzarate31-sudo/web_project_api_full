const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserById);

module.exports = router;
