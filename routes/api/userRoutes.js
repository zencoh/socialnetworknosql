const router = require('express').Router();
const {
    // controllers
    getUsers,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers);