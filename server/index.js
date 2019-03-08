const path = require('path')
const Koa = require('koa')
const favicon = require('koa-favicon')
const mount = require('koa-mount')



const isDev = process.env.NODE_ENV === 'development'
const app = new Koa()
app.use(favicon(path.resolve(__dirname,'../favicon.ico')))



if (!isDev) {
  const server = require('koa-static')
  app.use(mount('/public',app.use(server(path.resolve(__dirname,'../dist/')))))
  const router = require('./utils/prod-render')
  app.use(router.routes()).use(router.allowedMethods())
} else {
  const axios = require('axios')
  app.use(mount('/public',async (ctx,next)=>{
    ctx.type = ctx.request.url.substr(ctx.request.url.lastIndexOf('.')+1)
    ctx.body = (await axios.get(`http://127.0.0.1:8080/public/${ctx.request.url}`)).data
  }))
  const router = require('./utils/dev-render')
  app.use(router.routes()).use(router.allowedMethods())
}

const host = process.env.HOST || `0.0.0.0`
const port = process.env.PORT || 3000

app.listen(port,host,()=>{
  console.log(`This server is listening http://${host}/${port}`);
})
