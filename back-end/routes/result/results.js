const controller = require('../result/resultController')
const router = require('express').Router();


router.get('/', controller.getResultAll); // 모든 Result 정보 리턴
router.get('/:user_id', controller.getResultUserOne); // 유저별 Result 정보 리턴
router.get('/:game_id', controller.getResultGameOne); // 게임별 Result 정보 리턴

router.post('/', controller.createResult); // Result 등록
router.delete('/', controller.updateResult); // 게임 결과 삭제


module.exports = router;