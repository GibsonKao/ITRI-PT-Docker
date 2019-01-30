const router = require('koa-better-router')().loadMethods()
const controller = requireController(__filename)
const auth = require('../helpers/userAuth')

router.put('/chpass', auth, controller.put)

module.exports = router
