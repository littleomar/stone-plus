const { renderToStaticMarkup } = require('react-dom/server')
const SheetsRegistry = require('react-jss').SheetsRegistry
const createGenerateClassName = require('react-jss').createGenerateClassName
const Helmet = require('react-helmet').default
const bootstrapper = require('react-async-bootstrapper')
const ejs = require('ejs')


const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result,storeName)=>{
    result[storeName] = stores[storeName].toJson()
    return result
  },{})
  // let result = {}
  // Object.keys(stores).map(storeName => {
  //   result[storeName] = stores[storeName].toJson()
  // })
  // return result
}


module.exports = async (bundle,template,ctx) => {
  const serverBundle = bundle.default
  const sheets = new SheetsRegistry()
  const createClass = new createGenerateClassName()
  const stores = bundle.createStoreMap()
  const routerContext = {}
  const app = serverBundle(sheets,createClass, stores, routerContext, ctx.request.url)
  await bootstrapper(app)
  const helmet = Helmet.rewind()
  const state = getStoreState(stores)
  // const appString = renderToString(app)
  const appString = renderToStaticMarkup(app)


  if (routerContext.url) {
    ctx.redirect(routerContext.url)
  }
  return ejs.render(template,{
    appString,
    initalState: JSON.stringify(state),
    renderStyle: sheets.toString(),
    title: helmet.title.toString(),
    meta: helmet.meta.toString(),
    link: helmet.link.toString(),
    style: helmet.style.toString()
  })
}


