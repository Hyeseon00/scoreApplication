const controller = require('../game/gamesController')
const router = require('express').Router();


router.get('/', controller.getGameAll); // 모든 Game 정보 리턴
router.get('/:id', controller.getGameOne); // 특정 Game 정보 리턴
router.post('/', controller.createGame); // Game 등록
router.put('/', controller.updateGame); // Game 정보 수정


module.exports = router;