const crypto = require('crypto')
const { User } = require('../models/index')

module.exports = {
  put: async (ctx, next) => {
    try {
      const oldpass = ctx.request.body.op
      const newpass = ctx.request.body.np
      const confirm = ctx.request.body.cp
      if (oldpass === '' || newpass === '' || confirm === '') {
        throw new Error('Field empty!')
      }
      if (newpass !== confirm) {
        throw new Error('Two input not matched!')
      }
      if (crypto.createHash('sha256').update(oldpass, 'utf8').digest('hex') !== ctx.session.user.pass) {
        throw (new Error('Wrong Password!'))
      }
      const user = ctx.session.user
      const pass = crypto.createHash('sha256').update(newpass, 'utf8').digest('hex')
      User.update({ pass: pass }, { where: { user: user.user } })
      ctx.body = { status: 'ok' }
    } catch (err) {
      ctx.body = { status: 'gg', msg: err.message }
    }
  }
}
