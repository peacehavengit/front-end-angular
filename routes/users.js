const express = require('express');
const router = express.Router();
const auth = require('../utilities/jwt.token');

// Import controllers
const UserController = require('../controller/users/user.controller');
const repoController = require('../controller/repository.controller');

// User registeration API route
router.post('/signup', UserController.SignUp);

router.post('/login', UserController.LogIn);

router.get('/userdetail',auth, UserController.userdetails);

router.post('/childprocess',auth, UserController.lexExec);

router.get('/repositories',auth,repoController.getUserRepo);

router.get('/checkrepo',auth,repoController.checkDuplicateRepo);

module.exports = router;