const express =require('express');
const router =express.router();
const superAdminController = require('./controllers/superAdminController');
const authMiddleware = require('../middleware/authMiddleware');



// Middleware to authenticate super admin
router.use(authMiddleware.verifyTokenSuperAdmin);

router.get('/', superAdminController.getAllSuperAdmins);
router.post('/signup', superAdminController.signupSuperAdmin);
router.post('/login', superAdminController.loginSuperAdmin);

module.exports = router;