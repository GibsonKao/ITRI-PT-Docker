const router = require('koa-better-router')().loadMethods()
const controller = requireController(__filename)
const auth = require('../helpers/userAuth')

router.get('/task', auth, controller.get)
router.post('/task', auth, controller.post)

module.exports = router
