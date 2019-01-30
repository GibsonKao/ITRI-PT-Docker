const { Task } = require('../models/index')
const startTask = require('../helpers/taskHelper')

module.exports = {
  get: async (ctx, next) => {
    ctx.body = await Task.findAndCountAll()
  },
  post: async (ctx, next) => {
    try {
      const task = await Task.create(ctx.request.body)
      startTask(task)
      ctx.body = { status: 'ok', data: task }
    } catch (err) {
      ctx.body = { status: 'gg', msg: err.message }
    }
  }
}
