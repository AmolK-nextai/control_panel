const express = require('express');
const router= express.Router();
const websiteAdminController = require('../controllers/websiteAdminController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware.verifyToken, websiteAdminController.getAllWebsiteAdmins);
router.post('/signup', websiteAdminController.signupWebsiteAdmin);
router.post('/login', websiteAdminController.loginWebsiteAdmin);

module.exports = router;
