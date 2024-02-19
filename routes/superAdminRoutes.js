const express =require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');

const authMiddleware = require('../Middleware/authMiddleware');



// Middleware to authenticate super admin
// router.use(authMiddleware.verifyTokenSuperAdmin);
router.post('/login', superAdminController.loginSuperAdmin);
router.get('/', superAdminController.getAllSuperAdmins);
router.post('/signup', superAdminController.signupSuperAdmin);


module.exports = router;