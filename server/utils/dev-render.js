const Router = require('koa-router')
const path = require('path')
const webpack = require('webpack')
const devConfig = require('../../build/webpack.config.server')
const MemoryFs = require('memory-fs')
const mfs = new MemoryFs()
const axios = require('axios')
const router = new Router()
const serverCompiler = webpack(devConfig)
let bundle
serverCompiler.outputFileSystem = mfs

const renderFunc = require('./server-render')


const getTemplate = async () => {
  return (await axios.get('http://127.0.0.1:8080/public/server.ejs')).data
}


serverCompiler.watch({},(errs,status)=>{
  if (errs) throw errs
  status = status.toJson()
  status.errors.forEach( err => console.log(err))
  status.warnings.forEach( warn => console.log(warn))

  bundle = eval(mfs.readFileSync(path.resolve(
    devConfig.output.path,
    devConfig.output.filename
  ),'utf8'))
})


router.all('*',async (ctx,next) => {
  let template = await getTemplate()
  ctx.body = await renderFunc(bundle, template,ctx)
})







module.exports = router
