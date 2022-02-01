const approot = require('app-root-path');
const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require(approot + '/server/routes/controller/user.controller');
const boardController = require(approot + '/server/routes/controller/board.controller');

router.post('/login', userController.login);
router.post('/userCheck', userController.userCheck);
router.post('/join', userController.join);
router.post('/logout', userController.logout);
router.get('/getIp', userController.getIp);

router.post('/boardList', boardController.boardList);
router.post('/board', boardController.board);
router.post('/setBoard', boardController.setBoard);
router.post('/editBoard', boardController.editBoard);
router.post('/deleteBoard', boardController.deleteBoard);

router.get('*', (req, res, next) => {
    if (req.path.split('/')[1] === 'static') return next();
    res.sendFile(approot + '/build/index.html');
});


module.exports = router;
