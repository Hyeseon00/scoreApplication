const controller = require('../user/userController')
const router = require('express').Router();


router.get('/', controller.getUserAll); // 모든 User 정보 리턴
router.get('/:id', controller.getUserOne); // 특정 User 정보 리턴
router.post('/', controller.createUsers); // User 등록


module.exports = router;