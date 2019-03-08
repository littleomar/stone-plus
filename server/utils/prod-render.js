const Router = require('koa-router')
const path = require('path')
const router = new Router()
const fs = require('fs')



const template = fs.readFileSync(path.resolve(__dirname,'../../dist/server.ejs'),'utf8')
const serverEntry = require('../../dist/server-entry')
const renderFunc = require('./server-render')


router.all('*',async (ctx,next) => {
  ctx.body = await renderFunc(serverEntry,template,ctx)
})

module.exports = router
