module.exports = {
  get: async (ctx, next) => {
    await ctx.render('dashboard', ctx.session)
  }
}
