const approot = require('app-root-path');
const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require(approot + '/server/routes/controller/user.controller');

router.post('/login', userController.login);
router.post('/userCheck', userController.userCheck);
router.get('/getIp', userController.getIp);

router.get('/', (req, res, next) => {
  if (req.path.split('/')[1] === 'static') return next();
  res.sendFile(approot + '/build/index.html');
});

module.exports = router;
